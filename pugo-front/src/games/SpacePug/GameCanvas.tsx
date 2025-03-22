/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import Ship from './components/Ship'
import Asteroid from './components/Asteroid'
import Coin from './components/Coin'
import HealthPack from './components/HealthPack'
import Controls from './components/Controls'
import { Game } from './gameLogic'
import { GameCanvasStyled, GameUi, UiButtonsWrapper } from './styled'
import MulticolouredButton from '@/components/UI/MulticolouredButton/MulticolouredButton'
import { ButtonBackStyled } from '@/components/TopPageInfo/styled'
import { useRouter } from 'next/router'

const GameCanvas = () => {
	const [game] = useState(new Game())
	const [state, setState] = useState(game.getState())
	const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 })
	const [asteroids, setAsteroids] = useState([])
	const [coins, setCoins] = useState([])
	const [healthPacks, setHealthPacks] = useState([])
	const [isGameOver, setIsGameOver] = useState(false)
	const [isShiftPressed, setIsShiftPressed] = useState(false)
	const [activeKeys, setActiveKeys] = useState(new Set()) // Состояние для активных кнопок
	const router = useRouter()
	// Инициализация позиции корабля
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShipPosition({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
			})
		}
	}, [])

	// Обработка нажатия клавиш
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Shift') {
				setIsShiftPressed(true)
			}
		}

		const handleKeyUp = e => {
			if (e.key === 'Shift') {
				setIsShiftPressed(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	// Логика движения корабля
	const handleMove = key => {
		if (!isGameOver) {
			setShipPosition(prev => {
				let newX = prev.x
				let newY = prev.y

				const speed = isShiftPressed || activeKeys.has(key) ? 20 : 10 // Увеличение скорости при зажатом Shift или активной кнопке

				if (key === 'ArrowLeft') {
					newX = Math.max(0, prev.x - speed)
				} else if (key === 'ArrowRight') {
					newX = Math.min(window.innerWidth - 50, prev.x + speed)
				} else if (key === 'ArrowUp') {
					newY = Math.max(0, prev.y - speed)
				} else if (key === 'ArrowDown') {
					newY = Math.min(window.innerHeight - 50, prev.y + speed)
				}

				return { x: newX, y: newY }
			})
		}
	}

	// Увеличение скорости при удержании кнопки
	const handleSpeedUp = key => {
		setActiveKeys(prev => new Set(prev).add(key)) // Добавляем кнопку в активные
	}

	// Уменьшение скорости при отпускании кнопки
	const handleSpeedDown = key => {
		setActiveKeys(prev => {
			const newSet = new Set(prev)
			newSet.delete(key) // Удаляем кнопку из активных
			return newSet
		})
	}

	// Создание астероидов
	useEffect(() => {
		if (!isGameOver) {
			const asteroidInterval = setInterval(() => {
				setAsteroids(prev => [
					...prev,
					{
						id: `${Date.now()}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}, 4000)

			return () => clearInterval(asteroidInterval)
		}
	}, [isGameOver])

	// Создание монет
	useEffect(() => {
		if (!isGameOver) {
			const coinInterval = setInterval(() => {
				setCoins(prev => [
					...prev,
					{
						id: `${Date.now()}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}, 5000)

			return () => clearInterval(coinInterval)
		}
	}, [isGameOver])

	// Создание HealthPack
	useEffect(() => {
		if (!isGameOver) {
			const healthPackInterval = setInterval(() => {
				setHealthPacks(prev => [
					...prev,
					{
						id: `${Date.now()}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}, 20000)

			return () => clearInterval(healthPackInterval)
		}
	}, [isGameOver])

	// Проверка на завершение игры
	useEffect(() => {
		if (state.lives <= 0) {
			setIsGameOver(true)
			alert('Игра окончена!')
		}
	}, [state.lives])

	// Логика столкновения с астероидом
	const handleCollide = asteroidId => {
		if (!isGameOver) {
			game.decreaseLives()
			setState(game.getState())
			setAsteroids(prev => prev.filter(asteroid => asteroid.id !== asteroidId))
		}
	}

	// Логика сбора монеты
	const handleCollect = coinId => {
		if (!isGameOver) {
			game.increaseScore()
			setState(game.getState())
			setCoins(prev => prev.filter(coin => coin.id !== coinId))
		}
	}

	// Логика сбора HealthPack
	const handleHealthPackCollect = healthPackId => {
		if (!isGameOver) {
			game.increaseLives()
			setState(game.getState())
			setHealthPacks(prev =>
				prev.filter(healthPack => healthPack.id !== healthPackId)
			)
		}
	}

	// Рестарт игры
	const restartGame = () => {
		setIsGameOver(false)
		game.reset()
		setState(game.getState())
		setAsteroids([])
		setCoins([])
		setHealthPacks([])
	}

	return (
		<GameCanvasStyled>
			<Ship onMove={handleMove} position={shipPosition} />
			{asteroids.map(asteroid => (
				<Asteroid
					key={asteroid.id}
					speed={2}
					onCollide={() => handleCollide(asteroid.id)}
					initialPosition={{ x: asteroid.x, y: asteroid.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
			{coins.map(coin => (
				<Coin
					key={coin.id}
					onCollide={() => handleCollect(coin.id)}
					initialPosition={{ x: coin.x, y: coin.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
			{healthPacks.map(healthPack => (
				<HealthPack
					key={healthPack.id}
					onCollect={() => handleHealthPackCollect(healthPack.id)}
					initialPosition={{ x: healthPack.x, y: healthPack.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
			<GameUi>
				<p>Счёт: {state.score}</p>
				<p>Жизни: {state.lives}</p>
				{isGameOver && (
					<UiButtonsWrapper>
						<MulticolouredButton theme='blue' onClick={restartGame}>
							Играть
						</MulticolouredButton>

						<MulticolouredButton theme='blue' onClick={() => router.push('/')}>
							Выйти
						</MulticolouredButton>
					</UiButtonsWrapper>
				)}
			</GameUi>
			<Controls
				onMove={handleMove}
				onSpeedUp={handleSpeedUp} // Передаём функции для управления скоростью
				onSpeedDown={handleSpeedDown}
			/>
		</GameCanvasStyled>
	)
}

export default GameCanvas
