import { COLORS } from '@/styles/colors'
import {
	blueTextGradient,
	purpleTextGradient,
	silverMainTextGradient,
} from '@/styles/mixins'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const GamesContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
	max-height: calc(100vh - 170px);
	overflow-y: auto;
	scrollbar-width: none;
	position: relative;
	z-index: 3;

	&::-webkit-scrollbar {
		display: none;
	}
`

export const Header = styled(motion.div)`
	text-align: center;
	margin-bottom: 24px;
`

export const MainTitle = styled(motion.h1)`
	font-size: 32px;
	font-weight: 800;
	margin-bottom: 8px;
	${silverMainTextGradient};
	line-height: 1.2;
`

export const SubTitle = styled(motion.p)`
	font-size: 16px;
	color: ${COLORS.ice};
`

export const GamesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 20px;
	width: 100%;
`

export const GameCard = styled(motion.div).attrs<{ $available: boolean }>(
	props => ({
		whileHover: props.$available ? { y: -5 } : {},
	})
)<{ $available: boolean }>`
	background: rgba(30, 30, 46, 0.7);
	backdrop-filter: blur(10px);
	border-radius: 16px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.1);
	cursor: ${p => (p.$available ? 'pointer' : 'not-allowed')};
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	height: 100%;

	${p =>
		!p.$available &&
		`
    opacity: 0.7;
    filter: grayscale(70%);
  `}
`

export const GameImage = styled.div<{ $src: string }>`
	position: relative;
	width: 100%;
	height: 160px;
	background: url(${p => p.$src}) center/cover no-repeat;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const GameContent = styled.div`
	padding: 16px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`

export const GameTitle = styled.h3`
	font-size: 18px;
	font-weight: 700;
	margin-bottom: 8px;
	${purpleTextGradient};
`

export const GameDescription = styled.p`
	font-size: 14px;
	color: ${COLORS.ice};
	margin-bottom: 0;
`

export const LockOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`

export const ComingSoonBadge = styled.span`
	position: absolute;
	top: 12px;
	right: 12px;
	background: ${COLORS.ice};
	color: white;
	padding: 4px 8px;
	border-radius: 12px;
	font-size: 12px;
	font-weight: 600;
	${blueTextGradient};
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`
