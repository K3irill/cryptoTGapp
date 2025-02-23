import { COLORS } from '@/styles/colors'
import { goldenShine } from '@/styles/effects'
import {
	goldenTextGradient,
	goldenTextGradientV2,
	purpleTextGradient,
} from '@/styles/mixins'
import styled from 'styled-components'

export const UserBankStyled = styled.div`
	width: 100%;
	padding: 16px;
	border-radius: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`

export const UserWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
`

export const UserAvatarWrapper = styled.div`
	width: 40px;
	height: 40px;
	border: 2px solid rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	overflow: hidden;
`

export const UserAvatarStyled = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const UserNameStyled = styled.span`
	font-size: 14px;
	font-weight: 600;
	color: ${COLORS.grey};

	@media (min-width: 460px) {
		font-size: 16px;
	}
`

export const UserTokenCountStyled = styled.div`
	display: flex;
	gap: 5px;
	p {
		${purpleTextGradient};
		font-size: 16px;
		font-weight: 600;

		@media (min-width: 460px) {
			font-size: 24px;
		}
	}

	span {
		font-weight: 700;
		color: #ff79c6;
		font-size: 10px;

		@media (min-width: 460px) {
			font-size: 16px;
		}
	}
`

export const UserCountInDollars = styled.div`
	font-size: 16px;
	font-weight: 900;
	${goldenTextGradient};
	padding-right: 15px;

	@media (min-width: 460px) {
		font-size: 24px;
	}
`
