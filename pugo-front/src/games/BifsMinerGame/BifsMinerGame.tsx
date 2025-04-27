/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
	GameUi,
	GameCanvasStyled,
	ScoreText,
	TimeText,
	LevelText,
	ComboText,
	GameOverlay,
	MissedBifs,
	BtnGroup,
	StopBtn,
	RestartBtn,
	InfoBtn,
	ExitBtn,
} from '../SpacePug/styled'
import { BasicModal } from '@/components/CenterModal/CenterModal'
import { useUpdateTokensMutation } from '@/store/services/api/userApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import BifsMinerGuideModal from '@/components/BifsMinerGuideModal/BifsMinerGuideModal'
import { useTranslation } from 'next-i18next'

type GameObjectType =
	| 'bifs'
	| 'mops'
	| 'bug'
	| 'blackHole'
	| 'hunter'
	| 'fake'
	| 'crash'

interface GameObject {
	id: string
	x: number
	y: number
	type: GameObjectType
	velocity: number
	width: number
	height: number
	rotation?: number
	rotationSpeed?: number
	spawnedAt: number
}

const OBJECT_CONFIG = {
	bifs: {
		image: '/photos/crystal2.png',
		size: { width: 60, height: 60 },
		baseVelocity: 135,
		weight: 100,
		score: 3,
		spawnOffset: -80,
	},
	mops: {
		image: '/photos/bag.png',
		size: { width: 70, height: 70 },
		baseVelocity: 100,
		weight: 10,
		score: 15,
		spawnOffset: -100,
	},
	bug: {
		image: '/photos/bad-crystal.png',
		size: { width: 60, height: 60 },
		baseVelocity: 110,
		weight: 3,
		score: -100,
		spawnOffset: -80,
	},
	blackHole: {
		image: '/photos/black-hole.gif',
		size: { width: 90, height: 90 },
		baseVelocity: 40,
		weight: 3,
		effect: (score: number) => Math.floor(score * 0.5),
		spawnOffset: -120,
	},
	hunter: {
		image: '/photos/hunter.png',
		size: { width: 65, height: 65 },
		baseVelocity: 140,
		weight: 3,
		effect: () => {},
		spawnOffset: -90,
	},
	fake: {
		image: '/photos/bad-crystal.png',
		size: { width: 55, height: 55 },
		baseVelocity: 80,
		weight: 3,
		score: -20,
		spawnOffset: -70,
	},
	crash: {
		image: '/photos/skull.png',
		size: { width: 60, height: 60 },
		baseVelocity: 110,
		weight: 25,
		effect: () => {},
		spawnOffset: -80,
	},
} as const

