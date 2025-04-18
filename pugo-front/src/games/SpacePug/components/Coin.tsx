/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import { CoinStyled } from '../styled'
import { SpacePugGameContext } from '../SpacePugContext'

const Coin = ({ onCollide, initialPosition, isGameOver, shipPosition }) => {
	const [position, setPosition] = useState(initialPosition)
	const spacePugContext = useContext(SpacePugGameContext)
	if (!spacePugContext) {
		throw new Error('AppContext must be used within an AppProvider')
	}

	useEffect(() => {
		if (!isGameOver) {
			const move = setInterval(() => {
				setPosition(prev => {
					const newY = prev.y + 2

					if (
						newY + 40 >= shipPosition.y &&
						prev.y <= shipPosition.y + spacePugContext.shipHeight &&
						prev.x + 40 >= shipPosition.x &&
						prev.x <= shipPosition.x + spacePugContext.shipWidth
					) {
						onCollide()
						return { x: Math.random() * window.innerWidth, y: -50 }
					}

					if (newY > window.innerHeight) {
						return { x: Math.random() * window.innerWidth, y: -50 }
					}

					return { ...prev, y: newY }
				})
			}, 16)

			return () => clearInterval(move)
		}
	}, [isGameOver, shipPosition, onCollide])

	return <CoinStyled style={{ left: position.x, top: position.y }} />
}

export default Coin
