import { purpleTextGradient } from '@/styles/mixins'
import styled, { keyframes, css } from 'styled-components'

// Анимации
const float = keyframes`
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-20px) }
`

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7) }
  70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0) }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0) }
`

const particleFloat = keyframes`
  from { transform: translateY(0) translateX(0) }
  to { transform: translateY(-100vh) translateX(20px) }
`

const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`

// Типы пропсов для стилизованных компонентов
interface SlideBackgroundProps {
	$color: string
}

interface GlowEffectProps {
	$color: string
}

interface DotProps {
	$active: boolean
	$color: string
}

interface CosmicButtonProps {
	$color: string
	$position: 'left' | 'right'
	$pulse?: boolean
}

export const CustomSelectWrapper = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
`
// Компоненты
export const CosmicSliderContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: #0a0a1a;
`

interface ParticleProps {
	size?: string | number
}

export const Particle = styled.div<ParticleProps>`
	position: absolute;
	width: ${props =>
		typeof props.size === 'number' ? `${props.size}px` : props.size || '4px'};
	height: ${props =>
		typeof props.size === 'number' ? `${props.size}px` : props.size || '4px'};
	background: white;
	border-radius: 50%;
	opacity: 0.6;
	animation: ${particleFloat} linear infinite;
	animation-duration: ${() => Math.random() * 20 + 10}s;
`

export const SlideWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
`

export const SlideBackground = styled.div<SlideBackgroundProps>`
	position: absolute;
	width: 100%;
	height: 100%;
	background: ${props => css`
    radial-gradient(
      circle at center,
      ${props.$color}20 0%,
      #0a0a1a 70%
    )
  `};
	z-index: 1;
`

export const GlowEffect = styled.div<GlowEffectProps>`
	position: absolute;
	width: 300px;
	height: 300px;
	border-radius: 50%;
	background: ${props => props.$color};
	filter: blur(80px);
	opacity: 0.3;
	z-index: 2;
	animation: ${float} 8s ease-in-out infinite;
`

export const SlideContent = styled.div`
	position: relative;
	z-index: 3;
	width: 90%;
	max-width: 800px;
	text-align: center;
	padding: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
`

export const TokenBadge = styled.span`
	padding: 8px 16px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20px;
	font-size: 12px;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: white;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
`

export const SlideTitle = styled.h2`
	font-size: 2.5rem;
	margin: 20px 0;
	line-height: 1.2;
	background: linear-gradient(90deg, white, #aaa);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

	@media (max-width: 768px) {
		font-size: 1.8rem;
	}
`

export const SlideImageContainer = styled.div`
	width: 250px;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: ${float} 6s ease-in-out infinite;
`

export const SlideImage = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
`

export const SlideText = styled.p`
	font-size: 1.2rem;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.9);
	max-width: 600px;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`

export const NavigationDots = styled.div`
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 10px;
	z-index: 10;
`

export const BifsName = styled.h1`
	${purpleTextGradient}
	font-weight: 900;
	font-size: 36px;
	line-height: 1.2;
	position: relative;
	top: -20px;
`

export const Dot = styled.div<DotProps>`
	width: 12px;
	height: 12px;
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.3s ease;
	background: ${props =>
		props.$active ? props.$color : 'rgba(255, 255, 255, 0.2)'};
	transform: ${props => (props.$active ? 'scale(1.3)' : 'scale(1)')};
	box-shadow: ${props => (props.$active ? `0 0 10px ${props.$color}` : 'none')};
`

export const CosmicButton = styled.button<CosmicButtonProps>`
	position: absolute;
	bottom: 40px;
	${props => (props.$position === 'left' ? 'left: 40px' : 'right: 40px')};
	padding: 15px 30px;
	border: none;
	border-radius: 50px;
	background: ${props => css`
    linear-gradient(
      90deg,
      ${props.$color} 0%,
      ${props.$color}60 100%
    )
  `};
	color: white;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
	z-index: 20;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	transition: all 0.3s ease;
	overflow: hidden;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 15px ${props => `${props.$color}80`};
	}

	&:active {
		transform: translateY(0);
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.2),
			transparent
		);
		transition: 0.5s;
	}

	&:hover::before {
		left: 100%;
	}

	${props =>
		props.$pulse &&
		css`
			animation: ${pulse} 2s infinite;
		`}

	@media (max-width: 768px) {
		padding: 7px 20px;
		font-size: 0.8rem;
		bottom: 45px;
		${props => (props.$position === 'left' ? 'left: 20px' : 'right: 20px')};
	}
`
