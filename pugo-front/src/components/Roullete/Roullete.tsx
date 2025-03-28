/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from './styles.module.scss'
import Item from './Item'
import _ from 'lodash'
import { REQUEST_LINK } from '../../../constant'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

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
		7: 60,
		21: 30,
		30: 10,
	},
	ships: {
		Ship1: 20,
		Ship2: 20,
		Ship3: 20,
		Ship4: 20,
		Ship5: 20,
	},
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

const getRandomPrize = (chances: Record<string, number>) => {
	const { ranges, total } = calculateProbabilities(chances)
	const random = Math.random() * total
	const prize = ranges.find(
		range => random >= range.start && random < range.end
	)
	return prize ? prize.name : ranges[ranges.length - 1].name
}

interface RouletteProps {
	caseType: 'coins' | 'days' | 'ships'
	onDrop: (result: string) => void
	isSpinning: boolean
	onAnimationEnd?: () => void
}

export const Roulette: React.FC<RouletteProps> = ({
	caseType,
	onDrop,
	isSpinning,
	onAnimationEnd,
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

	// Инициализация превью элементов
	useEffect(() => {
		const chances = PRIZE_TYPES[caseType]
		const getRandomItem = () => getRandomPrize(chances)
		setPreviewItems(Array(10).fill(null).map(getRandomItem))
	}, [caseType])

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
				// Сначала вызываем внешний обработчик
				onDrop(result)
			} catch (error) {
				console.error('Ошибка обработки приза:', error)
			}
		},
		[caseType, onDrop]
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

		let isMounted = true // Флаг для проверки mounted компонента

		resetPosition(() => {
			if (!isMounted) return

			cleanup()
			resultRef.current = undefined

			const generateItems = () => {
				const chances = PRIZE_TYPES[caseType]
				const getRandomItem = () => getRandomPrize(chances)

				const result = getRandomItem()
				resultRef.current = result
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
					if (resultRef.current) {
						handlePrizeResult(resultRef.current).catch(console.error)
					}
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
		handlePrizeResult,
		onAnimationEnd,
		cleanup,
		setTransform,
		easeOut,
		resetPosition,
	])

	return (
		<div className={styles.container}>
			<div className={styles.display}>
				<div className={styles.screen} />
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
