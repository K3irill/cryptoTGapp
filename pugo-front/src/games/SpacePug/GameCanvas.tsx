/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect, useRef, useContext } from 'react'
import Ship from './components/Ship'
import Asteroid from './components/Asteroid'
import Coin from './components/Coin'
import HealthPack from './components/HealthPack'
import Controls from './components/Controls'
import { Game, MAX_FLASH_ASTEROIDS } from './gameLogic'
import {
	CenterUi,
	GameCanvasStyled,
	GameOverlay,
	GameUi,
	LevelText,
	RestartButtonsWrapper,
	ScoreText,
	StopBtn,
	TimeText,
	UiButtonsWrapper,
} from './styled'
import MulticolouredButton from '@/components/UI/MulticolouredButton/MulticolouredButton'
import { ButtonBackStyled } from '@/components/TopPageInfo/styled'
import { useRouter } from 'next/router'
import MegaBombs from './components/MegaBomb'
import { BasicModal } from '@/components/CenterModal/CenterModal'
import { useDispatch, useSelector } from 'react-redux'
import { REQUEST_LINK } from '../../../constant'
import { updateTokens } from '@/store/slices/userSlice'
import { RootState } from '@/store/store'
import FlashAsteroid from './components/FlashAsteroid'
import { useUpdateTokensMutation } from '@/store/services/api/userApi'
import { useSpacePugCompletedMutation } from '@/store/services/api/tasksApi'
import SizePack from './components/SizePack'
import { SpacePugGameContext } from './SpacePugContext'
import SizeSmallPack from './components/SizeSmallPack'

