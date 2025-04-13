import { COLORS } from '@/styles/colors'
import {
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
	purpleTextGradient,
} from '@/styles/mixins'
import styled, { css } from 'styled-components'

export const MapStyled = styled.div`
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 12px;
	overflow-y: auto;
	max-height: calc(100vh - 170px);
	padding-bottom: 8px;

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

export const MapBlock = styled.div`
	margin-top: 15px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const MapSvg = styled.img`
	position: relative;
  width: 100%;
`
