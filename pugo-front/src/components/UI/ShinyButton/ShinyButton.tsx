import React, { FunctionComponent } from 'react'
import { ShinyButtonProps } from './ShinyButton.d'
import { ButtonStyled, BackgroundImg, ButtonWrapper } from './styled'

export const ShinyButton: FunctionComponent<ShinyButtonProps> = ({
	title,
	subtitle,
	theme,
	onClick,
}) => {
	return (
		<ButtonWrapper>
			<BackgroundImg src='/shiny-back.png' alt='' />
			<ButtonStyled onClick={onClick} theme={theme}>
				{<p>{title}</p>}
				{subtitle && <span>{subtitle}</span>}
			</ButtonStyled>
		</ButtonWrapper>
	)
}

export default ShinyButton
