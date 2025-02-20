import { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import '@/styles/globals.scss'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store/store'
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
	useEffect(() => {
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			const tg = window.Telegram.WebApp
			const user = tg.initDataUnsafe?.user
			if (user) {
				console.log(user)
				dispatch(
					setUser({
						id: user.id,
						username: user.username || null,
						firstName: user.first_name || null,
						lastName: user.last_name || null,
						photoUrl: user.photo_url || null,
					})
				)
			}
		}
	}, [dispatch])

	const getLayout = Component.getLayout || (page => page)
	return getLayout(<Component {...pageProps} />)
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
