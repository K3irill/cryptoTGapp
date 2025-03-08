import { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import '@/styles/globals.scss'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { setUser } from '@/store/slices/userSlice'
import Script from 'next/script'
import { IS_DEV, REQUEST_LINK } from '../../constant'

type NextPageWithLayout = {
	getLayout?: (page: ReactElement) => ReactNode
} & AppProps['Component']

interface MyAppProps extends AppProps {
	Component: NextPageWithLayout
}

function AppContent({ Component, pageProps }: MyAppProps) {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)
	const { referralCode } = useSelector((state: RootState) => state.user)

	useEffect(() => {
		const loadStateFromLocalStorage = () => {
			try {
				const serializedState = localStorage.getItem('userState')
				if (serializedState) {
					const state = JSON.parse(serializedState)
					dispatch(setUser(state))
				}
			} catch (error) {
				console.error(
					'Ошибка при восстановлении состояния из localStorage:',
					error
				)
			}
		}

		loadStateFromLocalStorage()
	}, [dispatch])

	useEffect(() => {
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			const tg = window.Telegram.WebApp
			const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : null

			if (user) {
				dispatch(
					setUser({
						id: String(user.id),
						username: user.username || null,
						firstName: user.first_name || null,
						lastName: user.last_name || null,
						photoUrl: user.photo_url || null,
					})
				)

				// Telegram registration API call
				fetch(`${REQUEST_LINK}/telegram-register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						telegramId: user.id,
						username: user.username || null,
						firstName: user.first_name,
						lastName: user.last_name,
					}),
				})
					.then(response => response.json())
					.then(data => {
						if (data.success) {
							console.log('User registered successfully on frontend')
						} else {
							console.warn('Error during user registration on frontend')
						}
					})
					.catch(error => console.error('Registration failed:', error))
			}
		}
	}, [dispatch])

	const handleReferral = async (referralCode: string) => {
		try {
			const response = await fetch(`${REQUEST_LINK}/ref/${referralCode}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					telegramId: window.Telegram.WebApp.initDataUnsafe.user?.id,
					username: window.Telegram.WebApp.initDataUnsafe.user?.username,
					firstName: window.Telegram.WebApp.initDataUnsafe.user?.first_name,
					lastName: window.Telegram.WebApp.initDataUnsafe.user?.last_name,
				}),
			})

			const result = await response.json()
			console.log('Результат обработки реферальной ссылки:', result)
		} catch (error) {
			console.error('Ошибка при обработке реферальной ссылки:', error)
		}
	}
	useEffect(() => {
		if (window.Telegram && window.Telegram.WebApp) {
			const initData = window.Telegram.WebApp.initData
			const startAppParam = new URLSearchParams(initData).get('startapp')

			if (startAppParam) {
				// Обработка реферальной ссылки
				console.log('Реферальный код:', startAppParam)
				// Вызовите API для обработки реферальной ссылки
				handleReferral(startAppParam)
			}
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			if (!user.id) return
			const getUserInfo = async () => {
				try {
					const response = await fetch(`${REQUEST_LINK}/api/user/${user.id}`, {
						headers: {
							'Content-Type': 'application/json',
						},
					})
					const data = await response.json()
					if (!!data.success) {
						dispatch(
							setUser({
								balance: data.userInfo.balance || null,
								tokens: data.userInfo.tokens || null,
								referralCode: data.userInfo.referralCode || null,
								walletAddress: data.userInfo.walletAddress || null,
								createdAt: data.userInfo.createdAt || null,
								updatedAt: data.userInfo.updatedAt || null,
							})
						)
					}
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			}

			const interval = setInterval(() => {
				getUserInfo()
			}, 12000)

			return () => clearInterval(interval)
		}
	}, [user.id, dispatch])

	const getLayout = Component.getLayout || (page => page)
	return <>{getLayout(<Component {...pageProps} />)}</>
}

export default function MyApp(props: MyAppProps) {
	return (
		<Provider store={store}>
			<Script
				src='https://telegram.org/js/telegram-web-app.js'
				strategy='beforeInteractive'
			/>
			<AppContent {...props} />
		</Provider>
	)
}
