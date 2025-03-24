/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { HealthPackStyled } from '../styled'

const HealthPack = ({
	onCollect,
	initialPosition,
	isGameOver,
	shipPosition,
}) => {
	const [position, setPosition] = useState(initialPosition)

	useEffect(() => {
		if (!isGameOver) {
			const move = setInterval(() => {
				setPosition(prev => {
					const newY = prev.y + 2

					// Проверка столкновения с кораблём
					if (
						newY + 30 >= shipPosition.y &&
						prev.y <= shipPosition.y + 50 &&
						prev.x + 30 >= shipPosition.x &&
						prev.x <= shipPosition.x + 50
					) {
						onCollect()
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
	}, [isGameOver, shipPosition, onCollect])

	return <HealthPackStyled style={{ left: position.x, top: position.y }} />
}

export default HealthPack
