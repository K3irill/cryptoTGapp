import React, { FunctionComponent } from 'react'
import { CloseButtonProps } from './CloseButton.d'
import { ButtonStyled } from './styled'

export const CloseButton: FunctionComponent<CloseButtonProps> = ({
	title,
	theme,
	iconSrc,
	onClick,
}) => {
	return (
		<ButtonStyled onClick={onClick} theme={theme}>
			{title}{' '}
			{iconSrc && (
				<span>
					<img src={iconSrc} alt='lock' />
				</span>
			)}
		</ButtonStyled>
	)
}

export default CloseButton
