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

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Создаём элемент для звёздного неба
			const bgAnimation = document.createElement('div')
			bgAnimation.className = 'bg-animation'
			document.body.appendChild(bgAnimation)

			// Функция для создания звёздного слоя
			function createStarLayer(
				id: string,
				size: number,
				count: number,
				duration: number,
				color: string
			) {
				const layer = document.createElement('div')
				layer.id = id
				layer.style.width = `${size}px`
				layer.style.height = `${size}px`
				layer.style.background = 'transparent'
				layer.style.position = 'absolute'
				layer.style.top = '0'
				layer.style.left = '0'

				// Генерируем box-shadow для звёзд
				let boxShadow = ''
				for (let i = 0; i < count; i++) {
					const x = Math.random() * window.innerWidth
					const y = Math.random() * window.innerHeight * 2 // Удваиваем высоту для бесшовной анимации
					boxShadow += `${x}px ${y}px ${color}`
					if (i < count - 1) boxShadow += ', '
				}

				layer.style.boxShadow = boxShadow

				// Анимация
				layer.style.animation = `animStar ${duration}s linear infinite`

				// Создаём псевдоэлемент для бесконечного цикла
				const after = document.createElement('div')
				after.style.content = '" "'
				after.style.position = 'absolute'
				after.style.top = `${window.innerHeight * 2}px`
				after.style.width = `${size}px`
				after.style.height = `${size}px`
				after.style.background = 'transparent'
				after.style.boxShadow = boxShadow

				layer.appendChild(after)
				bgAnimation.appendChild(layer)
			}

			// Создаём несколько слоёв звёзд с разными параметрами
			createStarLayer('stars', 1, 200, 50, '#CED8E1')
			createStarLayer('stars2', 2, 100, 100, '#CED8E1')
			createStarLayer('stars3', 3, 50, 150, '#CED8E1')
			createStarLayer('stars4', 1, 300, 600, '#CED8E1')

			// Добавляем стили анимации
			const style = document.createElement('style')
			style.textContent = `
        @keyframes animStar {
            from { transform: translateY(-${window.innerHeight * 2}px); } 
              to { transform: translateY(0px); }
        }
        
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
      `
			document.head.appendChild(style)

			// Обновляем звёзды при изменении размера окна
			const updateStarsOnResize = () => {
				bgAnimation.innerHTML = '' // Очищаем текущие слои
				createStarLayer('stars', 1, 200, 50, '#CED8E1')
				createStarLayer('stars2', 2, 100, 100, '#CED8E1')
				createStarLayer('stars3', 3, 50, 150, '#CED8E1')
				createStarLayer('stars4', 1, 300, 600, '#CED8E1')

				// Обновляем анимацию с новым размером окна
				if (style) {
					style.textContent = `
            @keyframes animStar {
              from { transform: translateY(-${window.innerHeight * 2}px); } 
              to { transform: translateY(0px); }
            }
          `
				}
			}

			window.addEventListener('resize', updateStarsOnResize)

			// Убираем слушателя при размонтировании компонента
			return () => {
				window.removeEventListener('resize', updateStarsOnResize)
			}
		}
	}, [])

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
					username: window.Telegram.WebApp.initDataUnsafe.user?.username,
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
