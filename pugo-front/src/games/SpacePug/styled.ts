import { COLORS } from '@/styles/colors'
import {
	goldenTextGradientV2,
	mainBlockBackground,
	pinkOrangeGradientBackground,
	purpleTextGradient,
} from '@/styles/mixins'
import { motion } from 'framer-motion'
import styled, { keyframes, css } from 'styled-components'

// Анимации
const floatUp = keyframes`
  from {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -150%);
    opacity: 0;
  }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`

const jump = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const shake = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-2px, -2px); }
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const fadeIn = keyframes`
	0% {
		opacity: 0;
		transform: scale(0.5);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
`
const danger = keyframes`
  0%, 100% { transform: rotate(0); }
  50% { transform: rotate(360deg); }
`

const blink = (color: string) => keyframes`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.5) drop-shadow(0 0 10px ${color}); }
`

const explode = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
`

const shockwave = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
`

// Объектные стили
const baseObjectStyles = css`
	position: absolute;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	cursor: pointer;
`

// Основные компоненты
export const GameCanvasStyled = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
`

export const GameUi = styled(motion.div)`
	position: fixed;
	top: 10px;
	left: 10px;
	padding: 16px;
	border-radius: 16px;
	background: rgba(18, 18, 30, 0.8);
	backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.08);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	gap: 8px;
	z-index: 100;
	${mainBlockBackground};

	p {
		margin: 0;
		font-size: 16px;
	}
`
export const CenterUi = styled.div`
	z-index: 10;
	position: absolute;
	text-align: center;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	text-shadow: 1px 1px 3px rgba(23, 111, 82, 0.8);
`

// Общие стили для всех кнопок
export const ButtonBase = styled(motion.button)`
	position: relative;
	padding: 14px 28px;
	border-radius: 12px;
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	z-index: 100;
	transition: all 0.3s ease;
	backdrop-filter: blur(4px);
	border: 1px solid;
	text-transform: uppercase;
	letter-spacing: 1px;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&:hover {
		transform: translateY(-2px);
		&::before {
			opacity: 1;
		}
	}

	&:active {
		transform: translateY(0);
	}
`

// Анимация пульсации для акцентных кнопок
const pulseBtn = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 191, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 191, 255, 0); }
`

// STOP кнопка (ваш улучшенный стиль)
export const StopBtn = styled(ButtonBase)`
	position: fixed;
	top: 10px;
	right: 10px;
	padding: 12px 24px;
	background: rgba(255, 59, 48, 0.15);
	border-color: rgba(255, 59, 48, 0.4);
	color: #ff3b30;
	box-shadow: 0 2px 8px rgba(255, 59, 48, 0.2);

	&:hover {
		background: rgba(255, 59, 48, 0.25);
		box-shadow: 0 4px 16px rgba(255, 59, 48, 0.3);
	}
`

// Кнопка рестарта
export const RestartBtn = styled(ButtonBase)`
	background: rgba(0, 191, 255, 0.15);
	border-color: rgba(0, 191, 255, 0.4);
	color: #00bfff;
	box-shadow: 0 2px 8px rgba(0, 191, 255, 0.2);
	animation: ${pulseBtn} 2s infinite;

	&:hover {
		background: rgba(0, 191, 255, 0.25);
		box-shadow: 0 4px 16px rgba(0, 191, 255, 0.3);
	}
`

// Кнопка выхода
export const ExitBtn = styled(ButtonBase)`
	background: rgba(138, 43, 226, 0.15);
	border-color: rgba(138, 43, 226, 0.4);
	color: #8a2be2;
	box-shadow: 0 2px 8px rgba(138, 43, 226, 0.2);

	&:hover {
		background: rgba(138, 43, 226, 0.25);
		box-shadow: 0 4px 16px rgba(138, 43, 226, 0.3);
	}
`

// Кнопка информации
export const InfoBtn = styled(ButtonBase)`
	background: rgba(88, 207, 19, 0.15);
	border-color: rgba(88, 207, 19, 0.4);
	color: #58cf13;
	box-shadow: 0 2px 8px rgba(88, 207, 19, 0.2);

	&:hover {
		background: rgba(88, 207, 19, 0.25);
		box-shadow: 0 4px 16px rgba(88, 207, 19, 0.3);
	}
`

// Контейнер для кнопок
export const BtnGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
	max-width: 280px;
	margin: 0 auto;
	padding: 20px;
`

export const ScoreText = styled.p`
	margin: 0;
	font-size: 16px;
	font-weight: bold;
	${purpleTextGradient}
`
export const LiveText = styled.p<{ lives?: number }>`
	margin: 0;
	font-size: 16px;
	font-weight: bold;
	${({ lives }) =>
		lives && lives < 4
			? css`
					color: #ff0000;
			  `
			: css`
					color: #00ff00;
			  `}
`

export const RecordText = styled.p`
	margin: 0;
	font-size: 16px;
	font-weight: bold;
	${goldenTextGradientV2}
`

export const TimeText = styled.p`
	margin: 0;
	font-size: 14px;
	color: ${COLORS.ice};
	text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
