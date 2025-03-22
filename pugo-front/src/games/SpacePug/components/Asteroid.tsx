/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { AsteroidStyled } from '../styled'

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

					// Проверка столкновения с кораблём
					if (
						newY + 40 >= shipPosition.y && // Нижняя граница астероида
						prev.y <= shipPosition.y + 50 && // Верхняя граница астероида
						prev.x + 40 >= shipPosition.x && // Левая граница астероида
						prev.x <= shipPosition.x + 50 // Правая граница астероида
					) {
						onCollide() // Вызываем колбэк при столкновении
						return { x: Math.random() * window.innerWidth, y: -50 } // Перезапускаем астероид
					}

					// Если астероид выходит за пределы экрана
					if (newY > window.innerHeight) {
						return { x: Math.random() * window.innerWidth, y: -50 } // Перезапускаем астероид
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
