import React, { FunctionComponent } from 'react'
import { MulticolouredButtonProps } from './MulticolouredButton.d'
import { ButtonStyled } from './styled'

export const MulticolouredButton: FunctionComponent<
	MulticolouredButtonProps
> = ({ title, theme, iconSrc }) => {
	return (
		<ButtonStyled theme={theme}>
			{title}{' '}
			{iconSrc && (
				<span>
					<img src={iconSrc} alt='lock' />
				</span>
			)}
		</ButtonStyled>
	)
}

export default MulticolouredButton
