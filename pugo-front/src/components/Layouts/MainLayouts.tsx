import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import {
	mobotonFont,
	BaiJamjureeFont,
	DMSansFont,
	NosiferFont,
	InspirationFont,
	InclusiveFont,
	IcebergFont,
} from '@/assets/fonts/fonts'
import  Footer  from '../Footer/Footer'
import  Header  from '../Header/Header'
import { FooterContent, HeaderContent } from '@/types/types'
import { ShineBottomRightElem, ShineTopLeftElem } from '@/styles/styled'

interface MainLayoutsProps {
	children: React.ReactNode | string
	header: HeaderContent
	footer: FooterContent
}

const MainLayout: FunctionComponent<MainLayoutsProps> = ({
	children,
	header,
	footer,
}) => {
	return (
		<>
			<Head>
				<title>BIFS</title>
				<meta name='description' content='bifscoin телеграм приложение!' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className={`app ${NosiferFont.variable} ${mobotonFont.variable} ${BaiJamjureeFont.variable} ${DMSansFont.variable}   ${InspirationFont.variable} ${InclusiveFont.variable}  ${IcebergFont.variable} `}
			>
				<Header content={header} />
				{children}
				<ShineTopLeftElem src='icons/shinyTopElem.svg' />
				<ShineBottomRightElem src='icons/shinyElem.svg' />
				<Footer content={footer} />
			</div>
		</>
	)
}

export default MainLayout
