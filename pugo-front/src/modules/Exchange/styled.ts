import { COLORS } from '@/styles/colors'
import { goldenShine } from '@/styles/effects'
import {
	blueTextGradient,
	goldenBackground,
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
	purpleTextGradient,
	silverTextGradient,
} from '@/styles/mixins'
import styled from 'styled-components'

export const ExchangeStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 12px;
	overflow-y: auto;
	max-height: calc(100vh - 265px);
	padding-bottom: 8px;

	::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
	scrollbar-color: transparent transparent;
`

export const OverviewStyled = styled.div`
	${mainBlockBackground}
	display: flex;
	justify-content: space-between;
	// justify-content: center;
	// flex-direction: column;
	align-items: center;
	gap: 15px;
	padding: 10px 16px;
	margin: 10px 0;
`

export const SecondColumnOverview = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 5px;
	text-align: center;
	padding: 15px 0;
	height: 120px;
`

export const FirstColumnOverview = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	h2 {
		font-size: 28px;
		${goldenTextGradientV2}
	}

	p {
		font-weight: 600;
		color: #fff;
		font-size: 16px;
		${goldenTextGradient}
	}
`

export const Balance = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	h3 {
		${purpleTextGradient};
		font-weight: 900;
		font-size: 18px;
	}
`

export const GoldTitle = styled.h3`
	font-size: 12px;
	line-height: 120%;
	width: 150px;
	${goldenTextGradientV2}
`

export const StarsWrapper = styled.div`
	position: relative;
	display: flex;

	flex-direction: column;
	gap: 5px;
`
export const StarOptionFirstBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`
export const StarsOptionList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`
export const StarOptionItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
	${mainBlockBackground}
	padding: 10px 15px;
`

export const Count = styled.div`
	color: ${COLORS.gold};
	font-size: 13px;
	font-weight: bold;
	span {
		color: ${COLORS.grey};
	}
`

export const StarInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	padding-left: 10px;
`
export const StarButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
	padding: 5px 15px;
	border-radius: 6px;
	${goldenTextGradient}
	font-size: 16px;
	border: 1px solid ${COLORS.gold};
	height: fit-content;
	font-weight: 900;
`
export const Mining = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	padding-left: 10px;
	position: relative;

	h3 {
		z-index: 2;
	}

	img {
		position: absolute;
		width: 150px;
		top: 15px;
		z-index: 1;
	}
`

export const InDollars = styled.h4`
	font-size: 12px;
	line-height: 120%;
	${silverTextGradient}
	font-weight: bold;
`
export const StarWrapper = styled.div`
	width: 40px;
	height: auto;
`
