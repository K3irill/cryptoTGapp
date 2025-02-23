import { COLORS } from '@/assets/constants/colors'
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
	background: ${p =>
			p.page === '/'
				? `url('./home-border.svg')`
				: `url('./another-border.svg')`}
		no-repeat;
	background-size: contain;
	width: 100%;
	height: 52px;
`
