import React, { FunctionComponent } from 'react'
import { ButtonProps } from './Button.d'
import { ButtonStyled } from './styled'

export const Button: FunctionComponent<ButtonProps> = ({ title, theme }) => {
	return <ButtonStyled theme={theme}>{title}</ButtonStyled>
}

export default Button
