import { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import '@/styles/globals.scss'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { setUser } from '@/store/slices/userSlice'
import Script from 'next/script'
import { IS_DEV, REQUEST_LINK } from '../../constant'
import {
	appWithTranslation,
	i18n,
	UserConfig,
	useTranslation,
} from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { useRouter } from 'next/router'
type NextPageWithLayout = {
	getLayout?: (page: ReactElement) => ReactNode
} & AppProps['Component']

interface MyAppProps extends AppProps {
	Component: NextPageWithLayout
}

function AppContent({ Component, pageProps }: MyAppProps) {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)
	const router = useRouter()
	const { i18n } = useTranslation()

	useEffect(() => {
		if (!!i18n) {
			const savedLanguage = localStorage.getItem('language')
			if (savedLanguage && savedLanguage !== i18n.language) {
				i18n.changeLanguage(savedLanguage)
			}
		}
	}, [i18n])

	useEffect(() => {
		const initializeLanguage = async () => {
			const savedLanguage = localStorage.getItem('language')
			const preferredLanguage = savedLanguage || router.locale || 'en'

			if (preferredLanguage !== i18n.language) {
				await i18n.changeLanguage(preferredLanguage)
			}
		}

		initializeLanguage()
	}, [router.locale, i18n])

	const createStarLayer = (
		id: string,
		size: number,
		count: number,
		duration: number,
		color: string
	) => {
		const layer = document.createElement('div')
		layer.id = id
		layer.style.position = 'absolute'
		layer.style.top = '0'
		layer.style.left = '0'
		layer.style.width = '100%'
		layer.style.height = `${window.innerHeight * 2}px`
		layer.style.overflow = 'hidden'

		for (let i = 0; i < count; i++) {
			const x = Math.random() * window.innerWidth
			const y = Math.random() * window.innerHeight * 2

			const star = document.createElement('div')
			star.className = 'star'
			star.style.position = 'absolute'
			star.style.left = `${x}px`
			star.style.top = `${y}px`
			star.style.width = `${size}px`
			star.style.height = `${size}px`
			star.style.background = color
			star.style.borderRadius = '50%'
			star.style.opacity = `${Math.random() * 0.8 + 0.2}`

			layer.appendChild(star)
		}

		// Анимация слоя
		layer.style.animation = `animStarLayer-${id} ${duration}s linear infinite`

		// Создаём CSS keyframes
		const style = document.createElement('style')
		style.textContent = `
      @keyframes animStarLayer-${id} {
        from { transform: translateY(-${window.innerHeight}px); }
        to { transform: translateY(0); }
      }
    `
		document.head.appendChild(style)

		return layer
	}

	const useStarryBackground = () => {
		useEffect(() => {
			if (typeof window !== 'undefined') {
				// Создаём контейнер для анимации
				const bgAnimation = document.createElement('div')
				bgAnimation.className = 'bg-animation'
				document.body.appendChild(bgAnimation)

				// Параметры слоёв звёзд
				const starParams = [
					{ id: 'stars', size: 1, count: 100, duration: 50, color: '#CED8E1' },
					{ id: 'stars2', size: 2, count: 50, duration: 100, color: '#CED8E1' },
					{ id: 'stars3', size: 3, count: 25, duration: 150, color: '#CED8E1' },
					{
						id: 'stars4',
						size: 1,
						count: 150,
						duration: 600,
						color: '#CED8E1',
					},
				]

				// Генерация слоёв
				starParams.forEach(params => {
					const layer = createStarLayer(
						params.id,
						params.size,
						params.count,
						params.duration,
						params.color
					)
					bgAnimation.appendChild(layer)
				})

				// Стили контейнера
				const style = document.createElement('style')
				style.textContent = `
          .bg-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
          }
        `
				document.head.appendChild(style)

				// Обработка resize
				let resizeTimeout: ReturnType<typeof setTimeout>
				const updateStarsOnResize = () => {
					clearTimeout(resizeTimeout)
					resizeTimeout = setTimeout(() => {
						bgAnimation.innerHTML = ''
						starParams.forEach(params => {
							const layer = createStarLayer(
								params.id,
								params.size,
								params.count,
								params.duration,
								params.color
							)
							bgAnimation.appendChild(layer)
						})
					}, 300)
				}

				window.addEventListener('resize', updateStarsOnResize)

				// Очистка
				return () => {
					window.removeEventListener('resize', updateStarsOnResize)
					document.body.removeChild(bgAnimation)
				}
			}
		}, [])
	}
	useStarryBackground()
  
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
						username:
							user.username || user.first_name || String(user.id) || null,
						firstName: user.first_name || null,
						lastName: user.last_name || null,
						photoUrl: user.photo_url || null,
					})
				)

				const isFirstTime = localStorage.getItem('isFirstTime')
				if (isFirstTime === null) {
					localStorage.setItem('isFirstTime', 'true')
				}

				const urlParams = new URLSearchParams(window.location.search)
				const referralCode = urlParams.get('tgWebAppStartParam')

				if (!referralCode) {
					fetch(`${REQUEST_LINK}/telegram-register`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							telegramId: user.id,
							username:
								user.username || user.first_name || String(user.id) || null,
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
				} else {
					handleReferral(referralCode)
				}
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
					username:
						window.Telegram.WebApp.initDataUnsafe.user?.username ||
						window.Telegram.WebApp.initDataUnsafe.user?.first_name ||
						window.Telegram.WebApp.initDataUnsafe.user?.id,
					firstName: window.Telegram.WebApp.initDataUnsafe.user?.first_name,
					lastName: window.Telegram.WebApp.initDataUnsafe.user?.last_name,
				}),
			})

			const result = await response.json()
		} catch (error) {
			console.error('Ошибка при обработке реферальной ссылки:', error)
		}
	}

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

function MyApp(props: MyAppProps) {
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
export default appWithTranslation(MyApp, nextI18NextConfig as UserConfig)