`
export const SpeedText = styled.p`
	margin: 0;
	font-size: 14px;
	color: #fff700;
	text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
`

export const LevelText = styled.p`
	margin: 0;
	font-size: 14px;
	color: ${COLORS.ice};
	text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
`

export const ComboText = styled.p`
	margin: 0;
	font-size: 16px;
	font-weight: bold;
	${goldenTextGradientV2}
	animation: ${pulse} 0.5s infinite;
`

export const MissedBifs = styled.p<{ missedBifs: number }>`
	margin: 0;
	font-size: 14px;

	${({ missedBifs = 0 }) => {
		if (missedBifs > 20) {
			return css`
				color: #cf1313c3;
				text-shadow: 0 0 8px rgba(207, 19, 19, 0.5);
			`
		}
		if (missedBifs > 10) {
			return css`
				color: #cf8a13c3;
				text-shadow: 0 0 8px rgba(207, 138, 19, 0.5);
			`
		}
		return css`
			color: #58cf13c3;
			text-shadow: 0 0 8px rgba(88, 207, 19, 0.5);
		`
	}}
`

export const UiButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 15px;
`

export const ControlsStyled = styled.div`
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 10px;
	opacity: 0.75;
`

export const RestartButtonsWrapper = styled(motion.div)`
	position: fixed;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;
	z-index: 100;
	width: 80%;
	max-width: 300px;
`

export const GameOverlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(8px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 99;
	padding: 20px;
`

// Игровые объекты
interface AnimatedObjectProps {
	type: 'bifs' | 'mops' | 'bug' | 'hunter' | 'fake' | 'crash'
	width: number
	height: number
}

export const AnimatedObject = styled.div<AnimatedObjectProps>`
	${baseObjectStyles}
	position: absolute;
	transform: translate(-50%, -50%);
	transition: transform 0.1s ease;
	z-index: 5;

	.hitbox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: ${({ width }) => width + 40}px;
		height: ${({ height }) => height + 40}px;
		cursor: pointer;
		pointer-events: auto;
	}

	img {
		width: 100%;
		height: 100%;
		user-select: none;
		-webkit-user-drag: none;
		pointer-events: none; // клик сквозь картинку

		${({ type }) => {
			switch (type) {
				case 'bifs':
					return css`
						animation: ${blink('#15417a94')} 1s ease-in-out infinite,
							${pulse} 1s ease-in-out infinite;
					`
				case 'mops':
					return css`
						animation: ${blink('#43157a94')} 1s ease-in-out infinite,
							${pulse} 1s ease-in-out infinite;
					`
				case 'bug':
				case 'fake':
					return css`
						animation: ${shake} 1s ease-in-out infinite;
					`
				case 'hunter':
					return css`
						animation: ${danger} 2s linear infinite;
					`
				case 'crash':
					return css`
						animation: ${shake} 0.5s infinite;
					`
				default:
					return ''
			}
		}}
	}

	&:active {
		transform: translate(-50%, -50%) scale(0.95);
	}
`

export const ClickFeedback = styled.div<{ type: 'good' | 'bad' }>`
	position: absolute;
	color: ${({ type }) => (type === 'good' ? '#4caf50' : '#f44336')};
	font-size: 24px;
	font-weight: bold;
	pointer-events: none;
	animation: ${floatUp} 0.5s ease-out forwards;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
	z-index: 15;
`

// Специальные объекты
export const CoinStyled = styled.div`
	${baseObjectStyles}
	width: 50px;
	height: 50px;
	background-image: url('/coin-c.png');
	animation: ${blink('purple')} 1s infinite;
`

export const HealthPackStyled = styled.div`
	${baseObjectStyles}
	width: 30px;
	height: 30px;
	background-image: url('/photos/healt-pack.png');
	animation: ${blink('green')} 1s infinite;
`

const neonFlow = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

export const NitroPackStyled = styled.div`
	${baseObjectStyles}
	width: 40px;
	height: 40px;
	background-image: url('/photos/lightning.svg');
	animation: ${blink('#ffe100d4')} 1s infinite;
`

export const SizePackStyled = styled.div`
	line-height: 1;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2px;
	width: 60px;
	height: 60px;
	pointer-events: none;

	span {
		font-size: 12px;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 1px;
		background: linear-gradient(
			270deg,
			#f8d03f,
			#ff3cac,
			#784ba0,
			#2b86c5,
			#f8d03f
		);
		background-size: 600% 600%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: ${neonFlow} 4s ease infinite;
		text-shadow: 0 0 2px rgba(18, 222, 55, 0.8), 0 0 5px rgba(70, 155, 42, 0.5),
			0 0 10px rgba(94, 175, 36, 0.4);
	}
`

export const SizeSmallPackStyled = styled.div`
	line-height: 1;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2px;
	width: 60px;
	height: 60px;
	pointer-events: none;

	span {
		font-size: 10px;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 1px;
		background: linear-gradient(
			270deg,
			#ff6600,
			#ff3cac,
			#784ba0,
			#2b86c5,
			#f8d03f
		);
		background-size: 600% 600%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: ${neonFlow} 4s ease infinite;
		text-shadow: 0 0 2px rgba(169, 62, 33, 0.8), 0 0 5px rgba(201, 57, 32, 0.5),
			0 0 10px r#ea773566;
	}
