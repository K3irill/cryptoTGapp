import { COLORS } from '@/styles/colors'
import { blueTextGradient, silverMainTextGradient } from '@/styles/mixins'
import styled, { css } from 'styled-components'

import { motion } from 'framer-motion'

export const RatingContainer = styled(motion.div)`
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

export const Header = styled(motion.div)`
	text-align: center;
	margin-bottom: 14px;
	position: relative;
`
export const HeaderBorderImg = styled(motion.img)<{ perevertish?: boolean }>`
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	${p => p.perevertish && `transform: rotate(180deg); 	top: -150%;`}
`

export const HeaderInfoRow = styled(motion.div)<{ flat?: boolean }>`
	${p =>
		!p.flat
			? `display: grid;
      padding: 10px 18px;
	grid-template-columns: 16% 30% 1fr;
	column-gap: 28px;

	div:last-child {
		justify-content: end;
	}`
			: `margin-top: 10px;   padding: 0 18px;`}
`

export const HeaderInfoItemWrap = styled(motion.div)`
	display: flex;
`
export const HeaderInfoItem = styled(motion.p)`
	width: fit-content;
`

export const BestPlayerContainer = styled(motion.div)``

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

export const BestPlayersList = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 12px;
`