const GameCanvas = () => {
	const dispatch = useDispatch()
	const spacePugContext = useContext(SpacePugGameContext)
	if (!spacePugContext) {
		throw new Error('AppContext must be used within an AppProvider')
	}

	const [game] = useState(new Game())
	const [state, setState] = useState(game.getState())
	const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 })
	const [asteroids, setAsteroids] = useState([])
	const [flashAsteroids, setFlashAsteroids] = useState([])
	const [coins, setCoins] = useState([])
	const shipRef = useRef(null)
	const [healthPacks, setHealthPacks] = useState([])
	const [smallSizeActionTimer, setSmallSizeActionTimer] = useState(0)
	const [bigSizeActionTimer, setBigSizeActionTimer] = useState(0)
	const [sizeSmallPacks, setSizeSmallPacks] = useState([])
	const [sizePacks, setSizePacks] = useState([])
	const [megaBombs, setMegaBombs] = useState([])
	const [isGameOver, setIsGameOver] = useState(false)
	const [isShiftPressed, setIsShiftPressed] = useState(false)
	const [activeKeys, setActiveKeys] = useState(new Set())
	const [gameTime, setGameTime] = useState(0)
	const [updateTokens, { isLoadingUpdatingTokens, errorUpdatingTokens }] =
		useUpdateTokensMutation()
	const [spacePugCompleted, { isLoadingSpacePugScore, errorSpacePugScore }] =
		useSpacePugCompletedMutation()

	const router = useRouter()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [showStopModal, setShowStopModal] = useState<boolean>(false)
	const { id, tokens, automining, spacePugRecord } = useSelector(
		(state: RootState) => state.user
	)
	const updateSpacePugScoreServer = async (score: number) => {
		try {
			await spacePugCompleted({
				userId: id,
				score: Number(score),
			}).unwrap()
		} catch (error) {
			console.error('UpdateSpacePugScoreServer error:', error)
			throw error
		}
	}
	const updateTokensOnServer = async (delta: number) => {
		const roundedDelta = Math.round(Number(delta))
		try {
			const response = await updateTokens({
				telegramId: Number(id),
				amount: roundedDelta,
			}).unwrap()
			// if (response.success) {
			// } else {
			// }
		} catch (error) {
			console.error('Update tokens error:', error)
		}
	}

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
		if (!isGameOver && flashAsteroids.length < MAX_FLASH_ASTEROIDS) {
			const interval = setInterval(() => {
				setFlashAsteroids(prev => [
					...prev,
					{
						id: `${Date.now()}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}, 60000)
			return () => clearInterval(interval)
		}
	}, [isGameOver, flashAsteroids.length])

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
			const sizePackInterval = setInterval(() => {
				setSizePacks(prev => {
					if (prev.length < 1) {
						return [
							...prev,
							{
								id: `${Date.now()}-${Math.random()}`,
								x: Math.random() * window.innerWidth,
								y: -50,
							},
						]
					}
					return prev
				})
			}, 45000)

			return () => clearInterval(sizePackInterval)
		}
	}, [isGameOver])

	useEffect(() => {
		if (!isGameOver) {
			const sizeSmallPackInterval = setInterval(() => {
				setSizeSmallPacks(prev => {
					if (prev.length < 1) {
						return [
							...prev,
							{
								id: `${Date.now()}-${Math.random()}`,
								x: Math.random() * window.innerWidth,
								y: -50,
							},
						]
					}
					return prev
				})
			}, 30000)

			return () => clearInterval(sizeSmallPackInterval)
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
			updateTokensOnServer(state.score)
			updateSpacePugScoreServer(state.score)
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
	const handleFlashCollide = asteroidId => {
		if (!isGameOver) {
			game.decreaseLives(3)
			setState(game.getState())
			setFlashAsteroids(prev => [
				...prev,
				{
					id: `${Date.now()}-${Math.random()}`,
					x: Math.random() * window.innerWidth,
					y: -50,
				},
			])
		}
	}

	const handleMegaBombsCollide = megaBombsId => {
		if (!isGameOver) {
			game.gameOver()
			setState(game.getState())
			setMegaBombs(prev => prev.filter(megaBomb => megaBomb.id !== megaBombsId))
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
			game.increaseLives(2)
			setState(game.getState())
			setHealthPacks(prev =>
				prev.filter(healthPack => healthPack.id !== healthPackId)
			)
		}
	}

	function changeShipSize(w, h) {
		spacePugContext?.setShipWidth(w)
		spacePugContext?.setShipHeight(h)
		if (shipRef) {
			shipRef.current.style.height = h + 'px'
			shipRef.current.style.width = w + 'px'
		}
	}

	useEffect(() => {
		if (bigSizeActionTimer > 0) {
			const bigSizeTimerInterval = setInterval(() => {
				setBigSizeActionTimer(prev => prev - 1)
			}, 1000)

			return () => clearInterval(bigSizeTimerInterval)
		} else {
			changeShipSize(50, 50)
		}
	}, [bigSizeActionTimer])

	useEffect(() => {
		if (smallSizeActionTimer > 0) {
			const smallSizeTimerInterval = setInterval(() => {
				setSmallSizeActionTimer(prev => prev - 1)
			}, 1000)

			return () => clearInterval(smallSizeTimerInterval)
		} else {
			changeShipSize(50, 50)
		}
	}, [smallSizeActionTimer])

	const handleSizePackCollect = sizePackId => {
		if (!isGameOver) {
			setSmallSizeActionTimer(0)
			setBigSizeActionTimer(10)
			changeShipSize(80, 80)

			setSizePacks(prev => prev.filter(sizePack => sizePack.id !== sizePackId))
		}
	}

	const handleSizeSmallPackCollect = sizeSmallPackId => {
		if (!isGameOver) {
			setBigSizeActionTimer(0)
			setSmallSizeActionTimer(10)
			changeShipSize(25, 25)

			setSizeSmallPacks(prev =>
				prev.filter(sizePack => sizePack.id !== sizeSmallPackId)
			)
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
		setFlashAsteroids([])
		setBigSizeActionTimer(0)
		setSmallSizeActionTimer(0)
		setSizePacks([])
		setSizeSmallPacks([])
	}

	const handleModalClose = () => {
		setShowModal(false)
	}

	const handleModalStopClose = () => {
		setIsGameOver(true)
		setShowStopModal(false)
	}
	return (
		<GameCanvasStyled>
			<Ship ref={shipRef} onMove={handleMove} position={shipPosition} />
			{flashAsteroids.map(asteroid => (
				<FlashAsteroid
					key={asteroid.id}
					speed={6}
					onCollide={() => handleFlashCollide(asteroid.id)}
					initialPosition={{ x: asteroid.x, y: asteroid.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
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
			{sizePacks.map(sizePack => (
				<SizePack
					key={sizePack.id}
					onCollect={() => handleSizePackCollect(sizePack.id)}
					initialPosition={{ x: sizePack.x, y: sizePack.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}

			{sizeSmallPacks.map(sizePack => (
				<SizeSmallPack
					key={sizePack.id}
					onCollect={() => handleSizeSmallPackCollect(sizePack.id)}
					initialPosition={{ x: sizePack.x, y: sizePack.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
			{megaBombs.map(megaBomb => (
				<MegaBombs
					key={megaBomb.id}
					onCollect={() => handleMegaBombsCollide(megaBomb.id)}
					initialPosition={{ x: megaBomb.x, y: megaBomb.y }}
					isGameOver={isGameOver}
					shipPosition={shipPosition}
				/>
			))}
			<GameUi style={{ zIndex: 2 }}>
				<p>Record: {spacePugRecord || 0}</p>
				<ScoreText>BIFS: {state.score}</ScoreText>
				<LevelText>HP: {state.lives}</LevelText>
				<TimeText>Time: {gameTime} s</TimeText>
			</GameUi>
			{(smallSizeActionTimer || bigSizeActionTimer) && (
				<CenterUi>
					{smallSizeActionTimer > 0 && (
						<TimeText>Уменьшение: {smallSizeActionTimer} сек</TimeText>
					)}
					{bigSizeActionTimer > 0 && (
						<TimeText>Увеличение: {bigSizeActionTimer} сек</TimeText>
					)}
				</CenterUi>
			)}

			{isGameOver && !showModal && (
				<GameOverlay>
					<RestartButtonsWrapper>
						<MulticolouredButton theme='blue' onClick={restartGame}>
							Играть
						</MulticolouredButton>
						<MulticolouredButton
							theme='red'
							onClick={() => router.push('/earn')}
						>
							Выйти
						</MulticolouredButton>
					</RestartButtonsWrapper>
				</GameOverlay>
			)}
			{!isGameOver && (
				<StopBtn onClick={() => setShowStopModal(true)}>STOP</StopBtn>
			)}

			<Controls
				onMove={handleMove}
				onSpeedUp={handleSpeedUp}
				onSpeedDown={handleSpeedDown}
			/>
			<BasicModal
				btnText='ДА'
				title='Вы уверены, что хотите завершить игру?'
				text='Все добытые монеты будут потеряны!'
				isVisible={showStopModal}
				onButtonClick={handleModalStopClose}
				onClose={() => setShowStopModal(false)}
				background='url(/pugs/eating.jpg)'
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
