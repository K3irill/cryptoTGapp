import { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import '@/styles/globals.scss'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { setUser } from '@/store/slices/userSlice'
import Script from 'next/script'

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
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			const tg = window.Telegram.WebApp
			const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : null

			if (user) {
				dispatch(
					setUser({
						id: user.id,
						username: user.username || null,
						firstName: user.first_name || null,
						lastName: user.last_name || null,
						photoUrl: user.photo_url || null,
					})
				)

				// Telegram registration API call
				fetch('http://localhost:7000/telegram-register', {
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

	useEffect(() => {
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			if (!user.id) return

			// Fetch user information from server
			const getUserInfo = async () => {
				try {
					const response = await fetch(
						`http://localhost:7000/api/user/${user.id}`,
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)
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

			// Set interval to update user info every 15 seconds
			const interval = setInterval(() => {
				getUserInfo()
			}, 15000)

			return () => clearInterval(interval) // Cleanup interval on unmount
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
