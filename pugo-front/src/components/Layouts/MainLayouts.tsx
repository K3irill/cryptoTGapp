import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { Geist, Jersey_10 } from 'next/font/google'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { FooterContent, HeaderContent } from '@/types/types'

interface MainLayoutsProps {
	children: React.ReactNode | string
	header: HeaderContent
	footer: FooterContent
}

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
})

const jerseyFont = Jersey_10({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-jersey',
})

const MainLayout: FunctionComponent<MainLayoutsProps> = ({
	children,
	header,
	footer,
}) => {
	return (
		<>
			<Head>
				<title>PUGO</title>
				<meta name='description' content='PUGO coin' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={`app ${geistSans.variable} ${jerseyFont.variable}`}>
				<Header content={header} />
				{children}
				<Footer content={footer} />
			</div>
		</>
	)
}

export default MainLayout
