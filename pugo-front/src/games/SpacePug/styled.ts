import { pinkOrangeGradientBackground } from '@/styles/mixins'
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

export const GameUi = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	color: white;
	font-family: 'Arial', sans-serif;
	font-weight: 800;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 8px;
	background: rgba(0, 0, 0, 0.5);
	padding: 12px;
	border-radius: 8px;
`

export const ScoreText = styled.p`
	margin: 0;
	font-size: 24px;
	font-weight: bold;
	color: #ffeb3b;
`

export const TimeText = styled.p`
	margin: 0;
	font-size: 18px;
	color: #b2ebf2;
`

export const LevelText = styled.p`
	margin: 0;
	font-size: 18px;
	color: #8bc34a;
`

export const ComboText = styled.p`
	margin: 0;
	font-size: 20px;
	font-weight: bold;
	color: #ff9800;
	animation: ${pulse} 0.5s infinite;
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

export const ControlsWrapper = styled(ControlsStyled)`
	a,
	button {
		${pinkOrangeGradientBackground};
		flex-grow: 0;
		align-self: end;
		padding: 15px 35px;

		img {
			width: 25px;
			height: 25px;
		}
	}
`

export const ContorlsTopBottom = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	a,
	button {
		flex: 1 1;
		align-self: center;
		width: 100%;
	}
`

export const GameOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 20;
`

export const RestartButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`

// Игровые объекты
interface AnimatedObjectProps {
	type: 'bifs' | 'mops' | 'bug' | 'hunter' | 'fake' | 'crash'
}

export const AnimatedObject = styled.div<AnimatedObjectProps>`
	${baseObjectStyles}
	transition: transform 0.1s ease;
	pointer-events: auto;
	z-index: 5;

	img {
		width: 100%;
		height: 100%;
		user-select: none;
		-webkit-user-drag: none;
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

export const ShipStyled = styled.div`
	${baseObjectStyles}
	bottom: 20px;
	left: 50%;
	width: 50px;
	height: 50px;
	background-image: url('/photos/ship.png');
	transition: transform 0.2s ease;

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
