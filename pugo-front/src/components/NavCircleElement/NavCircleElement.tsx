import React, { FunctionComponent } from 'react'
import { NavElement } from './styled'
import { NavCircleElementProps } from './NavCircleElement.d'

export const NavCircleElement: FunctionComponent<NavCircleElementProps> = ({
	children,
	path,
}) => {
	return <NavElement href={path}>{children}</NavElement>
}
