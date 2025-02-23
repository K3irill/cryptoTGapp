import React, { FunctionComponent } from 'react'
import { NavElement } from './styled'
import { NavCircleElementProps } from './NavCircleElement.d'

export const NavCircleElement: FunctionComponent<NavCircleElementProps> = ({
	children,
	path,
	width,
	height,
	background,
	disabled,
}) => {
	return (
		<NavElement
			background={background}
			width={width}
			height={height}
			href={path}
			disabled={disabled}
		>
			{children}
		</NavElement>
	)
}
