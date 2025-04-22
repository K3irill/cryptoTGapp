// styled.ts
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { opacity: 0.3; }
`

const particleMove = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-50px) translateX(20px); opacity: 0; }
`

export const TransitionOverlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(
		circle,
		rgba(98, 0, 234, 0.2) 0%,
		rgba(22, 14, 45, 0.9) 70%
	);
	z-index: 9998;
	pointer-events: none;
`

export const LanguageSwitcherStyled = styled(motion.div)<{
	$isTransitioning?: boolean
}>`
	position: relative;
	display: flex;
	align-items: center;
	background: rgba(22, 14, 45, 0.6);
	border-radius: 50px;
	padding: 4px;

	border: 1px solid rgba(138, 99, 210, 0.3);
	box-shadow: 0 0 20px rgba(98, 0, 234, 0.15),
		inset 0 0 15px rgba(138, 99, 210, 0.2);
	z-index: 9998;
	transition: all 0.5s ease;
	filter: ${({ $isTransitioning }) =>
		$isTransitioning ? 'blur(1px)' : 'none'};

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50px;
		padding: 1px;
		background: linear-gradient(
			135deg,
			rgba(138, 99, 210, 0.4),
			rgba(76, 201, 240, 0.2)
		);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		z-index: 9999;
	}

	.cosmic-glow {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50px;
		background: radial-gradient(
			circle at center,
			rgba(98, 0, 234, 0.3) 0%,
			transparent 70%
		);
		z-index: -1;
		opacity: 0.6;
		animation: ${pulse} 4s infinite ease-in-out;
	}

	.particles {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50px;
		overflow: hidden;

		&::before,
		&::after {
			content: '✦';
			position: absolute;
			color: rgba(76, 201, 240, 0.7);
			font-size: 8px;
			animation: ${particleMove} 3s infinite ease-out;
		}

		&::before {
			top: 15px;
			left: 30%;
			animation-delay: 0.5s;
		}

		&::after {
			top: 25px;
			left: 70%;
			animation-delay: 1s;
		}
	}
`

export const LanguageButton = styled(motion.button)<{
	$active: boolean
	$disabled?: boolean
}>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	padding: 8px 16px;
	border: none;
	background: ${({ $active }) =>
		$active
			? 'linear-gradient(90deg, rgba(98, 0, 234, 0.2) 0%, rgba(76, 201, 240, 0.1) 100%)'
			: 'transparent'};
	color: ${({ $active, $disabled }) =>
		$disabled
			? 'rgba(255, 255, 255, 0.3)'
			: $active
			? '#fff'
			: 'rgba(255, 255, 255, 0.7)'};
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	font-family: inherit;
	font-weight: 500;
	font-size: 14px;
	border-radius: 40px;
	transition: all 0.3s ease;
	z-index: 99999;
	pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

	.flag {
		font-size: 16px;
		filter: ${({ $active, $disabled }) =>
			$disabled
				? 'grayscale(80%)'
				: $active
				? 'drop-shadow(0 0 4px rgba(138, 99, 210, 0.8))'
				: 'none'};
		transition: all 0.3s ease;

		@media (max-width: 900px) {
			font-size: 10px;
		}
	}

	.text {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			bottom: -2px;
			left: 0;
			width: ${({ $active, $disabled }) =>
				$disabled ? '0' : $active ? '100%' : '0'};
			height: 1px;
			background: linear-gradient(90deg, #8a63d2, #4cc9f0);
			transition: width 0.3s ease;
		}
	}

	&:hover {
		color: ${({ $disabled }) =>
			$disabled ? 'rgba(255, 255, 255, 0.3)' : '#fff'};
		.flag {
			filter: ${({ $disabled }) =>
				$disabled
					? 'grayscale(80%)'
					: 'drop-shadow(0 0 4px rgba(138, 99, 210, 0.6))'};
		}
		.text::after {
			width: ${({ $disabled }) => ($disabled ? '0' : '100%')};
		}
	}
	@media (max-width: 980px) {
		padding: 8px 11px;
		font-size: 12px;
	}
`

export const ActiveIndicator = styled.div<{
	$active: boolean
	$transitioning?: boolean
}>`
	position: absolute;
	left: ${({ $active }) => ($active ? '4px' : 'calc(100% - 84px)')};
	width: calc(100% - 8px);
	height: calc(100% - 8px);
	background: linear-gradient(
		90deg,
		rgba(98, 0, 234, 0.3),
		rgba(76, 201, 240, 0.15)
	);
	border-radius: 40px;
	transition: ${({ $transitioning }) =>
		$transitioning
			? 'all 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
			: 'left 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)'};
	z-index: 1;
	box-shadow: 0 0 10px rgba(98, 0, 234, 0.2);
	opacity: ${({ $transitioning }) => ($transitioning ? 0.7 : 1)};

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 40px;
		padding: 1px;
		background: linear-gradient(90deg, #8a63d2, #4cc9f0);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		opacity: 0.6;
	}
`
// styled.ts (additional styles)
export const SelectStyled = styled(LanguageSwitcherStyled)`
	flex-direction: column;
	align-items: stretch;
	padding: 4px;
	min-width: 120px;
	position: relative;

	@media (max-width: 900px) {
		// position: absolute;
		// top: 40px;
		// right: 0;
		min-width: 80px;
		max-width: 90px;
	}
`

export const SelectButton = styled(LanguageButton)`
	justify-content: space-between;
	width: 100%;
	position: relative;
	z-index: 3;

	.arrow {
		font-size: 12px;
		transition: all 0.3s ease;
		margin-left: 8px;

		@media (max-width: 900px) {
			font-size: 10px;
		}
	}
`

export const OptionsList = styled(motion.div)`
	position: absolute;
	top: calc(100% + 8px);
	left: 0;
	width: 100%;
	background: rgba(22, 14, 45, 0.95);
	border-radius: 12px;
	padding: 8px;
	border: 1px solid rgba(138, 99, 210, 0.3);
	box-shadow: 0 0 20px rgba(98, 0, 234, 0.3),
		inset 0 0 15px rgba(138, 99, 210, 0.2);
	z-index: 10;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 10px;
		padding: 1px;
		background: linear-gradient(
			135deg,
			rgba(138, 99, 210, 0.4),
			rgba(76, 201, 240, 0.2)
		);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
	}
`

export const OptionItem = styled(motion.div)<{ $active: boolean }>`
	padding: 8px 12px;
	display: flex;
	align-items: center;
	gap: 8px;
	border-radius: 6px;
	cursor: pointer;
	color: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
	background: ${({ $active }) =>
		$active ? 'rgba(98, 0, 234, 0.2)' : 'transparent'};
	margin: 2px 0;
	transition: all 0.3s ease;

	.icon {
		font-size: 16px;
		filter: ${({ $active }) =>
			$active ? 'drop-shadow(0 0 4px rgba(138, 99, 210, 0.8))' : 'none'};
		@media (max-width: 900px) {
			font-size: 12px;
		}
	}

	&:hover {
		background: rgba(98, 0, 234, 0.15);
		color: #fff;
		.icon {
			filter: drop-shadow(0 0 4px rgba(138, 99, 210, 0.6));
		}
	}
`
