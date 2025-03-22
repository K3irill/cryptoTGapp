import { COLORS } from '@/styles/colors'
import {
	extraBlockBackground,
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
	purpleTextGradient,
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
	z-index: 2;
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
	flex-direction: column;
	gap: 15px;
	flex-wrap: wrap;
`
export const GameCard = styled.a<{ background?: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100px;
	border-radius: 6px;
	gap: 6px;
	padding: 10px;
	cursor: pointer;
	${p => p.background && `background: url(${p.background}) no-repeat;`}
	background-size: 100%;
`

export const GCardImageWrapper = styled.div<{ radius?: string }>`
	position: absolute;
	object-fit: cover;
	img {
		width: 100%;
		${p => p.radius && `border-radius: ${p.radius}; `}
	}
`

export const GCardTitle = styled.div`
	${purpleTextGradient}
	text-align: center;
	font-size: 32px;
	text-shadow: 0px 0px 10px black;
	line-height: 46px;
	font-weight: 900;
`
