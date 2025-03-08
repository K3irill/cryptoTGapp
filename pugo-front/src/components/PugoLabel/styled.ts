import styled, { css } from 'styled-components'
import { goldenGradient, goldenShine } from '@/styles/effects'
import {
	goldenBackground,
	bronzeBackground,
	purpleBackground,
} from '@/styles/mixins'

interface LabelStyledProps {
	radius?: string
	color?: string
	theme?: string
	href?: string
	target?: string
}

export const LabelStyled = styled.div.attrs<LabelStyledProps>(({ href }) => ({
	as: href ? 'a' : 'div',
}))<LabelStyledProps>`
	${p =>
		p.theme === 'received'
			? `${bronzeBackground}`
			: p.theme === 'pending'
			? css`
					${purpleBackground}
					${goldenShine}
			  `
			: css`
					${goldenShine}
					${goldenBackground}
			  `}

	border-radius: ${p => (p.radius ? p.radius : '10px')};
	height: 18px;
	display: flex;
	padding: 0px 10px;
	align-items: center;
	position: relative;
	overflow: hidden;
	text-align: center;
	justify-content: center;

	span {
		display: inline-block;
		line-height: 10px;
		font-size: 8px;
		color: #000;
		font-weight: 900;

		@media (min-width: 460px) {
			font-size: 12px;
		}
	}
`
