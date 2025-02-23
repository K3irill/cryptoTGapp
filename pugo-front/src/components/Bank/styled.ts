import {
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
} from '@/styles/mixins'
import styled from 'styled-components'

export const BankStyled = styled.div`
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

export const BannerStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	padding: 0 8px;
	margin-top: 10px;
`

export const ConnectBlock = styled.div`
	${mainBlockBackground}
	margin-top:24px;
	width: 100%;
	height: 140px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`
export const CoinWithFrameWrapper = styled.div`
	width: 87px;
	height: 70px;
`
export const CoinWithFrame = styled.img`
	width: 100%;
	height: 100%;
`
export const ButtonWrapper = styled.div`
	width: 250px;
	display: flex;
`
export const ButtonBlock = styled.div`
	${mainBlockBackground}
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 85px;
	padding: 12px 0px;
`

export const BankButtonStyled = styled.button`
	background: transparent;
`

export const HistoryBlock = styled.div`
	${mainBlockBackground}
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
`

export const TopHistoryStyled = styled.div`
	position: relative;

	span {
		${goldenTextGradientV2}
		font-family: 'DM Sans';
		font-style: normal;
		font-weight: 700;
		font-size: 14px;
		line-height: 14px;
		text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	}
`
export const TopBorderStyled = styled.img`
	position: absolute;
	width: 100%;
	left: 50%;
	transform: translateX(-50%);
`
export const HeadingElementsStyled = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 15px 35px;
`

export const ActivityList = styled.div``
