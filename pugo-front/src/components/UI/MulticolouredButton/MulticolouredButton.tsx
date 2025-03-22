import React, { FunctionComponent } from 'react'
import { MulticolouredButtonProps } from './MulticolouredButton.d'
import { ButtonStyled } from './styled'

export const MulticolouredButton: FunctionComponent<
	MulticolouredButtonProps
> = ({
	title,
	theme,
	iconSrc,
	onClick,
	children,
	onTouchStart,
	onTouchEnd,
	onMouseUp,
	onMouseDown,
}) => {
	return (
		<ButtonStyled
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			onClick={onClick}
			theme={theme}
		>
			{title}{' '}
			{iconSrc && (
				<span>
					<img src={iconSrc} alt='lock' />
				</span>
			)}
			{children}
		</ButtonStyled>
	)
}

export default MulticolouredButton
