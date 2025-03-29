import { Lock } from '@/components/Navigation/styled'
import { COLORS } from '@/styles/colors'
import {
	blueTextGradient,
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
	font-size: 16px;
	font-weight: 800;
	${purpleTextGradient}
`

export const StoreSliderItems = styled.div`
	display: flex;
`

export const CaseCard = styled.a<{ shadowColor?: string; disabled?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	position: relative;
	border-radius: 6px;
	gap: 6px;
	padding: 10px;
	cursor: pointer;

	background-size: cover;
	background-position: center;

	flex-shrink: 0;

	img {
		width: 100%;
		${p =>
			p.shadowColor && `filter: drop-shadow(0px 0px 10px ${p.shadowColor});`}
	}

	${p =>
		p.disabled &&
		`
    pointer-events: none;
    cursor: not-allowed;
    filter: brightness(0.2)`}
`

export const GCardImageWrapper = styled.div<{ radius?: string }>`
	position: absolute;
	object-fit: cover;
	img {
		width: 100%;
		${p => p.radius && `border-radius: ${p.radius}; `}
	}
`

export const CaseTitle = styled.div`
	${blueTextGradient};
	text-align: center;
	font-size: 8px;

	line-height: 46px;
	font-weight: 900;
	position: relative;
	transform: rotate(9deg);
	bottom: 24px;
	left: -4px;
`
