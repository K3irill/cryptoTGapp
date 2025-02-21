import { COLORS } from '@/constants/colors'
import styled from 'styled-components'

export const HomeBannerStyled = styled.div`
	display: flex;
	flex-direction: column;
	background: url('./top-border.svg') no-repeat;
	background-size: cover;
	padding: 16px 0;
	width: 100%;
	p {
		text-align: center;
		font-size: 26px;
	}
	span {
		color: ${COLORS.gold};
	}
`
