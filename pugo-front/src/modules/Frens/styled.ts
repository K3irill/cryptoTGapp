import { COLORS } from '@/styles/colors'
import { blueTextGradient, silverMainTextGradient } from '@/styles/mixins'
import styled, { css } from 'styled-components'

import { motion } from 'framer-motion'

export const FrensContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
	max-height: calc(100vh - 170px);
	overflow-y: auto;
	scrollbar-width: none;
	z-index: 3;
	position: relative;
	&::-webkit-scrollbar {
		display: none;
	}
`

export const Header = styled(motion.div)`
	text-align: center;
	margin-bottom: 14px;
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

export const BenefitsContainer = styled(motion.div)`
	background: rgba(30, 30, 46, 0.6);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 24px;
	margin-bottom: 24px;
	border: 1px solid rgba(255, 255, 255, 0.1);
`

export const BenefitItem = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 16px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	margin-bottom: 16px;
	border: 1px solid rgba(255, 255, 255, 0.1);

	&:last-child {
		margin-bottom: 0;
	}
`

export const BenefitIcon = styled.div`
	flex-shrink: 0;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 191, 255, 0.1);
	border-radius: 12px;
	border: 1px solid rgba(0, 191, 255, 0.2);
`

export const BenefitText = styled.div`
	flex: 1;
`

export const BenefitTitle = styled.h3`
	font-size: 16px;
	font-weight: 600;
	color: ${COLORS.ice};
	margin-bottom: 4px;
`

export const BenefitDescription = styled.p`
	font-size: 14px;
	color: ${COLORS.ice};

	span {
		${blueTextGradient};
		font-weight: 600;
	}
`

export const ReferralButton = styled(motion.button)`
	width: 100%;
	padding: 16px;
	border-radius: 12px;
	background: linear-gradient(90deg, #00bfff, #0080ff);
	color: white;
	font-size: 16px;
	font-weight: 600;
	border: none;
	cursor: pointer;
	margin-bottom: 24px;
	transition: all 0.3s ease;
	position: relative;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0, 191, 255, 0.3);
	}

	&:active {
		transform: translateY(0);
	}
`

export const ReferralsSection = styled(motion.div)`
	background: rgba(30, 30, 46, 0.6);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 24px;
	border: 1px solid rgba(255, 255, 255, 0.1);
`

export const ReferralsHeader = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
	padding-bottom: 8px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const ReferralsTitle = styled.h3`
	font-size: 18px;
	font-weight: 600;
	color: ${COLORS.ice};
`

export const ReferralsList = styled(motion.ul)`
	display: flex;
	flex-direction: column;
	gap: 12px;

	& li:first-child {
		border: none;
	}
`

export const EmptyState = styled(motion.div)`
	text-align: center;
	padding: 24px;
	color: ${COLORS.ice};
	font-size: 14px;
`
