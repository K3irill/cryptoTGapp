import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import '@/styles/globals.scss'

type NextPageWithLayout = {
	getLayout?: (page: ReactElement) => ReactNode
} & AppProps['Component']

interface MyAppProps extends AppProps {
	Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
	const getLayout = Component.getLayout || (page => page)
	return getLayout(<Component {...pageProps} />)
}
