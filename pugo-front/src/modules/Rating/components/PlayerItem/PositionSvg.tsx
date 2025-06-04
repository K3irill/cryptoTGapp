import React from 'react'
import { PositionText } from './styled'
import { BRONZA, GOLD, GREEN, PURPLE, RED, SILVER } from './Defses'

const PositionSvg = ({ position }: { position: number }) => {
	return (
		<svg
			style={{ overflow: 'visible' }}
			width='45'
			height='36'
			viewBox='0 0 45 36'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			{position === 0
				? GOLD
				: position === 1
				? SILVER
				: position === 2
				? BRONZA
				: position === 3
				? PURPLE
				: position > 3 && position < 100
				? GREEN
				: RED}
			<PositionText
				position={position}
				x='50%'
				y='50%'
				textAnchor='middle'
				dominantBaseline='middle'
				fill={position > 2 ? '#FFFFFF' : '#000'}
				fontSize='16'
				fontWeight='bold'
				style={{ pointerEvents: 'none' }}
			>
				{++position}
			</PositionText>
		</svg>
	)
}

export default PositionSvg
