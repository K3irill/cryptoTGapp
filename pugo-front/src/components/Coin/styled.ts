import styled from 'styled-components'

export const CoinStyled = styled.div<{
	$rotateX: number
	$rotateY: number
	$scale: number
	$isInteracting: boolean
}>`
	position: relative;
	border-radius: 50%;
	top: 5px;
	right: -2px;
	width: 280px;
	height: 280px;
	z-index: 3;
	transition: transform 0.3s ease-out, scale 0.1s ease-in-out;
	transform: perspective(500px) rotateX(${props => props.$rotateX}deg)
		rotateY(${props => props.$rotateY}deg) scale(${props => props.$scale});

	/* Плавная анимация наклона по кругу */
	animation: ${props =>
		props.$isInteracting ? 'none' : 'rotateEffect 20s infinite linear'};

	@keyframes rotateEffect {
		0% {
			transform: perspective(500px) rotateX(20deg) rotateY(0deg);
		}
		25% {
			transform: perspective(500px) rotateX(0deg) rotateY(20deg);
		}
		50% {
			transform: perspective(500px) rotateX(-20deg) rotateY(0deg);
		}
		75% {
			transform: perspective(500px) rotateX(0deg) rotateY(-20deg);
		}
		100% {
			transform: perspective(500px) rotateX(20deg) rotateY(0deg);
		}
	}

	img {
		width: 100%;
		height: 100%;
	}

	@media (max-height: 931px) {
		width: 260px;
		height: 260px;
	}

	@media (max-height: 861px) {
		width: 200px;
		height: 200px;
	}
`

export const CoinFrame = styled.div``

export const ImgFrame = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`
