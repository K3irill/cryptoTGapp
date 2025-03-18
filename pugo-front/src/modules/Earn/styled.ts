import { COLORS } from '@/styles/colors'
import {
	extraBlockBackground,
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
} from '@/styles/mixins'
import styled, { css } from 'styled-components'

export const EarnStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 12px;
	overflow-y: auto;
	max-height: calc(100vh - 170px);
	padding-bottom: 8px;
	position: relative;

	::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
	scrollbar-color: transparent transparent;
`

export const TextStyled = styled.h2`
	font-weight: bold;
	font-size: 12px;
	color: ${COLORS.grey};
`

export const EarnBlock = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	gap: 10px;
	flex-wrap: wrap;
`
export const GameCard = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100px;
	height: 100px;
	${extraBlockBackground}
	gap: 6px;
	padding: 10px;
	cursor: pointer;
`

export const GCardImageWrapper = styled.div<{ radius?: string }>`
	img {
		${p => p.radius && `border-radius: ${p.radius}; `}
	}
`

export const GCardTitle = styled.div`
	${goldenTextGradient}
	text-align: center;
	font-size: 12px;
	line-height: 14px;
	font-weight: 900;
`
