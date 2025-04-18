import React, { useState } from 'react'
import GameCanvas from '@/games/SpacePug/GameCanvas'
import { SpacePugGameContext } from '@/games/SpacePug/SpacePugContext'

const SpacePug = () => {
	const [shipWidth, setShipWidth] = useState(50)
	const [shipHeight, setShipHeight] = useState(50)
	return (
		<SpacePugGameContext.Provider
			value={{ shipWidth, setShipWidth, shipHeight, setShipHeight }}
		>
			<div>
				<GameCanvas />
			</div>
		</SpacePugGameContext.Provider>
	)
}

export default SpacePug
