import React, { FunctionComponent } from 'react'
import { FooterStyled } from './styled'
import { FooterProps } from './Footer.d'
import Navigation from '../Navigation/Navigation'
import { Container } from '@/styles/styled'

export const Footer: FunctionComponent<FooterProps> = ({
	children,
	content,
}) => {
	return (
		<FooterStyled>
			<Container>
				<Navigation elements={content.navigation.nav_elements} />
				{children}
			</Container>
		</FooterStyled>
	)
}
