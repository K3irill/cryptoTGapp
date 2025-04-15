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
    const messages = [ 
      "В BIFS токены добываются в миссиях - проверь раздел 'Задания'!",
      "Мопс-капитан говорит: 'Токены здесь зарабатывают, а не выбивают кликами!'",
      "Совет от экипажа: выполнение миссий приносит BIFS, а не клики",
      "Интересный факт: наши топ-игроки вообще не кликают - они выполняют квесты!",
      "Хочешь BIFS? Открывай кейсы, выполняй задания, наконец вылетай в космос то уже!",
      "Запомни: 1 выполненное задание = 1000+ BIFS, 1000 кликов = 0 BIFS",
      "В космосе ценятся смекалка, а не скорость кликов - попробуй игровые задания!",
      "На планете BIFS работают другие законы - клики не делают погоды!",
      "Прототип мопса-астронавта обнаружил: умные стратегии > бессмысленные клики",
      "Важное объявление: сервер кликов временно отключен на техобслуживание (шутка, мы не тапалка!)",
      "Космическая рулетка: кликни 1000 раз и... ничего не получишь. Попробуй заработать в играх!",
      "Бот-аналитик сообщает: 92% BIFS добывается через игровые активности",
      "График зависимости: больше заданий = больше BIFS, больше кликов = усталый палец",
      "Факт: наши игроки тратят 0% времени на клики и 100% - на задания",
      "Научный факт: клики не влияют на курс BIFS, а вот игровая активность - да!",
      "Ты же хочешь попасть в Зал Славы? Там нет раздела 'Лучшие кликеры'"
    ];
  
    const emoji = [
      '😍', '🚀', '🛸', '💥', '🌌', '👽', '🔥', '🪐', '👾', '😎', 
      '💀', '🤯', '⚡', '👻', '🤑', '💎', '🌍', '🪙', '💣', '🤔',
      '😜', '🎲', '😏', '😆', '😬', '🌠', '😈', '💸'
    ];
  
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]; 
    const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
  
    toast(`${randomMessage}`, {
      icon: randomEmoji,
    });
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
