/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import {
	GameUi,
	GameCanvasStyled,
	UiButtonsWrapper,
	AnimatedObject,
	ScoreText,
	TimeText,
	LevelText,
	ComboText,
	GameOverlay,
	RestartButtonsWrapper,
} from '../SpacePug/styled'
import MulticolouredButton from '@/components/UI/MulticolouredButton/MulticolouredButton'
import { BasicModal } from '@/components/CenterModal/CenterModal'
import { useUpdateTokensMutation } from '@/store/services/api/userApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

// Типы объектов игры
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

// Конфигурация объектов игры
const OBJECT_CONFIG = {
	bifs: {
		image: '/photos/crystal2.png',
		size: { width: 60, height: 60 },
		baseVelocity: 120, // Уменьшена скорость
		weight: 70,
		score: 5, // Уменьшено вознаграждение
		spawnOffset: -80,
	},
	mops: {
		image: '/photos/bag.png',
		size: { width: 70, height: 70 },
		baseVelocity: 100, // Уменьшена скорость
		weight: 10,
		score: 25, // Уменьшено вознаграждение вдвое
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
		effect: (score: number) => 0,
		spawnOffset: -120,
	},
	hunter: {
		image: '/photos/hunter.png',
		size: { width: 65, height: 65 },
		baseVelocity: 140,
		weight: 3,
		effect: (score: number) => Math.floor(score * 0.5),
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
}

const BifsMinerGame = () => {
	const router = useRouter()
	const gameStartTime = useRef<number>(Date.now())
	const lastSpawnTime = useRef<number>(0)
	const [score, setScore] = useState(0)
	const [isGameActive, setIsGameActive] = useState(true)
	const [objects, setObjects] = useState<GameObject[]>([])
	const [gameTime, setGameTime] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [combo, setCombo] = useState(0)
	const [comboTimeout, setComboTimeout] = useState<NodeJS.Timeout | null>(null)
	const [level, setLevel] = useState(1)
	const { id, tokens, automining, spacePugRecord } = useSelector(
		(state: RootState) => state.user
	)
	const [updateTokens, { isLoadingUpdatingTokens, errorUpdatingTokens }] =
		useUpdateTokensMutation()
	const [clickFeedback, setClickFeedback] = useState<{
		x: number
		y: number
		type: 'good' | 'bad'
	} | null>(null)
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
	const gameAreaRef = useRef<HTMLDivElement>(null)
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
	// Предзагрузка изображений
	useEffect(() => {
		const loadImages = async () => {
			const loadStatus: Record<string, boolean> = {}
			await Promise.all(
				Object.entries(OBJECT_CONFIG).map(async ([type, config]) => {
					try {
						await new Promise((resolve, reject) => {
							const img = new Image()
							img.src = config.image
							img.onload = () => {
								loadStatus[type] = true
								resolve(true)
							}
							img.onerror = () => {
								loadStatus[type] = false
								resolve(false)
							}
						})
					} catch {
						loadStatus[type] = false
					}
				})
			)
			setLoadedImages(loadStatus)
		}

		loadImages()
	}, [])

	// Рассчитываем сложность игры
	const getDifficultyFactor = useCallback(() => {
		const timeFactor = Math.min(1 + gameTime / 900, 1.5) // Медленнее растет сложность
		return timeFactor * Math.log2(level + 1) // Логарифмический рост
	}, [gameTime, level])

	// Функция для спавна объектов
	const spawnObject = useCallback(() => {
		if (!isGameActive || Date.now() - lastSpawnTime.current < 100) return

		lastSpawnTime.current = Date.now()
		const x = Math.random() * (window.innerWidth - 100) + 50
		const difficulty = getDifficultyFactor()

		// Взвешенный случайный выбор типа объекта
		const getWeightedRandomType = (): GameObjectType => {
			const pool = Object.entries(OBJECT_CONFIG).map(([type, config]) => ({
				type: type as GameObjectType,
				weight: config.weight,
			}))

			if (level < 3) {
				pool.find(o => o.type === 'blackHole')!.weight = 1
				pool.find(o => o.type === 'hunter')!.weight = 1
			}

			const totalWeight = pool.reduce((sum, el) => sum + el.weight, 0)
			const rand = Math.random() * totalWeight
			let sum = 0

			for (const obj of pool) {
				sum += obj.weight
				if (rand < sum) return obj.type
			}

			return 'bifs'
		}

		const type = getWeightedRandomType()
		const config = OBJECT_CONFIG[type]
		const velocity = config.baseVelocity * difficulty

		const obj: GameObject = {
			id: `${Date.now()}-${Math.random()}`,
			x,
			y: config.spawnOffset || -60, // Появляются выше с учетом offset
			type,
			velocity,
			...config.size,
			rotation: 0,
			rotationSpeed: type === 'crash' ? 0 : Math.random() * 4 - 2,
			spawnedAt: Date.now(),
		}

		setObjects(prev => {
			if (prev.length < 5 + level * 2) {
				return [...prev, obj]
			}
			return prev
		})
	}, [isGameActive, getDifficultyFactor, level])

	// Обновление уровня игры
	useEffect(() => {
		const newLevel = Math.min(Math.floor(score / 500) + 1, 10)
		if (newLevel !== level) {
			setLevel(newLevel)
		}
	}, [score, level])

	// Настройка интервала для спавна объектов
	useEffect(() => {
		const spawnInterval = setInterval(() => {
			spawnObject()
		}, 300 / getDifficultyFactor())

		return () => clearInterval(spawnInterval)
	}, [spawnObject, getDifficultyFactor])

	// Обновление позиции объектов
	useEffect(() => {
		const updateInterval = setInterval(() => {
			setObjects(prev =>
				prev
					.map(obj => ({
						...obj,
						y: obj.y + obj.velocity / 60,
						rotation: (obj.rotation ?? 0) + (obj.rotationSpeed ?? 0),
					}))
					.filter(obj => obj.y < window.innerHeight + 100)
			)
		}, 1000 / 60)

		return () => clearInterval(updateInterval)
	}, [])

	// Таймер игры
	useEffect(() => {
		if (!isGameActive) return
		const timer = setInterval(() => setGameTime(prev => prev + 1), 1000)
		return () => clearInterval(timer)
	}, [isGameActive])

	// Обработчик комбо
	const handleCombo = useCallback(() => {
		if (comboTimeout) clearTimeout(comboTimeout)

		setCombo(prev => {
			const newCombo = prev + 1
			if (newCombo >= 10) {
				// Увеличили порог комбо
				setScore(s => s + Math.floor(newCombo * 0.5)) // Уменьшили бонус
			}
			return newCombo
		})

		const timeout = setTimeout(() => setCombo(0), 1500) // Уменьшили время комбо
		setComboTimeout(timeout)
	}, [comboTimeout])

	// Обработчик клика по объектам с улучшенным определением попадания
	const handleObjectClick = (e: React.MouseEvent, obj: GameObject) => {
		if (!isGameActive || Date.now() - obj.spawnedAt < 200) return // Игнорируем клики на только что появившиеся объекты

		const config = OBJECT_CONFIG[obj.type]
		const gameArea = gameAreaRef.current
		if (!gameArea) return

		// Проверяем, что клик был внутри объекта (более мягкая проверка)
		const rect = gameArea.getBoundingClientRect()
		const clickX = e.clientX - rect.left
		const clickY = e.clientY - rect.top

		// Увеличиваем область кликабельности
		const hitboxPadding = 25
		const isHit =
			clickX >= obj.x - obj.width / 2 - hitboxPadding &&
			clickX <= obj.x + obj.width / 2 + hitboxPadding &&
			clickY >= obj.y - obj.height / 2 - hitboxPadding &&
			clickY <= obj.y + obj.height / 2 + hitboxPadding

		if (!isHit) return

		setObjects(prev => prev.filter(o => o.id !== obj.id))

		// Визуальная обратная связь
		setClickFeedback({
			x: clickX,
			y: clickY,
			type: obj.type === 'bifs' || obj.type === 'mops' ? 'good' : 'bad',
		})
		setTimeout(() => setClickFeedback(null), 500)

		if (obj.type === 'bifs' || obj.type === 'mops') {
			handleCombo()
		} else {
			setCombo(0)
		}

		if ('score' in config) {
			const scoreMultiplier = Math.max(0.3, 1 - level * 0.05)
			setScore(prev =>
				Math.max(0, prev + Math.floor(config.score * scoreMultiplier))
			)
		} else if ('effect' in config) {
			if (obj.type === 'crash') {
				setIsGameActive(false)
				updateTokensOnServer(score)
				setShowModal(true)
			} else {
				setScore(config.effect)
			}
		}
	}

	// Полная перезагрузка игры
	const restartGame = () => {
		setScore(0)
		setObjects([])
		setGameTime(0)
		setCombo(0)
		setLevel(1)
		setIsGameActive(true)
		setShowModal(false)
		gameStartTime.current = Date.now()
	}

	// Закрытие модалки с рестартом
	const handleModalClose = () => {
		setShowModal(false)
	}

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
						Загрузка ресурсов...
					</div>
				)}

				{objects.map(obj => (
					<AnimatedObject
						key={obj.id}
						type={obj.type}
						onClick={e => handleObjectClick(e, obj)}
						style={{
							position: 'absolute',
							top: obj.y,
							left: obj.x,
							width: obj.width,
							height: obj.height,
							transform: `translate(-50%, -50%)`,
							cursor: 'pointer',
							transition: 'transform 0.1s ease',
							pointerEvents: 'auto',
							opacity: loadedImages[obj.type] ? 1 : 0,
						}}
					>
						<img
							src={OBJECT_CONFIG[obj.type].image}
							alt={obj.type}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'contain',
							}}
						/>
					</AnimatedObject>
				))}

				{clickFeedback && (
					<div
						style={{
							position: 'absolute',
							left: clickFeedback.x,
							top: clickFeedback.y,
							transform: 'translate(-50%, -50%)',
							color: clickFeedback.type === 'good' ? '#4caf50' : '#f44336',
							fontSize: '24px',
							fontWeight: 'bold',
							pointerEvents: 'none',
							animation: 'floatUp 0.5s ease-out forwards',
						}}
					>
						{clickFeedback.type === 'good' ? '+' : 'Oops!'}
					</div>
				)}
			</div>

			<GameUi style={{ zIndex: 2 }}>
				<ScoreText>BIFS: {score}</ScoreText>
				<TimeText>Время: {gameTime} сек</TimeText>
				<LevelText>Уровень: {level}</LevelText>
				{combo >= 3 && <ComboText>Комбо: {combo}x!</ComboText>}
			</GameUi>

			<BasicModal
				btnText='ОК'
				title='Игра окончена'
				text={`Вы собрали ${score} BIFS за ${gameTime} секунд (Уровень ${level})`}
				isVisible={showModal}
				onButtonClick={handleModalClose}
				onClose={handleModalClose}
				imgSrc='/pugs/upset-pug.png'
			/>

			{!isGameActive && !showModal && (
				<GameOverlay>
					<RestartButtonsWrapper>
						<MulticolouredButton theme='blue' onClick={restartGame}>
							Играть
						</MulticolouredButton>
						<MulticolouredButton
							theme='blue'
							onClick={() => router.push('/earn')}
						>
							Выйти
						</MulticolouredButton>
					</RestartButtonsWrapper>
				</GameOverlay>
			)}
		</GameCanvasStyled>
	)
}

export default BifsMinerGame
