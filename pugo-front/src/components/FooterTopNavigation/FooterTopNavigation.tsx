import React, { FunctionComponent } from 'react'
import { NavigationStyled } from './styled'
import { NavElement } from '../NavCircleElement/styled'
import { FooterTopNavigationProps } from './FooterTopNavigation.d'

const FooterTopNavigation: FunctionComponent<FooterTopNavigationProps> = ({
	elements,
}) => {
	return (
		<NavigationStyled>
			{elements.map(el => (
				<NavElement href={el.href} key={el.id} background='transparent'>
					<img src={el.src} alt='' />
				</NavElement>
			))}
		</NavigationStyled>
	)
}

export default FooterTopNavigation
