import {
	blueTextGradient,
	purpleTextGradient,
	silverTextGradient,
} from '@/styles/mixins'
import { blue } from '@mui/material/colors'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PlayerItemStyled = styled(motion.div)`
	display: grid;
	grid-template-columns: 16% 30% 1fr;
	column-gap: 28px;
	padding: 10px 18px;
	align-items: center;

	& > div:last-child {
		justify-content: end;
	}

	background: url(/textures/paper.png),
		linear-gradient(
			178.41deg,
			rgba(29, 36, 45, 0.44) 1.72%,
			rgba(29, 36, 45, 0) 67.48%
		);
	border-radius: 15px;
`
export const PlayerItemStyledWrap = styled(motion.div)`
	display: flex;
`
export const PlayerItemAvatar = styled(motion.div)`
	width: 41px;
	height: 41px;
	border-radius: 50%;
`

export const PlayerItemAvatarImg = styled(motion.img)`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

export const PlayerItemTokens = styled(motion.div)``

export const PlayerItemTokensLabel = styled(motion.p)`
	font-weight: 700;

	${blueTextGradient}
`

export const PlayerItemTokensAmount = styled(motion.p)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	font-weight: 700;
	${purpleTextGradient}
`
export const PlayerItemPosition = styled(motion.div)<{ position: number }>`
	transform: translateY(${p => (p.position < 3 ? '4px' : '14px')});
`

export const PositionText = styled.text<{ position: number }>`
	transform: translateY(${p => (p.position < 3 ? '-4px' : '-16px')});
	font-weight: ${p => (p.position > 2 ? '700' : '400')};
	font-size: ${p => (p.position > 2 ? '15px' : '14px')};
	font-family: ${p => (p.position > 2 ? "'Bai Jamjuree'" : "'DM Serif Text'")};
	letter-spacing: ${p => (p.position > 2 ? '0.5px' : 'normal')};
`
