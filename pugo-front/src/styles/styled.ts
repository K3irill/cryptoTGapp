import styled from 'styled-components'
import {
	blueTextGradient,
	goldenTextGradient,
	goldenTextGradientV2,
	purpleTextGradient,
	silverTextGradient,
	silverMainTextGradient,
} from './mixins'
import { COLORS } from '@/styles/colors'
export const Container = styled.div`
	padding: 0 8px;
`
export const SvgIconStyled = styled.img`
	max-width: 50px;
	max-height: 50px;
`
export const Notify = styled.div`
	display: flex;
	gap: 5px;

	a {
		font-size: 16px;
		font-weight: 900;
	}
`
export const Headline = styled.div<{
	size?: number
	theme?: 'blue' | 'purple' | 'silver' | 'whity' | 'goldV1'
}>`
	font-size: ${p => (p.size ? p.size : '28px')};

	text-align: center;
	font-weight: bold;
	margin: 10px 0;

	${p =>
		p.theme === 'blue'
			? `${blueTextGradient}`
			: p.theme === 'purple'
			? `${purpleTextGradient}`
			: p.theme === 'whity'
			? `color: ${COLORS.whity}`
			: p.theme === 'silver'
			? `${silverTextGradient}`
			: p.theme === 'goldV1'
			? `${goldenTextGradient}`
			: `${silverMainTextGradient}`}
`
export const ShineBottomRightElem = styled.img`
	position: absolute;
	bottom: 0;
	right: -20%;
	z-index: 1;
`
export const ShineTopLeftElem = styled.img`
	position: absolute;
	top: -25%;
	left: -25%;
`
