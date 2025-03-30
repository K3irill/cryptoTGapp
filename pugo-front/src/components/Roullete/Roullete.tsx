/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from './styles.module.scss'
import Item from './Item'
import _ from 'lodash'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import {
	useActivateMiningMutation,
	useSetUserStatusMutation,
	useUpdateTokensMutation,
} from '@/store/services/api/userApi'

const PRIZE_TYPES = {
	coins: {
		50: 400,
		150: 350,
		250: 300,
		500: 250,
		1000: 150,
		1500: 100,
		2000: 50,
		4000: 30,
		6000: 20,
		8000: 10,
		10000: 2,
		15000: 1,
		20000: 1,
		40000: 0.8,
		60000: 0.5,
		80000: 0.3,
		100000: 0.1,
	},
	days: {
		3: 90,
		7: 60,
		21: 30,
		30: 10,
		45: 1,
	},
	ships: {
		Ship1: 20,
		Ship2: 20,
		Ship3: 20,
		Ship4: 20,
		Ship5: 20,
	},
	privileges: {
		2: 35, // COMMON
		3: 30, // ADVANCED
		4: 25, // VIP
		5: 20, // ELITE
		6: 15, // PREMIUM
		7: 10, // BOSS
		8: 5, // KING
		9: 2, // LEGEND
		10: 1, // GOD
	},
}

// Вспомогательные функции для работы с призами
const getRarity = (value: number) => {
	if (value >= 50000) return 'godlike'
	if (value >= 20000) return 'ultimate'
	if (value >= 10000) return 'legendary'
	if (value >= 5000) return 'epic'
	if (value >= 1000) return 'rare'
	return 'common'
}

const getStatusRarity = (status: number) => {
	if (status >= 8) return 'godlike'
	if (status >= 6) return 'ultimate'
	if (status >= 4) return 'legendary'
	return 'rare'
}

const getStatusName = (status: number) => {
	const names = {
		2: 'COMMON',
		3: 'ADVANCED',
		4: 'VIP',
		5: 'ELITE',
		6: 'PREMIUM',
		7: 'BOSS',
		8: 'KING',
		9: 'LEGEND',
		10: 'GOD',
	}
	return names[status] || 'UNKNOWN'
}

// Объект с описанием всех призов
export const prizeItems = {
	// Призы для монет
	...Object.fromEntries(
		Object.entries(PRIZE_TYPES.coins).map(([value]) => [
			value,
			{
				image: '/coin-c.png',
				price: parseInt(value),
				rarity: getRarity(parseInt(value)),
				name: `${parseInt(value).toLocaleString()} BIFS Coins`,
			},
		])
	),
	// Призы для дней
	...Object.fromEntries(
		Object.entries(PRIZE_TYPES.days).map(([days]) => [
			days,
			{
				image: `/store/cases/${days}.svg`,
				price: 'Days',
				rarity: getRarity(parseInt(days) * 1000),
				name: `${days} Дней Автомайнинга`,
			},
		])
	),
	// Призы для статусов
	...Object.fromEntries(
		Object.entries(PRIZE_TYPES.privileges).map(([status]) => [
			status,
			{
				image: `/store/privileges/${status}.png`,
				price: 'Status',
				rarity: getStatusRarity(parseInt(status)),
				name: `${getStatusName(parseInt(status))} Status`,
			},
		])
	),
}

const calculateProbabilities = (chances: Record<string, number>) => {
	const entries = Object.entries(chances)
	let total = 0
	const ranges = entries.map(([name, value]) => {
		const start = total
		total += value
		return { name, start, end: total }
	})
	return { ranges, total }
}

const getRandomPrize = (chances: Record<string, number>, caseType: string) => {
	const { ranges, total } = calculateProbabilities(chances)
	const random = Math.random() * total
	const prize = ranges.find(
		range => random >= range.start && random < range.end
	)

	if (!prize) return ranges[ranges.length - 1].name

	// Добавляем префиксы в зависимости от типа кейса
	switch (caseType) {
		case 'privileges':
			return `privilege-${prize.name}`
		case 'days':
			return `days-${prize.name}`
		default:
			return prize.name
	}
}

