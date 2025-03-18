import React, { FunctionComponent } from 'react'
import { LabelStyled } from './styled'
import { LabelProps } from './Label.d'

const Label: FunctionComponent<LabelProps> = ({ title, size }) => {
	return (
		<LabelStyled size={size}>
			<span>{title}</span>
		</LabelStyled>
	)
}

export default Label
