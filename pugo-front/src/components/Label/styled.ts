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
}

export const LabelStyled = styled.div<LabelStyledProps>`
	font-family: var(--font-inspiration);
	font-style: normal;
	font-weight: 400;
	font-size: ${p => (p.size ? `${p.size}` : '24px')};
	line-height: 100%;
	${bluePurpleTextGradient}
`
