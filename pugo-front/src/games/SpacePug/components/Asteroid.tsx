/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { AsteroidStyled, ExplosionStyled, ShockwaveStyled } from '../styled'

const Asteroid = ({
	speed,
	onCollide,
	initialPosition,
	isGameOver,
	shipPosition,
}) => {
	const [position, setPosition] = useState(initialPosition)

	useEffect(() => {
		if (!isGameOver) {
			const move = setInterval(() => {
				setPosition(prev => {
					const newY = prev.y + speed

					if (
						newY + 20 >= shipPosition.y &&
						prev.y <= shipPosition.y + 50 &&
						prev.x + 20 >= shipPosition.x &&
						prev.x <= shipPosition.x + 50
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

export default Asteroid
