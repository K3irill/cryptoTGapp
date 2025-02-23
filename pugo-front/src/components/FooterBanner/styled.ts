import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { FooterBannerStyledProps } from './FooterBanner.d'

export const FooterBannerStyled = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	p {
		text-align: center;
		font-size: 26px;
	}
	span {
		color: ${COLORS.gold};
	}
`

export const FooterBorder = styled.div<FooterBannerStyledProps>`
	width: 100%;
	height: 52px;

	img {
		width: 100%;
		// height: 100%;
	}
`
