import { useState, useRef } from 'react'
import { CoinStyled } from './styled'

export const Coin = () => {
	const [rotation, setRotation] = useState({ x: 0, y: 0 })
	const [scale, setScale] = useState(1)
	const animationRef = useRef<number | null>(null)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
		const x = ((e.clientX - left) / width - 0.5) * 30
		const y = ((e.clientY - top) / height - 0.5) * -30

		setRotation({ x: y, y: x })

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
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
		const x = ((e.clientX - left) / width - 0.5) * 10
		const y = ((e.clientY - top) / height - 0.5) * -10

		const randomScale = 0.8 + Math.random() * 0.2

		setRotation({ x: y, y: x })
		setScale(randomScale)
	}

	const handleMouseUp = () => {
		setScale(1)
		handleMouseLeave()
	}

	return (
		<CoinStyled
			$rotateX={rotation.x}
			$rotateY={rotation.y}
			$scale={scale}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<img draggable={false} src='./coin.png' alt='Coin' />
		</CoinStyled>
	)
}
