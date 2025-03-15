import React, { FunctionComponent } from 'react'
import { ButtonProps } from './Button.d'
import { ButtonStyled } from './styled'

export const Button: FunctionComponent<ButtonProps> = ({
	title,
	theme,
	href,
}) => {
	return (
		<ButtonStyled href={href} theme={theme}>
			{title}
		</ButtonStyled>
	)
}

export default Button
