import { COLORS } from '@/styles/colors'
import {
	blueTextGradient,
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
	purpleTextGradient,
	silverMainTextGradient,
} from '@/styles/mixins'
import styled, { css } from 'styled-components'

export const FrensStyled = styled.div`
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

export const FrensBlock = styled.div`
	position: relative;
`
export const Headline = styled.div`
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
export const Title = styled.h2`
	font-size: 38px;
	font-weight: bold;
	line-height: 120%;
	${silverMainTextGradient}
`
export const SubTitle = styled.h3`
	font-size: 16px;
	font-weight: bold;
	${silverMainTextGradient}
`

export const DescriptionBlock = styled.div`
	${mainBlockBackground}
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%;
	border-radius: 25px;
	padding: 24px;
	margin-top: 10px;
`
export const OptionItem = styled.div`
	border: 1px solid ${COLORS.ice};
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px 15px;
	padding: 10px;
`

export const OptionTitle = styled.p`
	color: ${COLORS.ice};
	font-size: 12px;
	font-weight: bold;

	span {
		${purpleTextGradient}
		font:bold;
		font-size: 14px;
	}
`

export const OptionTextBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
`
export const OptionImg = styled.div``

export const ButtonBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: fit-content;

	margin: 15px 0;
`

export const ReferralsBlock = styled.div`
	padding: 8px 12px 16px 8px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 6px;
	height: fit-content;
	${mainBlockBackground}
	margin: 15px 0;
`

export const ReferralsInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

export const ReferralsHeading = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
