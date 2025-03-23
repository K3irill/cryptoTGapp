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
import MegaBombs from './components/MegaBomb'
import { BasicModal } from '@/components/CenterModal/CenterModal'

const GameCanvas = () => {
	const [game] = useState(new Game())
	const [state, setState] = useState(game.getState())
	const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 })
	const [asteroids, setAsteroids] = useState([])
	const [coins, setCoins] = useState([])
	const [healthPacks, setHealthPacks] = useState([])
	const [megaBombs, setMegaBombs] = useState([])
	const [isGameOver, setIsGameOver] = useState(false)
	const [isShiftPressed, setIsShiftPressed] = useState(false)
	const [activeKeys, setActiveKeys] = useState(new Set())
	const [gameTime, setGameTime] = useState(0)
	const router = useRouter()
	const [showModal, setShowModal] = useState<boolean>(false)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShipPosition({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
			})
		}
	}, [])

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

	const handleMove = key => {
		if (!isGameOver) {
			setShipPosition(prev => {
				let newX = prev.x
				let newY = prev.y

				const speed = isShiftPressed || activeKeys.has(key) ? 30 : 20

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

	const handleSpeedUp = key => {
		setActiveKeys(prev => new Set(prev).add(key))
	}

	const handleSpeedDown = key => {
		setActiveKeys(prev => {
			const newSet = new Set(prev)
			newSet.delete(key)
			return newSet
		})
	}

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

	useEffect(() => {
		if (!isGameOver) {
			const megaBombsInterval = setInterval(() => {
				setMegaBombs(prev => [
					...prev,
					{
						id: `${Date.now()}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}, 30000)

			return () => clearInterval(megaBombsInterval)
		}
	}, [isGameOver])

	useEffect(() => {
		if (!isGameOver) {
			const timerInterval = setInterval(() => {
				setGameTime(prev => prev + 1)
			}, 1000)

			return () => clearInterval(timerInterval)
		}
	}, [isGameOver])

	useEffect(() => {
		if (state.lives <= 0) {
			setIsGameOver(true)
			setShowModal(true)
		}
	}, [state.lives])

	const handleCollide = asteroidId => {
		if (!isGameOver) {
			game.decreaseLives()
			setState(game.getState())
			setAsteroids(prev => prev.filter(asteroid => asteroid.id !== asteroidId))
		}
	}

	const handleCollect = coinId => {
		if (!isGameOver) {
			game.increaseScore()
			setState(game.getState())
			setCoins(prev => prev.filter(coin => coin.id !== coinId))
		}
	}

	const handleHealthPackCollect = healthPackId => {
		if (!isGameOver) {
			game.increaseLives()
			setState(game.getState())
			setHealthPacks(prev =>
				prev.filter(healthPack => healthPack.id !== healthPackId)
			)
		}
	}

	const handleMegaBombsCollect = megaBombsId => {
		if (!isGameOver) {
			game.decreaseLives(10)
			setState(game.getState())
			setMegaBombs(prev => prev.filter(megaBomb => megaBomb.id !== megaBombsId))
		}
	}

	const restartGame = () => {
		setIsGameOver(false)
		setGameTime(0)
		game.reset()
		setState(game.getState())
		setAsteroids([])
		setCoins([])
		setHealthPacks([])
		setMegaBombs([])
	}
	const handleModalClose = () => {
		setShowModal(false)
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
			{megaBombs.map(megaBomb => (
				<MegaBombs
					key={megaBomb.id}
					onCollect={() => handleMegaBombsCollect(megaBomb.id)}
					initialPosition={{ x: megaBomb.x, y: megaBomb.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
			<GameUi>
				<p>Счёт: {state.score}</p>
				<p>Жизни: {state.lives}</p>
				<p>Время: {gameTime} сек</p>
				{isGameOver && (
					<UiButtonsWrapper>
						<MulticolouredButton theme='blue' onClick={restartGame}>
							Играть
						</MulticolouredButton>
						<MulticolouredButton
							theme='blue'
							onClick={() => router.push('/earn')}
						>
							Выйти
						</MulticolouredButton>
					</UiButtonsWrapper>
				)}
			</GameUi>
			<Controls
				onMove={handleMove}
				onSpeedUp={handleSpeedUp}
				onSpeedDown={handleSpeedDown}
			/>
			<BasicModal
				btnText='ОК'
				title='Игра окончена'
				text='Похоже вы потратили все жизни'
				isVisible={showModal}
				onButtonClick={handleModalClose}
				onClose={handleModalClose}
				imgSrc='/pugs/upset-pug.png'
			/>
		</GameCanvasStyled>
	)
}

export default GameCanvas
