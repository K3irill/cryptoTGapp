import styled, { css } from 'styled-components'
import { goldenGradient, goldenShine } from '@/styles/effects'
import {
	goldenBackground,
	bronzeBackground,
	purpleBackground,
	blueGradientBackground,
	bluePurpleTextGradient,
} from '@/styles/mixins'

interface LabelStyledProps {
	title?: string
	size?: string
	isInline?: boolean
}

export const LabelStyled = styled.p<LabelStyledProps>`
	${p => p.isInline && 'display: inline;'}

	font-family: var(--font-iceberg);
	font-style: normal;
	font-weight: 400;
	font-size: ${p => (p.size ? `${p.size}` : '24px')};
	line-height: 100%;
	${bluePurpleTextGradient}
`
