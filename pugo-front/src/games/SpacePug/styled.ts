import { pinkOrangeGradientBackground } from '@/styles/mixins'
import styled, { keyframes } from 'styled-components'
export const ControlsStyled = styled.div`
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 10px;
`

export const ControlsWrapper = styled.div`
	opacity: 0.75;
	${ControlsStyled};
	display: flex;
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

export const GameCanvasStyled = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	// background: url('/backgrounds/space-stars.gif');
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const GameUi = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	color: white;
	font-weight: 800;
`
export const UiButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 15px;
`

// Анимация мигания фиолетовым
const blinkPurple = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5) drop-shadow(0 0 10px purple);
  }
  100% {
    filter: brightness(1);
  }
`

// Анимация мигания зелёным
const blinkGreen = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5) drop-shadow(0 0 10px green);
  }
  100% {
    filter: brightness(1);
  }
`
const blinkMegaGreen = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5) drop-shadow(0 0 10px #01ff01);
  }
  100% {
    filter: brightness(1);
  }
`
const blinkRed = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5) drop-shadow(0 0 10px #ff0101);
  }
  100% {
    filter: brightness(1);
  }
`
export const CoinStyled = styled.div`
	position: absolute;
	width: 50px;
	height: 50px;
	background: url('/coin-c.png') no-repeat center/contain;
	cursor: pointer;
	animation: ${blinkPurple} 1s infinite; // Мигание фиолетовым
`

export const HealthPackStyled = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background: url('/photos/healt-pack.png') no-repeat center/contain;
	animation: ${blinkGreen} 1s infinite; // Мигание зелёным
`
export const MegaHealthPackStyled = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background: url('/photos/mega-healt-pack.png') no-repeat center/contain;
	animation: ${blinkMegaGreen} 1s infinite;
`
export const MegaBombsStyled = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background: url('/photos/bomb.png') no-repeat center/contain;
	animation: ${blinkRed} 1s infinite;
`

export const ShipStyled = styled.div`
	position: absolute;
	bottom: 20px;
	left: 50%;
	width: 50px;
	height: 50px;
	background: url('/photos/ship.png') no-repeat center/contain;
	transition: transform 0.2s ease; // Плавный наклон

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
// Анимация взрыва
const explode = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`

// Анимация ударной волны
const shockwave = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`

export const AsteroidStyled = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background: url('/photos/meteors.png') no-repeat center/contain;
	animation: ${rotate} 5s linear infinite;
`
export const FlashAsteroidStyled = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background: url('/photos/flash.png') no-repeat center/contain;
	// animation: ${rotate} 5s linear infinite;
`

export const ExplosionStyled = styled.div`
	position: absolute;
	width: 60px;
	height: 60px;
	background: url('/photos/explosion.gif') no-repeat center/contain;
	// animation: ${explode} 0.5s ease-out forwards;
`

export const ShockwaveStyled = styled.div`
	position: absolute;
	width: 100px;
	height: 100px;
	border: 2px solid rgba(255, 0, 0, 0.5);
	border-radius: 50%;
	// animation: ${shockwave} 0.5s ease-out forwards;
`
