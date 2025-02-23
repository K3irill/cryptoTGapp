import React, { FunctionComponent } from 'react'
import { GoldStarStyled, StarsWrapperStyled } from './styled'
import { GoldStarProps } from './GoldStar.d'

const GoldStar: FunctionComponent<GoldStarProps> = ({ count = 1 }) => {
	return (
		<StarsWrapperStyled>
			{Array(count)
				.fill(null)
				.map((_, i) => (
					<GoldStarStyled src='/icons/gold-star.svg' index={i} key={i} />
				))}
		</StarsWrapperStyled>
	)
}

export default GoldStar
