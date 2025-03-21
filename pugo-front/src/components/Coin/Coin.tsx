/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react'
import { CoinFrame, CoinStyled, ImgFrame } from './styled'
import { Toaster, toast } from 'react-hot-toast'
export const Coin = () => {
	const [rotation, setRotation] = useState({ x: 0, y: 0 })
	const [scale, setScale] = useState(1)
	const [isInteracting, setIsInteracting] = useState(false)
	const animationRef = useRef<number | null>(null)

	const handleMove = e => {
		const isTouch = 'touches' in e
		const clientX = isTouch ? e.touches[0].clientX : e.clientX
		const clientY = isTouch ? e.touches[0].clientY : e.clientY
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

		const x = ((clientX - left) / width - 0.5) * 30
		const y = ((clientY - top) / height - 0.5) * -30

		setRotation({ x: y, y: x })
		setIsInteracting(true)

		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
		}
	}

	const handleMouseLeave = () => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
		}

		const animateReturn = () => {
			setRotation(prev => {
				const newX = prev.x * 0.9
				const newY = prev.y * 0.9

				if (Math.abs(newX) < 0.5 && Math.abs(newY) < 0.5) {
					return { x: 0, y: 0 }
				}

				animationRef.current = requestAnimationFrame(animateReturn)
				return { x: newX, y: newY }
			})
		}

		animationRef.current = requestAnimationFrame(animateReturn)
		setIsInteracting(false)
	}

	const handleMouseDown = e => {
		const isTouch = 'touches' in e
		const clientX = isTouch ? e.touches[0].clientX : e.clientX
		const clientY = isTouch ? e.touches[0].clientY : e.clientY
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

		const x = ((clientX - left) / width - 0.5) * 10
		const y = ((clientY - top) / height - 0.5) * -10

		const randomScale = 0.8 + Math.random() * 0.2

		setRotation({ x: y, y: x })
		// setScale(randomScale)
		setIsInteracting(true)
	}

	const handleMouseUp = () => {
		setScale(1)
		handleMouseLeave()
	}

	useEffect(() => {
		if (!isInteracting) {
			const animateReturn = () => {
				setRotation(prev => {
					const newX = prev.x * 0.9
					const newY = prev.y * 0.9

					if (Math.abs(newX) < 0.5 && Math.abs(newY) < 0.5) {
						return { x: 0, y: 0 }
					}

					animationRef.current = requestAnimationFrame(animateReturn)
					return { x: newX, y: newY }
				})
			}

			animationRef.current = requestAnimationFrame(animateReturn)
		}
	}, [isInteracting])
	const showMessage = () => {
		const message = [
			'Йоуу бро, ты что хомяк?!',
			'НЕ Тапай плизз',
			'Я что на тапалку похож?',
			'Насчёт этого клика придется заплатить BIFS!',
			'Ты что, с ума сошел? Держись, тут опасно!',
			'Может, хватит кликать? Космос не терпит спешки!',
			'Кликать можно, но аккуратно, а то черная дыра засосет!',
			'Похоже, ты ищешь беду... И BIFS тебе не поможет.',
			'Осторожно! Это не просто монета, а портал в другой мир!',
			'Серьезно? Ты в этом мире не один. Ну и что, если это BONIFACE?',
			'Я тут подумал... а ты точно знаешь, как пользоваться токенами?',
			'Ты кликнул, а космос сейчас над тобой смеется.',
			'Скорей, жми быстрее, пока черная дыра не сожрала твои BIFS!',
		]

		const emoji = [
			'😍',
			'🚀',
			'🛸',
			'💥',
			'🌌',
			'👽',
			'🔥',
			'🪐',
			'👾',
			'😎',
			'💀',
			'🤯',
			'⚡',
			'👻',
			'🤑',
			'💎',
			'🌍',
			'🪙',
			'💣',
		]

		const randomMessage = message[Math.floor(Math.random() * message.length)]
		const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)]

		toast(`${randomMessage} ${randomEmoji}`, {
			icon: randomEmoji,
		})
	}

	return (
		<CoinFrame>
			<CoinStyled
				$rotateX={rotation.x}
				$rotateY={rotation.y}
				// $scale={scale}
				// $isInteracting={isInteracting}
				// onMouseMove={handleMove}
				// onTouchMove={handleMove}
				// onMouseLeave={handleMouseLeave}
				// onTouchEnd={handleMouseUp}
				// onMouseDown={handleMouseDown}
				// onTouchStart={handleMouseDown}
				// onMouseUp={handleMouseUp}
				// onClick={handleTap} тапааааааааалкааааа
				onClick={showMessage}
			>
				<img draggable={false} src='./coin-c.png' alt='Coin' />
			</CoinStyled>
			<Toaster />
		</CoinFrame>
	)
}
