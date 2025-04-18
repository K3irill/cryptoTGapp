/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import { SizeSmallPackStyled } from '../styled'
import { SpacePugGameContext } from '../SpacePugContext'

const SizeSmallPack = ({
	onCollect,
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
					const newY = prev.y + 2

					if (
						newY + 30 >= shipPosition.y &&
						prev.y <= shipPosition.y + spacePugContext.shipHeight &&
						prev.x + 30 >= shipPosition.x &&
						prev.x <= shipPosition.x + spacePugContext.shipWidth
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

	return (
		<SizeSmallPackStyled style={{ left: position.x, top: position.y }}>
			<span>small</span> <span>size</span>
		</SizeSmallPackStyled>
	)
}

export default SizeSmallPack
