import React, { FunctionComponent } from 'react'
import { NavBlockStyled, NavTitleStyled } from './styled'
import { NavigationProps } from './Navigation.d'
import { NavCircleElement } from '../NavCircleElement/NavCircleElement'
import { SvgIconStyled } from '@/styles/styled'

const Navigation: FunctionComponent<NavigationProps> = ({ elements }) => {
	return (
		<NavBlockStyled>
			{elements.map(elem =>
				!!elem.title ? (
					<NavTitleStyled key={elem.id}>{elem.title}</NavTitleStyled>
				) : (
					<NavCircleElement
						disabled={elem.availability}
						path={elem.href}
						key={elem.id}
					>
						<SvgIconStyled src={elem.src} alt={elem.title} />
					</NavCircleElement>
				)
			)}
		</NavBlockStyled>
	)
}

export default Navigation
