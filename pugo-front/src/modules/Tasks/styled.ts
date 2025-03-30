import { COLORS } from '@/styles/colors'
import {
	blueTextGradient,
	goldenTextGradient,
	mainBlockBackground,
	silverMainTextGradient,
} from '@/styles/mixins'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const TasksContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
	height: calc(100vh - 170px);
	overflow-y: auto;
	scrollbar-width: none;
	position: relative;
	z-index: 5;
	&::-webkit-scrollbar {
		display: none;
	}
`

export const TasksHeader = styled(motion.div)`
	text-align: center;
	margin-bottom: 16px;
`

export const MainTitle = styled.h1`
	font-size: 32px;
	font-weight: 800;
	margin-bottom: 8px;
	${silverMainTextGradient};
	line-height: 1.2;
`

export const SubTitle = styled.p`
	font-size: 16px;
	color: ${COLORS.ice};
`

export const InstructionBlock = styled(motion.div)`
	background: rgba(30, 30, 46, 0.6);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 24px;
	margin-bottom: 24px;
	border: 1px solid rgba(255, 255, 255, 0.1);

	h3 {
		font-size: 18px;
		font-weight: 600;
		color: ${COLORS.ice};
		margin-bottom: 16px;
		text-align: center;
	}
`

export const InstructionSteps = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
`

export const InstructionStep = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	flex: 1;

	img {
		width: 50px;
		height: 50px;
		object-fit: contain;
		filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.3));
	}

	p {
		font-size: 14px;
		color: ${COLORS.ice};
		text-align: center;
		font-weight: 500;
	}
`

export const InstructionArrow = styled.img`
	width: 24px;
	height: 24px;
	opacity: 0.6;
`

export const TasksContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`

export const TasksSection = styled(motion.div)`
	background: rgba(30, 30, 46, 0.6);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 16px;
	border: 1px solid rgba(255, 255, 255, 0.1);
`

export const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 8px;
`

export const SectionTitle = styled.h3`
	font-size: 18px;
	font-weight: 600;
	${blueTextGradient};
`

export const SectionToggle = styled.div<{ isOpen: boolean }>`
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.3s ease;

	img {
		width: 100%;
		height: 100%;
	}

	${({ isOpen }) =>
		!isOpen
			? css`
					transform: rotate(-180deg);
			  `
			: css`
					transform: rotate(0deg);
			  `}
`

export const TasksList = styled.div<{ isOpen: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 12px;
	overflow: hidden;
	transition: all 0.4s ease;

	${({ isOpen }) =>
		isOpen
			? css`
					max-height: 2000px;
					margin-top: 16px;
			  `
			: css`
					max-height: 0;
					margin-top: 0;
			  `}
`

export const TaskItemWrapper = styled(motion.div)`
	&:hover {
		transform: translateY(-2px);
	}
`

export const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px;
	text-align: center;
	color: ${COLORS.ice};
	opacity: 0.7;

	img {
		width: 80px;
		height: 80px;
		margin-bottom: 16px;
		opacity: 0.5;
	}

	p {
		font-size: 14px;
	}
`
