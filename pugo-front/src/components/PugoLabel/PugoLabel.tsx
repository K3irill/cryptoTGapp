import React, { FunctionComponent } from 'react'
import { LabelStyled } from './styled'
import { PugoLabelProps } from './PugoLabel.d'

const PugoLabel: FunctionComponent<PugoLabelProps> = ({ title }) => {
	return (
		<LabelStyled>
			<span>{title}</span>
		</LabelStyled>
	)
}

export default PugoLabel
