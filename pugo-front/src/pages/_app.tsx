import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import '@/styles/globals.scss';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { changeStoreLang, setUser } from '@/store/slices/userSlice';
import Script from 'next/script';
import { IS_DEV, REQUEST_LINK } from '../../constant';
import { appWithTranslation, i18n, UserConfig, useTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config.js';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import { handleReferral } from '@/utils/handleReferral'

type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
} & AppProps['Component'];

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function AppContent({ Component, pageProps }: MyAppProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true); 

 
  const loadUserData = async () => {
    if (!user.id) return;

    try {
      const response = await fetch(`${REQUEST_LINK}/api/user/${user.id}`);
      const data = await response.json();

      if (data?.userInfo?.lang) {
        dispatch(changeStoreLang(data.userInfo.lang));
        localStorage.setItem('preferredLang', data.userInfo.lang);
      }

      dispatch(setUser(data.userInfo));
    } catch (error) {
      console.error('Ошибка при получении данных о пользователе:', error);
    }
  };


  const debouncedLoadUserData = debounce(loadUserData, 1000);

  useEffect(() => {
    if (user.lang) {
      localStorage.setItem('preferredLang', user.lang);
    }
  }, [user.lang]);

  useEffect(() => {
    const initializeLanguage = async () => {
      const localLang = localStorage.getItem('preferredLang');
      const initialLang = localLang || router.locale || user.lang || 'en';

      await i18n.changeLanguage(initialLang);
      dispatch(changeStoreLang(initialLang));

      if (router.locale !== initialLang) {
        await router.push(router.pathname, router.asPath, {
          locale: initialLang,
          scroll: false,
        });
      }

  
      if (!user.lang && user.id) {
        debouncedLoadUserData();
      }
    };

    initializeLanguage();
  }, [i18n, user.id, router]);


  useEffect(() => {
    const loadStateFromLocalStorage = () => {
      try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState) {
          const state = JSON.parse(serializedState);
          dispatch(setUser(state));
        }
      } catch (error) {
        console.error('Ошибка при восстановлении состояния из localStorage:', error);
      }
    };

    loadStateFromLocalStorage();
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : null;

      if (user) {
        dispatch(
          setUser({
            id: String(user.id),
            username: user.username || user.first_name || String(user.id) || null,
            firstName: user.first_name || null,
            lastName: user.last_name || null,
            photoUrl: user.photo_url || null,
          })
        );

        const isFirstTime = localStorage.getItem('isFirstTime');
        if (isFirstTime === null) {
          localStorage.setItem('isFirstTime', 'true');
        }

        const urlParams = new URLSearchParams(window.location.search);
        const referralCode = urlParams.get('tgWebAppStartParam');

        if (!referralCode) {
          fetch(`${REQUEST_LINK}/telegram-register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              telegramId: user.id,
              username: user.username || user.first_name || String(user.id) || null,
              firstName: user.first_name,
              lastName: user.last_name,
            }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                console.log('User registered successfully on frontend');
              } else {
                console.warn('Error during user registration on frontend');
              }
            })
            .catch(error => console.error('Registration failed:', error));
        } else {
          handleReferral(referralCode);
        }
      }
    }
  }, [dispatch]);




  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      if (!user.id) return;

      const getUserInfo = async () => {
        try {
          const response = await fetch(`${REQUEST_LINK}/api/user/${user.id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (data.success) {
            dispatch(
              setUser({
                balance: data.userInfo.balance || null,
                tokens: data.userInfo.tokens || null,
                referralCode: data.userInfo.referralCode || null,
                walletAddress: data.userInfo.walletAddress || null,
                createdAt: data.userInfo.createdAt || null,
                updatedAt: data.userInfo.updatedAt || null,
                referrals: data.userInfo.referrals || null,
                automining: data.userInfo.automining || null,
                autominingExpiresAt: data.userInfo.autominingExpiresAt || null,
                transactions: data.userInfo.automining || null,
                status: data.userInfo.status || null,
                caseAmount: data.userInfo.caseAmount || null,
                spacePugRecord: data.userInfo.spacePugRecord || null,
                cards: data.userInfo.cards || null,
                ships: data.userInfo.ships || null,
                lang: data.userInfo.lang || 'en',
              })
            );
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      const interval = setInterval(() => {
        getUserInfo();
      }, 120000); // Обновляем данные каждые 2 минуты

      return () => clearInterval(interval);
    }
  }, [user.id, dispatch]);

  const getLayout = Component.getLayout || (page => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}

function MyApp(props: MyAppProps) {
  return (
    <Provider store={store}>
      <Script src='https://telegram.org/js/telegram-web-app.js' strategy='beforeInteractive' />
      <AppContent {...props} />
    </Provider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig as UserConfig);
