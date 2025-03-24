/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { CoinStyled } from '../styled'

const Coin = ({ onCollide, initialPosition, isGameOver, shipPosition }) => {
	const [position, setPosition] = useState(initialPosition)

	useEffect(() => {
		if (!isGameOver) {
			const move = setInterval(() => {
				setPosition(prev => {
					const newY = prev.y + 2

					if (
						newY + 40 >= shipPosition.y &&
						prev.y <= shipPosition.y + 50 &&
						prev.x + 40 >= shipPosition.x &&
						prev.x <= shipPosition.x + 50
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
