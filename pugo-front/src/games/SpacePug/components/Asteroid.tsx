/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useContext, useEffect, useState, memo } from 'react'
import { AsteroidStyled, ExplosionStyled, ShockwaveStyled } from '../styled'
import { SpacePugGameContext } from '../SpacePugContext'

const Asteroid = ({
	speed,
	onCollide,
	initialPosition,
	isGameOver,
	shipPosition,
}) => {
	const [position, setPosition] = useState(initialPosition)
	const spacePugContext = useContext(SpacePugGameContext)
	if (!spacePugContext) {
		throw new Error('AppContext must be used within an AppProvider')
	}

	useEffect(() => {
		if (!isGameOver) {
			const move = setInterval(() => {
				setPosition(prev => {
					const newY = prev.y + speed

					if (
						newY + 20 >= shipPosition.y &&
						prev.y <= shipPosition.y + spacePugContext.shipHeight &&
						prev.x + 20 >= shipPosition.x &&
						prev.x <= shipPosition.x + spacePugContext.shipWidth
					) {
						onCollide()

						return prev
					}

					if (newY > window.innerHeight) {
						return { x: Math.random() * window.innerWidth, y: -50 }
					}

					return { ...prev, y: newY }
				})
			}, 16)

			return () => clearInterval(move)
		}
	}, [speed, onCollide, isGameOver, shipPosition])

	return <AsteroidStyled style={{ left: position.x, top: position.y }} />
}

export default memo(Asteroid)
