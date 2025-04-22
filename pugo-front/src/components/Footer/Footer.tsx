import React, { FunctionComponent, useState } from 'react'
import { FooterBottom, FooterStyled, FooterTop } from './styled'
import { FooterProps } from './Footer.d'
import Navigation from '../Navigation/Navigation'
import { Container } from '@/styles/styled'
import FooterTopNavigation from '../FooterTopNavigation/FooterTopNavigation'
import FooterBanner from '../FooterBanner/FooterBanner'
import { useTranslation } from 'next-i18next'

export const Footer: FunctionComponent<FooterProps> = ({
	children,
	content,
}) => {
	const [extraMenuOpen, setExtraMenuOpen] = useState<boolean>(false)

	return (
		<FooterStyled>
			<FooterTop>
				<FooterTopNavigation
					extraMenuOpen={extraMenuOpen}
					elements={content.navigation.top_nav}
				/>
			</FooterTop>
			<FooterBottom>
				<Navigation
					setExtraMenuOpen={setExtraMenuOpen}
					extraMenuOpen={extraMenuOpen}
					elements={content.navigation.nav_elements}
				/>
			</FooterBottom>
			{children}
		</FooterStyled>
	)
}
