import { css, keyframes } from 'styled-components'

// 🔥 Анимация блика (shine)
const shineAnimation = keyframes`
  0% { left: -150%; }
  100% { left: 150%; }
`

export const goldenShine = css`
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -300%;
		width: 300%;
		height: 100%;
		background: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0) 30%,
			rgba(255, 255, 255, 0.5) 50%,
			rgba(255, 255, 255, 0) 70%
		);
		animation: ${shineAnimation} 7s infinite linear;
	}
`

// 🔄 Анимация смены градиента
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

export const goldenGradient = css`
	background: linear-gradient(
		224.54deg,
		#c49337 10.03%,
		#fcf7cd 31.51%,
		#edcd78 48.7%,
		#a7602b 59.25%,
		#fdf8d0 74.48%,
		#bb9138 88.16%
	);
	background-size: 200% 200%;
	animation: ${gradientShift} 5s infinite linear;
`
