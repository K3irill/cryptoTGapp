import React, { FunctionComponent } from 'react'
import { LabelStyled } from './styled'
import { PugoLabelProps } from './PugoLabel.d'

const PugoLabel: FunctionComponent<PugoLabelProps> = ({
	title,
	color,
	radius,
	theme,
	href,
	onClick,
}) => {
	return (
		<LabelStyled
			onClick={onClick}
			href={href}
			target={href ? '_blank' : undefined}
			rel={href ? 'noopener noreferrer' : undefined}
			theme={theme}
			color={color}
			radius={radius}
		>
			<span>{title}</span>
		</LabelStyled>
	)
}

export default PugoLabel
