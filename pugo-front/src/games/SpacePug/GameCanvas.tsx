/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useReducer } from 'react'
import { gameReducer, initialGameState } from './gameLogic'

import React, { useState, useEffect, useRef, useContext } from 'react'
import Ship from './components/Ship'
import Asteroid from './components/Asteroid'
import Coin from './components/Coin'
import HealthPack from './components/HealthPack'
import Controls from './components/Controls'

import {
	BtnGroup,
	CenterUi,
	ExitBtn,
	GameCanvasStyled,
	GameOverlay,
	GameUi,
	InfoBtn,
	LevelText,
	LiveText,
	RecordText,
	RestartBtn,
	RestartButtonsWrapper,
	ScoreText,
	SpeedText,
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
import NitroPack from './components/Nitro'
import { GameGuideModal } from '@/components/GameInfoModal/GameInfoModal'
import BlackHole from './components/BlackHole'
import CoinBag from './components/CoinBag'

const GameCanvas = () => {
	const dispatch = useDispatch()
	const spacePugContext = useContext(SpacePugGameContext)
	if (!spacePugContext) {
		throw new Error('AppContext must be used within an AppProvider')
	}

	const [state, gameDispatch] = useReducer(gameReducer, initialGameState)

	const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 })
	const [asteroids, setAsteroids] = useState([])
	const [nitroPacks, setNitroPacks] = useState([])
	const [flashAsteroids, setFlashAsteroids] = useState([])
	const [coins, setCoins] = useState([])
	const [showGuideModal, setShowGuideModal] = useState(false)
	const shipRef = useRef(null)
	const [healthPacks, setHealthPacks] = useState([])
	const [coinsBag, setCoinsBag] = useState([])
	const [blackHoles, setBlackHoles] = useState([])
	const [smallSizeActionTimer, setSmallSizeActionTimer] = useState(0)
	const [bigSizeActionTimer, setBigSizeActionTimer] = useState(0)
	const [nitroActionTimer, setNitroActionTimer] = useState(0)
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
	const [collectedObjects, setCollectedObjects] = useState<Set<string>>(
		new Set()
	)

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
	// Добавь в начало компонента
	const gameLoop = useRef<number>()
	const lastSpawnTimes = useRef({
		asteroid: 0,
		coin: 0,
		healthPack: 0,
		blackHole: 0,
		coinsBag: 0,
		flashAsteroid: 0,
		nitroPack: 0,
		megaBomb: 0,
		sizePack: 0,
		sizeSmallPack: 0,
	})

	useEffect(() => {
		let lastFrameTime = performance.now()
		let lastSecondTime = Math.floor(lastFrameTime / 1000)
		let accumulatedTime = 0

		const loop = (now: number) => {
			const delta = now - lastFrameTime
			lastFrameTime = now
			accumulatedTime += delta

			// Обновляем таймер игры каждую секунду
			const currentSecond = Math.floor(now / 1000)
			if (currentSecond !== lastSecondTime) {
				lastSecondTime = currentSecond
				setGameTime(prev => prev + 1)
			}

			if (
				now - lastSpawnTimes.current.asteroid > 4000 &&
				asteroids.length < 20
			) {
				lastSpawnTimes.current.asteroid = now
				setAsteroids(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (now - lastSpawnTimes.current.coin > 8000 && coins.length < 20) {
				lastSpawnTimes.current.coin = now
				setCoins(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.healthPack > 45000 &&
				healthPacks.length < 20
			) {
				lastSpawnTimes.current.healthPack = now
				setHealthPacks(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.blackHole > 60000 &&
				blackHoles.length < 1
			) {
				lastSpawnTimes.current.blackHole = now
				setBlackHoles(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.coinsBag > 50000 &&
				coinsBag.length < 1
			) {
				lastSpawnTimes.current.coinsBag = now
				setCoinsBag(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.flashAsteroid > 150000 &&
				flashAsteroids.length < 2
			) {
				lastSpawnTimes.current.flashAsteroid = now
				setFlashAsteroids(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.nitroPack > 85000 &&
				nitroPacks.length < 1
			) {
				lastSpawnTimes.current.nitroPack = now
				setNitroPacks(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.megaBomb > 60000 &&
				megaBombs.length < 4
			) {
				lastSpawnTimes.current.megaBomb = now
				setMegaBombs(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.sizePack > 95000 &&
				sizePacks.length < 1
			) {
				lastSpawnTimes.current.sizePack = now
				setSizePacks(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			if (
				now - lastSpawnTimes.current.sizeSmallPack > 30000 &&
				sizeSmallPacks.length < 1
			) {
				lastSpawnTimes.current.sizeSmallPack = now
				setSizeSmallPacks(prev => [
					...prev,
					{
						id: `${now}-${Math.random()}`,
						x: Math.random() * window.innerWidth,
						y: -50,
					},
				])
			}

			// Рекурсивно запускаем
			gameLoop.current = requestAnimationFrame(loop)
		}

		if (!isGameOver) {
			gameLoop.current = requestAnimationFrame(loop)
		}

		return () => {
			if (gameLoop.current) cancelAnimationFrame(gameLoop.current)
		}
	}, [
		isGameOver,
		blackHoles.length,
		coinsBag.length,
		flashAsteroids.length,
		nitroPacks.length,
		sizePacks.length,
		sizeSmallPacks.length,
	])

	useEffect(() => {
		if (state.lives <= 0) {
			updateTokensOnServer(state.score + gameTime)
			updateSpacePugScoreServer(state.score)
			setIsGameOver(true)
			setShowModal(true)
		}
	}, [state.lives])

	const handleCollide = asteroidId => {
		if (!isGameOver && !collectedObjects.has(asteroidId)) {
			setCollectedObjects(prev => new Set(prev).add(asteroidId))
			gameDispatch({ type: 'DECREASE_LIVES', payload: 1 })
			setAsteroids(prev => prev.filter(asteroid => asteroid.id !== asteroidId))
		}
	}

	const handleFlashCollide = cometId => {
		if (!isGameOver && !collectedObjects.has(cometId)) {
			setCollectedObjects(prev => new Set(prev).add(cometId))
			gameDispatch({
				type: 'DECREASE_LIVES',
				payload: Math.floor(state.lives * 0.9),
			})

			setFlashAsteroids(prev => prev.filter(comet => comet.id !== cometId))
		}
	}

	const handleBlackHoleCollide = (id: string) => {
		if (!isGameOver && !collectedObjects.has(id)) {
			setCollectedObjects(prev => new Set(prev).add(id))
			gameDispatch({ type: 'DECREASE_SCORE', payload: state.score / 2 })
			setBlackHoles(prev => prev.filter(bh => bh.id !== id))
		}
	}

	const handleCoinsBagCollect = (id: string) => {
		if (!isGameOver && !collectedObjects.has(id)) {
			setCollectedObjects(prev => new Set(prev).add(id))
			gameDispatch({ type: 'INCREASE_SCORE', payload: 150 })
			setCoinsBag(prev => prev.filter(cb => cb.id !== id))
		}
	}

	const handleMegaBombsCollide = megaBombsId => {
		if (!isGameOver) {
			gameDispatch({ type: 'GAME_OVER' })
			setMegaBombs(prev => prev.filter(megaBomb => megaBomb.id !== megaBombsId))
		}
	}
	const handleCollect = coinId => {
		if (!isGameOver && !collectedObjects.has(coinId)) {
			setCollectedObjects(prev => new Set(prev).add(coinId))
			gameDispatch({ type: 'INCREASE_SCORE' })
			setCoins(prev => prev.filter(coin => coin.id !== coinId))
		}
	}

	const handleHealthPackCollect = healthPackId => {
		if (!isGameOver && !collectedObjects.has(healthPackId)) {
			setCollectedObjects(prev => new Set(prev).add(healthPackId))
			gameDispatch({ type: 'INCREASE_LIVES', payload: 2 })
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
		if (nitroActionTimer > 0) {
			const nitroActionTimerInterval = setInterval(() => {
				setNitroActionTimer(prev => prev - 1)
			}, 1000)

			return () => clearInterval(nitroActionTimerInterval)
		} else {
			setIsShiftPressed(false)
		}
	}, [nitroActionTimer])

	const handleNitroPackCollect = nitroPackId => {
		if (!isGameOver) {
			setNitroActionTimer(15)
			setIsShiftPressed(true)

			setNitroPacks(prev =>
				prev.filter(nitroPack => nitroPack.id !== nitroPackId)
			)
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
		gameDispatch({ type: 'RESET' })
		setAsteroids([])
		setCoins([])
		setHealthPacks([])
		setMegaBombs([])
		setFlashAsteroids([])
		setBigSizeActionTimer(0)
		setSmallSizeActionTimer(0)
		setSizePacks([])
		setNitroActionTimer(0)
		setNitroPacks([])
		setIsShiftPressed(false)
		setSizeSmallPacks([])
		setBlackHoles([])
		setCoinsBag([])

		lastSpawnTimes.current = {
			asteroid: performance.now(),
			coin: performance.now(),
			healthPack: performance.now(),
			blackHole: performance.now(),
			coinsBag: performance.now(),
			flashAsteroid: performance.now(),
			nitroPack: performance.now(),
			megaBomb: performance.now(),
			sizePack: performance.now(),
			sizeSmallPack: performance.now(),
		}
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
			<Ship
				speedBoost={isShiftPressed}
				ref={shipRef}
				onMove={handleMove}
				position={shipPosition}
			/>
			{!showGuideModal &&
				flashAsteroids.map(asteroid => (
					<FlashAsteroid
						key={asteroid.id}
						speed={isShiftPressed ? 6 * 1.5 : 6}
						onCollide={() => handleFlashCollide(asteroid.id)}
						initialPosition={{ x: asteroid.x, y: asteroid.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}

			{!showGuideModal &&
				blackHoles.map(bh => (
					<BlackHole
						key={bh.id}
						speed={isShiftPressed ? 2 * 1.5 : 2}
						onCollide={() => handleBlackHoleCollide(bh.id)}
						initialPosition={{ x: bh.x, y: bh.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}

			{!showGuideModal &&
				coinsBag.map(cb => (
					<CoinBag
						key={cb.id}
						speed={isShiftPressed ? 2 * 1.5 : 2}
						onCollect={() => handleCoinsBagCollect(cb.id)}
						initialPosition={{ x: cb.x, y: cb.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}

			{!showGuideModal &&
				asteroids.map(asteroid => (
					<Asteroid
						key={asteroid.id}
						speed={isShiftPressed ? 2 * 1.5 : 2}
						onCollide={() => handleCollide(asteroid.id)}
						initialPosition={{ x: asteroid.x, y: asteroid.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}

			{!showGuideModal &&
				nitroPacks.map(nitroID => (
					<NitroPack
						key={nitroID.id}
						speed={isShiftPressed ? 2 * 1.5 : 2}
						onCollect={() => handleNitroPackCollect(nitroID.id)}
						initialPosition={{ x: nitroID.x, y: nitroID.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}

			{!showGuideModal &&
				coins.map(coin => (
					<Coin
						speed={isShiftPressed ? 2 * 1.5 : 2}
						key={coin.id}
						onCollide={() => handleCollect(coin.id)}
						initialPosition={{ x: coin.x, y: coin.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}
			{!showGuideModal &&
				healthPacks.map(healthPack => (
					<HealthPack
						speed={isShiftPressed ? 2 * 1.5 : 2}
						key={healthPack.id}
						onCollect={() => handleHealthPackCollect(healthPack.id)}
						initialPosition={{ x: healthPack.x, y: healthPack.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}
			{!showGuideModal &&
				sizePacks.map(sizePack => (
					<SizePack
						speed={isShiftPressed ? 2 * 1.5 : 2}
						key={sizePack.id}
						onCollect={() => handleSizePackCollect(sizePack.id)}
						initialPosition={{ x: sizePack.x, y: sizePack.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}

			{!showGuideModal &&
				sizeSmallPacks.map(sizePack => (
					<SizeSmallPack
						speed={isShiftPressed ? 2 * 1.5 : 2}
						key={sizePack.id}
						onCollect={() => handleSizeSmallPackCollect(sizePack.id)}
						initialPosition={{ x: sizePack.x, y: sizePack.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}
			{!showGuideModal &&
				megaBombs.map(megaBomb => (
					<MegaBombs
						speed={isShiftPressed ? 2 * 1.5 : 2}
						key={megaBomb.id}
						onCollect={() => handleMegaBombsCollide(megaBomb.id)}
						initialPosition={{ x: megaBomb.x, y: megaBomb.y }}
						isGameOver={isGameOver}
						shipPosition={shipPosition}
					/>
				))}
			{!showGuideModal && (
				<GameUi style={{ zIndex: 2 }}>
					<RecordText>Record: {spacePugRecord || 0}</RecordText>
					<ScoreText>BIFS: {state.score}</ScoreText>
					<LiveText lives={state.lives}>HP: {state.lives}</LiveText>
					<TimeText>Time: {gameTime} s</TimeText>
				</GameUi>
			)}

			{((!showGuideModal && smallSizeActionTimer) ||
				bigSizeActionTimer ||
				nitroActionTimer) && (
				<CenterUi>
					{smallSizeActionTimer > 0 && (
						<TimeText>Уменьшение: {smallSizeActionTimer} сек</TimeText>
					)}
					{bigSizeActionTimer > 0 && (
						<TimeText>Увеличение: {bigSizeActionTimer} сек</TimeText>
					)}

					{nitroActionTimer > 0 && (
						<SpeedText>Ускорение: {nitroActionTimer} сек</SpeedText>
					)}
				</CenterUi>
			)}

			{!showGuideModal && isGameOver && !showModal && (
				<GameOverlay>
					<BtnGroup>
						<RestartBtn
							onClick={restartGame}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
						>
							Играть снова
						</RestartBtn>

						<InfoBtn
							onClick={() => setShowGuideModal(true)}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
						>
							Об игре
						</InfoBtn>

						<ExitBtn
							onClick={() => router.push('/earn')}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
						>
							Выйти
						</ExitBtn>
					</BtnGroup>
				</GameOverlay>
			)}
			{!isGameOver && (
				<StopBtn onClick={() => setShowStopModal(true)}>STOP</StopBtn>
			)}
			{!showGuideModal && (
				<Controls
					onMove={handleMove}
					onSpeedUp={handleSpeedUp}
					onSpeedDown={handleSpeedDown}
					activeKeys={activeKeys}
				/>
			)}

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
			<GameGuideModal
				isVisible={showGuideModal}
				onClose={() => setShowGuideModal(false)}
			/>
		</GameCanvasStyled>
	)
}

export default GameCanvas
