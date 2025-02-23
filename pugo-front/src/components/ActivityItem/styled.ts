import { COLORS } from '@/styles/colors'
import { goldenShine } from '@/styles/effects'
import {
	goldenTextGradient,
	goldenTextGradientV2,
	purpleTextGradient,
	silverTextGradient,
} from '@/styles/mixins'
import styled from 'styled-components'

export const ActivityStyled = styled.div`
	width: 100%;
	padding: 16px;
	border-radius: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	border-top: 1px solid rgba(105, 106, 110, 0.5);
`

export const ActivityWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
`

export const ActivityIconWrapper = styled.div`
	width: 40px;
	height: 40px;
	border: 2px solid rgba(255, 255, 255, 0.2);
	border-radius: 50%;
`

export const ActivityIconStyled = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

export const ActivityInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const ActivityOption = styled.div`
	font-size: 14px;
	font-weight: 600;
	${goldenTextGradient};

	@media (min-width: 460px) {
		font-size: 16px;
	}
`

export const NumberWallet = styled.div`
	font-size: 16px;
	font-weight: 900;
	${silverTextGradient};

	@media (min-width: 460px) {
		font-size: 22px;
	}
`

export const ActivityAmount = styled.div`
	p {
		${purpleTextGradient};
		font-size: 16px;
		font-weight: 600;

		@media (min-width: 460px) {
			font-size: 24px;
		}
	}
`
export const TokenName = styled.div`
	font-weight: 900;
	color: #ff79c6;
	text-align: end;
	font-size: 10px;

	@media (min-width: 460px) {
		font-size: 18px;
	}
`
