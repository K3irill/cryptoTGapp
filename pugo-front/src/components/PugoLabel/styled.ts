import styled, { css } from 'styled-components'
import { goldenGradient, goldenShine } from '@/styles/effects'
import {
	goldenBackground,
	bronzeBackground,
	purpleBackground,
	blueGradientBackground,
} from '@/styles/mixins'

interface LabelStyledProps {
	radius?: string
	color?: string
	theme?: string
	href?: string
	target?: string
	height?: string
	fontSize?: string
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
					${blueGradientBackground}
			  `}

	border-radius: ${p => (p.radius ? p.radius : '10px')};
	height: ${p => (p.height ? p.height : '18px')};
	display: flex;
	padding: 0px 10px;
	align-items: center;
	position: relative;
	overflow: hidden;
	text-align: center;
	justify-content: center;
	cursor: ${p => (p.onClick ? 'pointer' : 'default')};

	span {
		display: inline-block;
		line-height: 10px;
		font-size: ${p => (p.fontSize ? `${p.fontSize};` : '8px;')}
		color: #000;
		font-weight: 900;

		@media (min-width: 460px) {
			font-size: 12px;
		}
	}
`
