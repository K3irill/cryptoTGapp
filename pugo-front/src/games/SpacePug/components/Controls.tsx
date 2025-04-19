/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { motion } from 'framer-motion'

// Анимации для кнопок
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0, 191, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 191, 255, 0); }
`

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 191, 255, 0.8)); }
  50% { filter: drop-shadow(0 0 15px rgba(0, 191, 255, 0.8)); }
`

// Базовый стиль кнопки
const ControlButton = styled(motion.button)`
	position: relative;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: none;
	background: rgba(30, 30, 60, 0.8);
	backdrop-filter: blur(5px);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0;
	margin: 0 10px;
	transition: all 0.3s ease;
	overflow: hidden;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		background: linear-gradient(
			135deg,
			rgba(0, 191, 255, 0.3) 0%,
			rgba(138, 43, 226, 0.3) 100%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&:hover::before {
		opacity: 1;
	}

	&:active {
		transform: scale(0.95);
	}

	img {
		width: 30px;
		height: 30px;
		transition: transform 0.2s ease;
		z-index: 1;
	}

	${({ $active }) =>
		$active &&
		css`
			animation: ${pulse} 1.5s infinite;
			&::before {
				opacity: 1;
			}
			img {
				animation: ${glow} 1s infinite;
			}
		`}
`

// Стили для контейнеров
export const ControlsStyled = styled.div`
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 15px;
	z-index: 100;
	align-items: center;
	justify-content: center;
`

export const ControlsWrapper = styled(ControlsStyled)``

export const ContorlsTopBottom = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
`

// Основной компонент
const Controls = ({ onMove, onSpeedUp, onSpeedDown, activeKeys }) => {
	return (
		<ControlsWrapper className='controls'>
			<ControlButton
				$active={activeKeys.has('ArrowLeft')}
				onTouchStart={() => onSpeedUp('ArrowLeft')}
				onTouchEnd={() => onSpeedDown('ArrowLeft')}
				onMouseDown={() => onSpeedUp('ArrowLeft')}
				onMouseUp={() => onSpeedDown('ArrowLeft')}
				onClick={() => onMove('ArrowLeft')}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<img
					style={{ transform: 'rotate(270deg)' }}
					src='/icons/arrow-control.svg'
					alt='Left'
				/>
			</ControlButton>

			<ContorlsTopBottom>
				<ControlButton
					$active={activeKeys.has('ArrowUp')}
					onTouchStart={() => onSpeedUp('ArrowUp')}
					onTouchEnd={() => onSpeedDown('ArrowUp')}
					onMouseDown={() => onSpeedUp('ArrowUp')}
					onMouseUp={() => onSpeedDown('ArrowUp')}
					onClick={() => onMove('ArrowUp')}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<img src='/icons/arrow-control.svg' alt='Up' />
				</ControlButton>

				<ControlButton
					$active={activeKeys.has('ArrowDown')}
					onTouchStart={() => onSpeedUp('ArrowDown')}
					onTouchEnd={() => onSpeedDown('ArrowDown')}
					onMouseDown={() => onSpeedUp('ArrowDown')}
					onMouseUp={() => onSpeedDown('ArrowDown')}
					onClick={() => onMove('ArrowDown')}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<img
						style={{ transform: 'rotate(180deg)' }}
						src='/icons/arrow-control.svg'
						alt='Down'
					/>
				</ControlButton>
			</ContorlsTopBottom>

			<ControlButton
				$active={activeKeys.has('ArrowRight')}
				onTouchStart={() => onSpeedUp('ArrowRight')}
				onTouchEnd={() => onSpeedDown('ArrowRight')}
				onMouseDown={() => onSpeedUp('ArrowRight')}
				onMouseUp={() => onSpeedDown('ArrowRight')}
				onClick={() => onMove('ArrowRight')}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<img
					style={{ transform: 'rotate(90deg)' }}
					src='/icons/arrow-control.svg'
					alt='Right'
				/>
			</ControlButton>
		</ControlsWrapper>
	)
}

export default Controls
