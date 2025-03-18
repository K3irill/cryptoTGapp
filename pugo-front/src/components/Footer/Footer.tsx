import React, { FunctionComponent, useState } from 'react'
import { FooterBottom, FooterStyled, FooterTop } from './styled'
import { FooterProps } from './Footer.d'
import Navigation from '../Navigation/Navigation'
import { Container } from '@/styles/styled'
import FooterTopNavigation from '../FooterTopNavigation/FooterTopNavigation'
import FooterBanner from '../FooterBanner/FooterBanner'
import { CONTENT } from '@/assets/constants/static_content'
export const Footer: FunctionComponent<FooterProps> = ({
	children,
	content,
}) => {
	const [extraMenuOpen, setExtraMenuOpen] = useState<boolean>(false)
	return (
		<FooterStyled>
			<FooterTop>
				{/* <FooterBanner /> */}
				{content.navigation.top_nav ? (
					<FooterTopNavigation
						extraMenuOpen={extraMenuOpen}
						elements={content.navigation.top_nav}
					/>
				) : (
					<FooterTopNavigation
						extraMenuOpen={extraMenuOpen}
						elements={CONTENT.footer.navigation.top_nav}
					/>
				)}
			</FooterTop>
			<FooterBottom>
				{content.navigation.top_nav ? (
					<Navigation
						setExtraMenuOpen={setExtraMenuOpen}
						extraMenuOpen={extraMenuOpen}
						elements={content.navigation.nav_elements}
					/>
				) : (
					<Navigation
						setExtraMenuOpen={setExtraMenuOpen}
						extraMenuOpen={extraMenuOpen}
						elements={CONTENT.footer.navigation.nav_elements}
					/>
				)}
			</FooterBottom>
			{children}
		</FooterStyled>
	)
}
