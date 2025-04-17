import { bluePurpleTextGradient, goldenTextGradient } from '@/styles/mixins'
import styled from 'styled-components'

export const HomeStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 2;
	height: 100%;

	max-height: calc(100vh - 170px);
`
export const BannerStyled = styled.div`
	display: flex;

	padding: 0 8px;
`
export const ActivityWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 15px;
	margin-bottom: 10px;
`
export const AutoMining = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 15px;
	position: relative;
	z-index: 2;
`
export const AutoMiningText = styled.div`
	color: #ffffff;
	font-size: 18px;
`

export const CoinSection = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	gap: 50px;
	align-items: center;
	flex-direction: column;
	flex: 1 0;
	position: relative;

	@media (max-height: 931px) {
		justify-content: space-around;
		gap: 0;
	}
`

export const CoinCountInfoWrapper = styled.div`
	width: 246px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 18px;
`
export const CoinCountInfo = styled.div`
	display: flex;
	gap: 44px;
	align-items: center;
`
export const ReturnStyled = styled.div`
	font-size: 12px;
	color: #9c9c9c;

	span {
		color: #6fbafc;
	}
`
export const NDXStyled = styled.div`
	font-size: 12px;
	color: #9c9c9c;

	span {
		color: #33a721;
	}
`

export const CoinCount = styled.div<{ unit?: string }>`
	font-size: 50px;
	font-weight: 600;
	letter-spacing: 7.1px;
	line-height: 62px;
	color: #fff;

	&::after {
		position: absolute;
		content: '${props => props.unit || ''}';
		right: -40px;
		${goldenTextGradient};
	}

	@media (max-height: 754px) {
		font-size: 36px;
	}
`

export const CoinName = styled.div<{ unit?: string }>`
	font-family: var(--font-nosifer);
	font-size: 38px;
	font-weight: 600;
	letter-spacing: 7.1px;
	line-height: 62px;
	text-align: center;
	${bluePurpleTextGradient}

	@media (max-height: 931px) {
		font-size: 28px;
	}
`
export const CoinFrame = styled.div``
