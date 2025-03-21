import React, { FunctionComponent } from 'react'
import { LabelStyled } from './styled'
import { LabelProps } from './Label.d'

const Label: FunctionComponent<LabelProps> = ({ title, size, isInline }) => {
	return (
		<LabelStyled isInline={isInline} size={size}>
			<span>{title}</span>
		</LabelStyled>
	)
}

export default Label
