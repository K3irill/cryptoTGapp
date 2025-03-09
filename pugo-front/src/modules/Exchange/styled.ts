import { COLORS } from '@/styles/colors'
import { goldenShine } from '@/styles/effects'
import {
	goldenBackground,
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
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
`

export const FirstColumnOverview = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	h2 {
		color: #fff;
		font-size: 20px;
	}
	h3 {
		color: #fff;
		font-size: 18px;
	}
	p {
		color: #fff;
		font-size: 13px;
	}
`

export const Balance = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
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
	font-size: 15px;
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
	border-radius: 15px;
	${goldenBackground}

	font-weight: bold;
`
