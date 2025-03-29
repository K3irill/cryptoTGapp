import { motion } from 'framer-motion'
import styled from 'styled-components'
import { COLORS } from '@/styles/colors'
import { purpleTextGradient, blueTextGradient } from '@/styles/mixins'
import { Swiper } from 'swiper/react'

export const StoreContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
	max-height: calc(100vh - 170px);
	overflow-y: auto;
	scrollbar-width: none;
	position: relative;
	z-index: 5;
	&::-webkit-scrollbar {
		display: none;
	}
`

export const SliderSection = styled(motion.section)`
	position: relative;
`

export const SliderTitle = styled(motion.h2)`
	margin: 0 0 20px 0;
	font-size: 22px;
	font-weight: 700;
	${purpleTextGradient};
	text-align: center;
`

export const CaseCard = styled(motion.div).attrs<{
	$shadowColor: string
	$disabled?: boolean
}>(props => ({
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	transition: { duration: 0.3 },
	whileHover: props.$disabled
		? {}
		: {
				y: -10,
				boxShadow: `0 15px 30px ${props.$shadowColor}`,
				zIndex: 10,
		  },
}))<{ $shadowColor: string; $disabled?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	padding: 20px;
	cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
	background: rgba(30, 30, 46, 0.7);
	backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.15);
	height: 200px;
	margin: 0 10px;
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	overflow: visible;

	img {
		width: 100%;
		height: auto;
		max-height: 130px;
		object-fit: contain;
		filter: ${props => `drop-shadow(0 0 20px ${props.$shadowColor})`};
		transition: all 0.3s ease;
	}

	${props =>
		props.$disabled &&
		`
    opacity: 0.6;
    filter: grayscale(70%);
  `}
`

export const CaseTitle = styled(motion.div)`
	${blueTextGradient};
	font-size: 16px;
	font-weight: 700;
	margin-top: 12px;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 1px;
`

export const LockOverlay = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 16px;
	z-index: 2;

	img {
		width: 60px;
		height: 60px;
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
	}
`

export const StyledSwiper = styled(Swiper)`
	width: 100%;
	padding: 10px 0 30px;
	overflow: visible;

	.swiper-slide {
		width: 180px;
		overflow: visible;
	}

	.swiper-button-next,
	.swiper-button-prev {
		width: 36px;
		height: 36px;
		background: rgba(0, 191, 255, 0.381);
		backdrop-filter: blur(5px);
		border-radius: 50%;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.2);
		top: 50%;
		transform: translateY(-50%);
		margin-top: 0;
		position: absolute;
		z-index: 6;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background: rgba(0, 191, 255, 0.5);
			transform: translateY(-50%) scale(1.1);
		}

		&::after {
			content: '';
			width: 20px;
			height: 20px;
			background-image: url('/icons/arrow.svg');
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
			display: block;
			position: relative;
		}
	}

	.swiper-button-prev {
		left: 5px;
		&::after {
			transform: rotate(180deg);
		}
	}

	.swiper-button-next {
		right: 5px;
	}
`
