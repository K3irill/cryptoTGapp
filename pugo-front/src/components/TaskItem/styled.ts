import { COLORS } from '@/styles/colors'
import { blueTextGradient, mainBlockBackground } from '@/styles/mixins'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const TaskItemContainer = styled(motion.div)`
	${mainBlockBackground};
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 16px;
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
`

export const TaskIcon = styled.div`
	flex-shrink: 0;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 191, 255, 0.1);
	border-radius: 10px;
	border: 1px solid rgba(0, 191, 255, 0.2);

	img {
		width: 24px;
		height: 24px;
	}
`

export const TaskContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 4px;
`

export const TaskTitle = styled.h3`
	font-size: 14px;
	font-weight: 600;
	color: ${COLORS.ice};
	line-height: 1.4;
`
export const TaskReward = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	font-size: 14px;
	font-weight: 900;
	color: white;
	padding: 4px 12px;
	border-radius: 8px;
	position: relative;
	z-index: 1;

	background: linear-gradient(90deg, #00bfff, #0080ff, #00bfff);
	background-size: 200% auto;
	animation: shine 3s linear infinite;

	&::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		border-radius: 10px;
		background: linear-gradient(90deg, #00bfff, #00ffff, #0080ff);
		z-index: -1;
		opacity: 0.7;
		animation: shine 4s linear infinite reverse;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 8px;
		background: rgba(0, 191, 255, 0.2);
		box-shadow: 0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3);
		z-index: -2;
		opacity: 0;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes shine {
		to {
			background-position: 200% center;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.7;
		}
	}

	p {
		filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
	}
`

export const TaskStatus = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	flex-shrink: 0;
`

export const TaskButton = styled.button<{ status: string; disabled?: boolean }>`
	padding: 8px 12px;
	border-radius: 8px;
	font-size: 12px;
	font-weight: 600;
	border: none;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	transition: all 0.3s ease;
	white-space: nowrap;

	${({ status }) =>
		status === 'available'
			? css`
					background: linear-gradient(90deg, #00bfff, #0080ff);
					color: white;
					&:hover {
						box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
					}
			  `
			: status === 'pending'
			? css`
					background: rgba(255, 165, 0, 0.2);
					color: orange;
					border: 1px solid orange;
			  `
			: css`
					background: rgba(0, 255, 0, 0.1);
					color: lime;
					border: 1px solid lime;
			  `}

	${({ disabled }) =>
		disabled &&
		css`
			opacity: 0.7;
			cursor: not-allowed;
		`}
`