interface RouletteProps {
	caseType: 'coins' | 'days' | 'ships' | 'privileges'
	onDrop: (result: string) => void
	isSpinning: boolean
	onAnimationEnd?: () => void
	casePrice: number
}

export const Roulette: React.FC<RouletteProps> = ({
	caseType,
	onDrop,
	isSpinning,
	onAnimationEnd,
	casePrice,
}) => {
	const [items, setItems] = useState<string[]>([])
	const [previewItems, setPreviewItems] = useState<string[]>([])
	const rollerRef = useRef<HTMLDivElement>(null)
	const animationRef = useRef<number>()
	const startTimeRef = useRef<number>()
	const itemWidth = 80
	const itemGap = 10
	const isInitialMount = useRef(true)
	const resultRef = useRef<string>()
	const currentPositionRef = useRef<number>(0)
	const { id } = useSelector((state: RootState) => state.user)
	const [updateTokens] = useUpdateTokensMutation()
	const [activateMining] = useActivateMiningMutation()
	const [setUserStatus] = useSetUserStatusMutation()

	// Initialize preview items
	useEffect(() => {
		const chances = PRIZE_TYPES[caseType]
		const getRandomItem = () => getRandomPrize(chances, caseType)
		setPreviewItems(Array(10).fill(null).map(getRandomItem))
	}, [caseType])

	const updateTokensOnServer = async (
		delta: number,
		isPlus: boolean = true
	) => {
		const roundedDelta = Math.round(Number(delta))
		try {
			await updateTokens({
				telegramId: Number(id),
				amount: roundedDelta,
				isPlus: isPlus,
			}).unwrap()
		} catch (error) {
			console.error('Update tokens error:', error)
			throw error
		}
	}

	const activateUserMiningOnServer = async (days: number) => {
		const roundedDays = Math.round(Number(days))
		try {
			const response = await activateMining({
				telegramId: Number(id),
				days: roundedDays,
			}).unwrap()

			if (!response.success) {
				throw new Error(response.error || 'Failed to activate mining')
			}
		} catch (error) {
			console.error('Mining activation error:', error)
			throw error
		}
	}

	const setUserStatusOnServer = async (status: number) => {
		const roundedStatus = Math.round(Number(status))

		try {
			const response = await setUserStatus({
				telegramId: Number(id),
				status: roundedStatus,
			}).unwrap()

			if (!response.success) {
				throw new Error(response.error || 'Failed to set status')
			}
		} catch (error) {
			console.error('Setting status error:', error)
			throw error
		}
	}

	const easeOut = useCallback((t: number) => {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
	}, [])

	const setTransform = useCallback((value: number) => {
		currentPositionRef.current = value
		if (rollerRef.current) {
			rollerRef.current.style.transform = `translateX(${value}px)`
		}
	}, [])

	const handlePrizeResult = useCallback(
		async (result: string) => {
			try {
				if (caseType === 'coins') {
					const prizeAmount = parseInt(result, 10)
					if (isNaN(prizeAmount)) {
						throw new Error('Invalid prize amount')
					}

					const delta = Math.abs(prizeAmount - casePrice)
					const isWin = prizeAmount > casePrice

					await updateTokensOnServer(delta, isWin)
				} else if (caseType === 'days') {
					const daysWon = parseInt(result.replace('days-', ''), 10)
					if (isNaN(daysWon)) {
						throw new Error('Invalid days amount')
					}
					await updateTokensOnServer(casePrice, false)
					await activateUserMiningOnServer(daysWon)
				} else if (caseType === 'privileges') {
					const statusWon = parseInt(result.replace('privilege-', ''), 10)

					if (isNaN(statusWon)) {
						throw new Error('Invalid privileges amount')
					}
					onDrop(result)
					await updateTokensOnServer(casePrice, false)
					setTimeout(async () => {
						await setUserStatusOnServer(statusWon)
					}, 7000)
				}

				onDrop(result)
			} catch (error) {
				console.error('Prize handling error:', error)
				throw error
			}
		},
		[caseType, casePrice, onDrop]
	)

	const resetPosition = useCallback(
		(callback: () => void) => {
			const start = currentPositionRef.current
			const duration = 500
			const startTime = performance.now()

			const animateReset = (timestamp: number) => {
				const elapsed = timestamp - startTime
				const progress = Math.min(elapsed / duration, 1)
				const easedProgress = easeOut(progress)

				setTransform(start * (1 - easedProgress))

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animateReset)
				} else {
					callback()
				}
			}

			animationRef.current = requestAnimationFrame(animateReset)
		},
		[easeOut, setTransform]
	)

	const cleanup = useCallback(() => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
			animationRef.current = undefined
		}
		startTimeRef.current = undefined
	}, [])

	useEffect(() => {
		if (!isSpinning) {
			if (animationRef.current) {
				cleanup()
			}
			return
		}

		let isMounted = true

		resetPosition(() => {
			if (!isMounted) return

			cleanup()
			resultRef.current = undefined

			const generateItems = () => {
				const chances = PRIZE_TYPES[caseType]
				const getRandomItem = () => getRandomPrize(chances, caseType)

				const result = getRandomPrize(chances, caseType)
				resultRef.current = result

				handlePrizeResult(result).catch(console.error)

				const resultIndex = _.random(
					caseType === 'coins' ? 40 : caseType === 'days' ? 30 : 20,
					caseType === 'coins' ? 60 : caseType === 'days' ? 50 : 40
				)

				return {
					items: [
						...Array(resultIndex).fill(null).map(getRandomItem),
						result,
						...Array(4).fill(null).map(getRandomItem),
					],
					resultIndex,
				}
			}

			const { items, resultIndex } = generateItems()
			setItems(items)

			const animate = (timestamp: number) => {
				if (!isMounted) return

				if (!startTimeRef.current) startTimeRef.current = timestamp

				const duration = 10000
				const elapsed = timestamp - startTimeRef.current
				const progress = Math.min(elapsed / duration, 1)
				const easedProgress = easeOut(progress)

				setTransform(targetOffset * easedProgress)

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animate)
				} else {
					setTimeout(() => {
						onAnimationEnd?.()
						cleanup()
					}, 2000)
				}
			}

			const innerOffset = _.random(0, 0.99)
			const containerCenter =
				(rollerRef.current?.parentElement?.clientWidth || 0) / 2
			const targetOffset =
				-(resultIndex + innerOffset) * (itemWidth + itemGap) + containerCenter

			startTimeRef.current = undefined
			animationRef.current = requestAnimationFrame(animate)
		})

		return () => {
			isMounted = false
			cleanup()
		}
	}, [
		isSpinning,
		caseType,
		onAnimationEnd,
		cleanup,
		setTransform,
		easeOut,
		resetPosition,
		handlePrizeResult,
	])

	return (
		<div className={styles.container}>
			<div className={styles.display}>
				<div
					style={{
						background:
							caseType === 'privileges'
								? `radial-gradient(#00000000 50%, rgba(43, 169, 91, 0.799))`
								: caseType === 'coins'
								? `radial-gradient(transparent 50%, rgb(61, 116, 164))`
								: caseType === 'days'
								? `radial-gradient(transparent 50%, rgba(169, 123, 43, 0.751))`
								: `radial-gradient(transparent 50%, rgba(169, 43, 154, 0.751))`,
					}}
					className={styles.screen}
				/>
				<div className={styles.divider} />
				<div className={styles.roller} ref={rollerRef}>
					{items.length > 0
						? items.map((item, i) => <Item name={item} key={`${item}-${i}`} />)
						: previewItems.map((item, i) => (
								<Item name={item} key={`preview-${item}-${i}`} />
						  ))}
				</div>
			</div>
		</div>
	)
}

export default Roulette