`

export const MegaHealthPackStyled = styled.div`
	${baseObjectStyles}
	width: 30px;
	height: 30px;
	background-image: url('/photos/mega-healt-pack.png');
	animation: ${blink('#01ff01')} 1s infinite;
`

export const MegaBombsStyled = styled.div`
	${baseObjectStyles}
	width: 30px;
	height: 30px;
	background-image: url('/photos/bomb.png');
	animation: ${blink('#ff0101')} 1s infinite;
`
const shimmer = keyframes`
	0% {
		box-shadow: 0 0 10px #6201ff, 0 0 20px #6201ff;
	}
	50% {
		box-shadow: 0 0 15px #9a5cff, 0 0 30px #b88cff;
	}
	100% {
		box-shadow: 0 0 10px #6201ff, 0 0 20px #6201ff;
	}
`
export const CoinBagStyled = styled.div`
	${baseObjectStyles}
	width: 40px;
	height: 55px;
	background-image: url('/photos/bag-coins.png');
	animation: ${blink('#5601ff')} 1s infinite;
`

export const BlackHolesStyled = styled.div`
	${baseObjectStyles}
	width: 75px;
	height: 75px;
	border-radius: 50%;
	background: radial-gradient(circle at center, #000 30%, #6201ff 100%);
	animation: ${rotate} 4s linear infinite, ${shimmer} 2s ease-in-out infinite;
	border: 2px solid rgba(255, 255, 255, 0.1);
`
const flamePulse = keyframes`
	0% {
		transform: translateX(-50%) scaleY(1) scaleX(1);
		opacity: 0.9;
	}
	50% {
		transform: translateX(-50%) scaleY(1.4) scaleX(0.7);
		opacity: 0.6;
	}
	100% {
		transform: translateX(-50%) scaleY(1) scaleX(1);
		opacity: 1;
	}
`

export const ShipStyled = styled.div<{ speedBoost?: boolean }>`
	${baseObjectStyles}
	position: absolute;
	width: 50px;
	height: 50px;
	background-image: url('/photos/ship.png');
	background-size: cover;
	transition: transform 0.2s ease;
	z-index: 10;

	&.tilt-left {
		transform: rotate(-20deg);
	}
	&.tilt-right {
		transform: rotate(20deg);
	}
	&.tilt-up {
		transform: rotate(0deg) translateY(-5px);
	}
	&.tilt-down {
		transform: rotate(0deg) translateY(5px);
	}

	filter: drop-shadow(0 0 5px #300d65aa) drop-shadow(0 0 10px #251453b3);

	/* 🔥 Улучшенное пламя */
	&::after {
		content: '';
		position: absolute;
		bottom: ${p => (p.speedBoost ? '-35px' : '-9px')};
		left: 50%;
		transform: translateX(-50%);
		width: 12px;
		height: ${p => (p.speedBoost ? '30px' : '9px')};
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.6) 0%,
			rgba(255, 200, 0, 0.9) 30%,
			rgba(255, 80, 0, 0.8) 60%,
			rgba(255, 0, 0, 0) 100%
		);
		border-radius: 50% 50% 40% 40%;
		animation: ${flamePulse} 0.15s infinite ease-in-out;
		filter: blur(1px);
		pointer-events: none;
		z-index: -1;
	}
`

export const AsteroidStyled = styled.div`
	${baseObjectStyles}
	width: 30px;
	height: 30px;
	background-image: url('/photos/meteors.png');
	animation: ${rotate} 5s linear infinite;
`

export const FlashAsteroidStyled = styled.div`
	${baseObjectStyles}
	width: 30px;
	height: 30px;
	background-image: url('/photos/flash.png');
`

export const ExplosionStyled = styled.div`
	${baseObjectStyles}
	width: 60px;
	height: 60px;
	background-image: url('/photos/explosion.gif');
`

export const ShockwaveStyled = styled.div`
	${baseObjectStyles}
	width: 100px;
	height: 100px;
	border: 2px solid rgba(255, 0, 0, 0.5);
	border-radius: 50%;
`

// Модальное окно
export const ModalContent = styled.div`
	background: linear-gradient(135deg, #1a1a2e, #16213e);
	padding: 30px;
	border-radius: 15px;
	text-align: center;
	max-width: 400px;
	width: 90%;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	border: 2px solid #4a4a8a;
`

export const ModalTitle = styled.h2`
	color: #ff9800;
	margin-bottom: 15px;
	font-size: 28px;
`

export const ModalText = styled.p`
	color: #e0e0e0;
	margin-bottom: 25px;
	font-size: 18px;
	line-height: 1.5;
`

export const ModalImage = styled.img`
	width: 120px;
	height: 120px;
	margin: 0 auto 20px;
	display: block;
	object-fit: contain;
`
