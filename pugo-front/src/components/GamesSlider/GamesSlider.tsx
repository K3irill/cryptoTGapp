import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import Button from '@/components/UI/Button/Button'
import { GameSliderType } from '@/types/types'

// Стили для нового слайдера
const SliderContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
`

const Slide = styled(motion.div)<{ bg: string }>`
	position: absolute;
	width: 100%;
	height: 100%;
	background: url(${props => props.bg}) center / cover no-repeat;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0;
	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 0;
	}
`

const SlideInfo = styled(motion.div)`
	max-width: 80%;
`

const SlideContent = styled(motion.div)`
	padding: 20px;
	color: white;
	position: relative;
	z-index: 2;
	display: flex;
	gap: 15px;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
`

const SlideTitle = styled.h3`
	font-size: 22px;
	margin-bottom: 8px;
	font-weight: 700;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`

const SlideDescription = styled.p`
	font-size: 14px;
	opacity: 0.9;d
	text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
`

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

// Стили для кнопки
const PlayButtonWrapper = styled(motion.a)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 8px 20px;
	min-width: 100px;
	font-size: 14px;
	height: 40px;
	font-weight: 600;
	text-decoration: none;
	color: #fff;
	background: linear-gradient(45deg, #ff8a00, #ff0058, #ff00b8, #d400ff);
	background-size: 300% 300%;
	border-radius: 20px;
	border: none;
	outline: none;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.3s ease;
	animation: ${gradientFlow} 8s ease infinite;
	z-index: 10;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
		animation: ${gradientFlow} 4s ease infinite, ${pulse} 1.5s infinite;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			45deg,
			transparent,
			rgba(255, 255, 255, 0.2),
			transparent
		);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	&:hover::before {
		transform: translateX(100%);
	}

	&::after {
		content: '▶';
		margin-left: 8px;
		font-size: 12px;
		transition: transform 0.3s ease;
	}

	&:hover::after {
		transform: translateX(3px);
	}
`

const Dots = styled.div`
	position: absolute;
	bottom: 15px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 8px;
	z-index: 2;
`

const Dot = styled.div<{ active: boolean }>`
	width: ${props => (props.active ? '20px' : '8px')};
	height: 8px;
	border-radius: 4px;
	background: ${props =>
		props.active ? '#c300ff' : 'rgba(255, 255, 255, 0.5)'};
	cursor: pointer;
	transition: all 0.3s ease;
`

interface GamesSliderInterface {
	content: GameSliderType
}

const GamesSlider = ({ content }: GamesSliderInterface) => {
	const [current, setCurrent] = useState(0)
	const [direction, setDirection] = useState(1)

	useEffect(() => {
		const timer = setInterval(() => {
			setDirection(1)
			setCurrent(prev => (prev + 1) % content.games.length)
		}, 8000)
		return () => clearInterval(timer)
	}, [])

	const goToSlide = (index: number) => {
		setDirection(index > current ? 1 : -1)
		setCurrent(index)
	}

	const variants = {
		enter: (dir: number) => ({
			x: dir > 0 ? '100%' : '-100%',
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.5 },
		},
		exit: (dir: number) => ({
			x: dir > 0 ? '-100%' : '100%',
			opacity: 0,
			transition: { duration: 0.5 },
		}),
	}

	const PlayButton = ({
		href,
		children,
	}: {
		href: string
		children: React.ReactNode
	}) => {
		return (
			<PlayButtonWrapper
				href={href}
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.4, duration: 0.3 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{children}
			</PlayButtonWrapper>
		)
	}
	console.log(content.games[current].image)
	return (
		<SliderContainer>
			<AnimatePresence custom={direction} initial={false}>
				{content.games[current] && (
					<Slide
						key={current}
						custom={direction}
						variants={variants}
						initial='enter'
						animate='center'
						exit='exit'
						bg={content.games[current].image}
					>
						<SlideContent
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							<SlideInfo>
								<SlideTitle>{content.games[current].title}</SlideTitle>
								<SlideDescription>
									{content.games[current].description}
								</SlideDescription>
							</SlideInfo>
							<PlayButton href={`/game/${content.games[current].id}`}>
								{content.button}
							</PlayButton>
						</SlideContent>
					</Slide>
				)}
			</AnimatePresence>

			<Dots>
				{content.games.map((_, i) => (
					<Dot key={i} active={i === current} onClick={() => goToSlide(i)} />
				))}
			</Dots>
		</SliderContainer>
	)
}

export default GamesSlider
