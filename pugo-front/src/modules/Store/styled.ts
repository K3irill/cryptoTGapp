import { COLORS } from '@/styles/colors'
import {
	extraBlockBackground,
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
	purpleTextGradient,
} from '@/styles/mixins'
import styled, { css } from 'styled-components'

export const StoreStyled = styled.div`
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

export const StoreBlock = styled.div`
	padding-bottom: 50px;
`

export const StoreSliderRow = styled.div``

export const StoreSliderTitle = styled.div`
	margin: 20px;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	font-size: 26px;
	font-weight: 800;
	${purpleTextGradient}
`

export const StoreSliderItems = styled.div`
	display: flex;
`

export const GameCard = styled.a<{ background?: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%; // Изменено: ширина на 100%
	height: 150px; // Высота остается фиксированной
	border-radius: 6px;
	gap: 6px;
	padding: 10px;
	cursor: pointer;
	${p => p.background && `background: url(${p.background}) no-repeat;`}
	background-size: cover;
	box-shadow: inset 0px 0px 5px #ffffff;
	flex-shrink: 0; // Добавлено: предотвращает сжатие
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
	text-shadow: 0px 0px 10px #ffffff;
	line-height: 46px;
	font-weight: 900;
`
