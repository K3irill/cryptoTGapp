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
	const [isExploding, setIsExploding] = useState(false) // Состояние для взрыва
	const [isShockwaveVisible, setIsShockwaveVisible] = useState(false) // Состояние для ударной волны

	// useEffect для вызова alert, когда происходит взрыв
	useEffect(() => {
		if (isExploding) {
			setTimeout(() => {
				setIsExploding(false) // Останавливаем взрыв
				setIsShockwaveVisible(false) // Скрываем ударную волну
			}, 500) // 500 мс для задержки
		}
	}, [isExploding]) // Срабатывает, когда isExploding изменяется

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
						setIsExploding(true) // Начинаем анимацию взрыва
						setIsShockwaveVisible(true) // Показываем ударную волну
						onCollide() // Вызываем колбэк при столкновении

						return prev // Оставляем астероид на месте во время анимации
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

	return (
		<>
			{isExploding ? (
				<>
					<ExplosionStyled style={{ left: position.x, top: position.y }} />
					{isShockwaveVisible && (
						<ShockwaveStyled style={{ left: position.x, top: position.y }} />
					)}
				</>
			) : (
				<AsteroidStyled style={{ left: position.x, top: position.y }} />
			)}
		</>
	)
}

export default Asteroid