const BifsMinerGame = () => {
	const { t, ready } = useTranslation('common')
	const gameTexts = t('content', { returnObjects: true }).games.bifsMiner

	const router = useRouter()
	const gameStartTime = useRef<number>(Date.now())
	const lastSpawnTime = useRef<number>(0)
	const [score, setScore] = useState(0)
	const [isGameActive, setIsGameActive] = useState(true)
	const [objects, setObjects] = useState<GameObject[]>([])
	const [gameTime, setGameTime] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [showStopModal, setShowStopModal] = useState(false)
	const [combo, setCombo] = useState(0)
	const [comboActive, setComboActive] = useState(false)
	const [level, setLevel] = useState(1)
	const [showInfoModal, setShowInfoModal] = useState(false)
	const [missedBifs, setMissedBifs] = useState(0)
	const [missedAvailableBifs, setMissedAvailableBifs] = useState(30)
	const [clickFeedback, setClickFeedback] = useState<{
		x: number
		y: number
		type: 'good' | 'bad'
	} | null>(null)
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
	const gameAreaRef = useRef<HTMLDivElement>(null)
	const animationFrameRef = useRef<number>(0)
	const comboTimerRef = useRef<NodeJS.Timeout | null>(null)
	const comboBuffTimerRef = useRef<NodeJS.Timeout | null>(null)

	const { id } = useSelector((state: RootState) => state.user)
	const [updateTokens] = useUpdateTokensMutation()

	// Memoized difficulty factor
	const difficultyFactor = useMemo(() => {
		const timeFactor = Math.min(1 + gameTime / 900, 1.5)
		return timeFactor * (1 + level * 0.15)
	}, [gameTime, level])

	// Preload images
	useEffect(() => {
		const imageUrls = Object.values(OBJECT_CONFIG).map(config => config.image)
		const uniqueUrls = Array.from(new Set(imageUrls))

		const loadImages = async () => {
			const loadStatus: Record<string, boolean> = {}

			await Promise.all(
				uniqueUrls.map(async url => {
					try {
						await new Promise((resolve, reject) => {
							const img = new Image()
							img.src = url
							img.onload = () => {
								loadStatus[url] = true
								resolve(true)
							}
							img.onerror = () => {
								loadStatus[url] = false
								resolve(false)
							}
						})
					} catch {
						loadStatus[url] = false
					}
				})
			)

			// Map loaded status to object types
			const loadedStatus = Object.fromEntries(
				Object.entries(OBJECT_CONFIG).map(([type, config]) => [
					type,
					loadStatus[config.image] || false,
				])
			)

			setLoadedImages(loadedStatus)
		}

		loadImages()

		return () => {
			Object.values(OBJECT_CONFIG).forEach(config => {
				const img = new Image()
				img.src = config.image
				img.onload = null
				img.onerror = null
			})
		}
	}, [])

	// Update tokens on server
	const updateTokensOnServer = useCallback(
		async (delta: number) => {
			const roundedDelta = Math.round(Number(delta))
			try {
				await updateTokens({
					telegramId: Number(id),
					amount: roundedDelta,
				}).unwrap()
			} catch (error) {
				console.error('Update tokens error:', error)
			}
		},
		[id, updateTokens]
	)

	// Spawn objects optimized
	const spawnObject = useCallback(() => {
		if (!isGameActive || Date.now() - lastSpawnTime.current < 100) return

		const now = Date.now()
		lastSpawnTime.current = now
		const x = Math.random() * (window.innerWidth - 100) + 50

		// Weighted random type selection
		const typePool = Object.entries(OBJECT_CONFIG).map(([type, config]) => ({
			type: type as GameObjectType,
			weight:
				level < 3 && (type === 'blackHole' || type === 'hunter')
					? 1
					: config.weight,
		}))

		const totalWeight = typePool.reduce((sum, el) => sum + el.weight, 0)
		const rand = Math.random() * totalWeight
		let sum = 0
		let selectedType: GameObjectType = 'bifs'

		for (const obj of typePool) {
			sum += obj.weight
			if (rand < sum) {
				selectedType = obj.type
				break
			}
		}

		const config = OBJECT_CONFIG[selectedType]
		const velocity = config.baseVelocity * difficultyFactor

		const newObject: GameObject = {
			id: `${now}-${Math.random()}`,
			x,
			y: config.spawnOffset || -60,
			type: selectedType,
			velocity,
			...config.size,
			rotation: 0,
			rotationSpeed: Math.random() * 4 - 2,
			spawnedAt: now,
		}

		setObjects(prev => {
			if (prev.length < 5 + level * 2) {
				return [...prev, newObject]
			}
			return prev
		})
	}, [isGameActive, difficultyFactor, level])

	// Game loop for object movement
	useEffect(() => {
		if (!isGameActive) return

		let lastTime = performance.now()

		const gameLoop = (currentTime: number) => {
			const deltaTime = currentTime - lastTime
			lastTime = currentTime

			setObjects(prev => {
				const updated: GameObject[] = []
				let missed = 0

				for (const obj of prev) {
					const newY = obj.y + (obj.velocity * deltaTime) / 1000
					if (newY < window.innerHeight + 100) {
						updated.push({
							...obj,
							y: newY,
							rotation:
								(obj.rotation ?? 0) +
								((obj.rotationSpeed ?? 0) * deltaTime) / 16,
						})
					} else if (obj.type === 'bifs') {
						missed++
					}
				}

				if (missed > 0) {
					setMissedBifs(prev => prev + missed)
				}

				return updated
			})

			animationFrameRef.current = requestAnimationFrame(gameLoop)
		}

		animationFrameRef.current = requestAnimationFrame(gameLoop)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [isGameActive])

	// Spawn interval
	useEffect(() => {
		const interval = setInterval(() => {
			spawnObject()
		}, 300 / difficultyFactor)

		return () => clearInterval(interval)
	}, [spawnObject, difficultyFactor])

	// Game timer
	useEffect(() => {
		if (!isGameActive) return
		const timer = setInterval(() => setGameTime(prev => prev + 1), 1000)
		return () => clearInterval(timer)
	}, [isGameActive])

	// Level up
	useEffect(() => {
		const newLevel = Math.min(Math.floor(score / 350) + 1, 10)
		if (newLevel !== level) {
			setLevel(newLevel)
		}
	}, [score, level])

	// Game over condition
	useEffect(() => {
		if (missedBifs >= missedAvailableBifs) {
			setIsGameActive(false)
			updateTokensOnServer(score)
			setShowModal(true)
		}
	}, [missedBifs, missedAvailableBifs, score, updateTokensOnServer])

	// Combo handler
	const handleCombo = useCallback(() => {
		setCombo(prev => {
			const newCombo = prev + 1

			if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
			comboTimerRef.current = setTimeout(() => {
				setCombo(0)
				setComboActive(false)
			}, 2500)

			if (newCombo >= 5 && !comboActive) {
				setComboActive(true)

				if (comboBuffTimerRef.current) clearTimeout(comboBuffTimerRef.current)
				comboBuffTimerRef.current = setTimeout(() => {
					setComboActive(false)
				}, 7000)
			}

			return newCombo
		})
	}, [comboActive])

	// Object click handler
	const handleObjectClick = useCallback(
		(e: React.MouseEvent, obj: GameObject) => {
			if (!isGameActive || Date.now() - obj.spawnedAt < 100) return

			const gameArea = gameAreaRef.current
			if (!gameArea) return

			const rect = gameArea.getBoundingClientRect()
			const clickX = e.clientX - rect.left
			const clickY = e.clientY - rect.top

			// Hit detection with padding
			const hitboxPadding = 60
			const dx = clickX - obj.x
			const dy = clickY - obj.y
			const distance = Math.sqrt(dx * dx + dy * dy)
			const radius = Math.max(obj.width, obj.height) / 2 + hitboxPadding

			if (distance > radius) return

			setObjects(prev => prev.filter(o => o.id !== obj.id))

			// Visual feedback
			setClickFeedback({
				x: clickX,
				y: clickY,
				type: ['bifs', 'mops', 'hunter'].includes(obj.type) ? 'good' : 'bad',
			})
			setTimeout(() => setClickFeedback(null), 500)

			// Score calculation
			const config = OBJECT_CONFIG[obj.type]
			if ('score' in config) {
				const baseScore = config.score
				const multiplier = comboActive ? 1.5 : 1
				const levelPenalty = Math.max(0.3, 1 - level * 0.05)

				setScore(prev =>
					Math.max(0, prev + Math.floor(baseScore * multiplier * levelPenalty))
				)

				if (obj.type === 'bifs' || obj.type === 'mops') {
					handleCombo()
				} else {
					setCombo(0)
				}
			} else if ('effect' in config) {
				if (obj.type === 'crash') {
					setIsGameActive(false)
					updateTokensOnServer(score)
					setShowModal(true)
				} else if (obj.type === 'hunter') {
					setMissedAvailableBifs(prev => prev + 10)
				} else {
					setScore(config.effect)
				}
			}
		},
		[isGameActive, comboActive, level, handleCombo, updateTokensOnServer, score]
	)

	// Restart game
	const restartGame = useCallback(() => {
		setScore(0)
		setObjects([])
		setGameTime(0)
		setCombo(0)
		setLevel(1)
		setIsGameActive(true)
		setMissedBifs(0)
		setShowModal(false)
		setMissedAvailableBifs(30)
		gameStartTime.current = Date.now()

		if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
		if (comboBuffTimerRef.current) clearTimeout(comboBuffTimerRef.current)
	}, [])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
			if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
			if (comboBuffTimerRef.current) clearTimeout(comboBuffTimerRef.current)
		}
	}, [])

	return (
		<GameCanvasStyled>
			<div
				ref={gameAreaRef}
				style={{
					position: 'absolute',
					width: '100vw',
					height: '100vh',
					overflow: 'hidden',
					top: 0,
					left: 0,
					zIndex: 1,
					background:
						'url(/photos/back.png) no-repeat, linear-gradient(to bottom, #36185a94, #0d0d21ef)',
					backgroundSize: 'cover',
				}}
			>
				{Object.values(loadedImages).some(v => !v) && (
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							color: 'white',
							fontSize: '24px',
							zIndex: 10,
						}}
					>
						{gameTexts.ui.loading}
					</div>
				)}

				{objects.map(obj => (
					<div
						key={obj.id}
						style={{
							position: 'absolute',
							top: `${obj.y}px`,
							left: `${obj.x}px`,
							width: `${obj.width}px`,
							height: `${obj.height}px`,
							transform: `translate(-50%, -50%) rotate(${
								obj.rotation || 0
							}deg)`,
							cursor: 'pointer',
							pointerEvents: 'auto',
							opacity: loadedImages[obj.type] ? 1 : 0,
							transition: 'transform 0.05s linear',
							willChange: 'transform, top, left',
						}}
						onClick={e => handleObjectClick(e, obj)}
					>
						<img
							src={OBJECT_CONFIG[obj.type].image}
							alt={obj.type}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'contain',
								pointerEvents: 'none',
							}}
							draggable={false}
						/>
					</div>
				))}

				{clickFeedback && (
					<div
						style={{
							position: 'absolute',
							left: `${clickFeedback.x}px`,
							top: `${clickFeedback.y}px`,
							transform: 'translate(-50%, -50%)',
							color: clickFeedback.type === 'good' ? '#4caf50' : '#f44336',
							fontSize: '24px',
							fontWeight: 'bold',
							pointerEvents: 'none',
							animation: 'floatUp 0.5s ease-out forwards',
							willChange: 'transform, opacity',
						}}
					>
						{clickFeedback.type === 'good'
							? gameTexts.feedback.good
							: gameTexts.feedback.bad}
					</div>
				)}
			</div>

			<GameUi style={{ zIndex: 2 }}>
				<ScoreText>
					{gameTexts.ui.score}: {score}
				</ScoreText>
				<TimeText>
					{gameTexts.ui.time}: {gameTime} {gameTexts.ui.seconds}
				</TimeText>
				<LevelText>
					{gameTexts.ui.level}: {level}
				</LevelText>
				<MissedBifs missedBifs={missedBifs}>
					{gameTexts.ui.missed}: {missedBifs} / {missedAvailableBifs}
				</MissedBifs>
				{comboActive && (
					<ComboText style={{ color: '#FFD700' }}>
						{gameTexts.ui.comboMode}
					</ComboText>
				)}
				{combo >= 2 && !comboActive && (
					<ComboText>
						{gameTexts.ui.combo}: {combo}x
					</ComboText>
				)}
			</GameUi>

			{isGameActive && !showModal && (
				<StopBtn onClick={() => setShowStopModal(true)}>
					{gameTexts.buttons.stop}
				</StopBtn>
			)}

			<BasicModal
				btnText={gameTexts.buttons.yes}
				title={gameTexts.modals.confirmExit.title}
				text={gameTexts.modals.confirmExit.text}
				isVisible={showStopModal}
				onButtonClick={() => {
					setIsGameActive(false)
					setShowStopModal(false)
				}}
				onClose={() => setShowStopModal(false)}
				background='url(/pugs/eating.jpg)'
			/>

			<BifsMinerGuideModal
				isVisible={showInfoModal}
				onClose={() => setShowInfoModal(false)}
			/>

			<BasicModal
				btnText={gameTexts.buttons.ok}
				title={gameTexts.modals.gameOver.title}
				text={gameTexts.modals.gameOver.text
					.replace('{score}', score.toString())
					.replace('{time}', gameTime.toString())
					.replace('{level}', level.toString())}
				isVisible={showModal}
				onButtonClick={() => setShowModal(false)}
				onClose={() => setShowModal(false)}
				imgSrc='/pugs/upset-pug.png'
			/>

			{!isGameActive && !showModal && (
				<GameOverlay>
					<BtnGroup>
						<RestartBtn onClick={restartGame}>
							{gameTexts.buttons.playAgain}
						</RestartBtn>
						<InfoBtn onClick={() => setShowInfoModal(true)}>
							{gameTexts.buttons.gameInfo}
						</InfoBtn>
						<ExitBtn onClick={() => router.push('/earn')}>
							{gameTexts.buttons.exit}
						</ExitBtn>
					</BtnGroup>
				</GameOverlay>
			)}
		</GameCanvasStyled>
	)
}

export default React.memo(BifsMinerGame)
