import React, { FunctionComponent } from 'react'
import { NavigationStyled } from './styled'
import { NavElement } from '../NavCircleElement/styled'
import { HomeNavigationProps } from './HomeNavigation.d'

const HomeNavigation: FunctionComponent<HomeNavigationProps> = ({
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

export default HomeNavigation
