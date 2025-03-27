import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { MulticolouredButtonStyledProps } from './MulticolouredButton.d'
import {
	pinkOrangeGradientBackground,
	blueGradientBackground,
	redOrangeTextGradient,
} from '@/styles/mixins'

export const ButtonStyled = styled.a<MulticolouredButtonStyledProps>`
	width: 100%;
	text-align: center;
	font-size: 12px;
	font-weight: 900;
	transition: background-color 0.3s ease, color 0.3s ease,
		border-color 0.3s ease;
	border: 1px solid transparent;
	cursor: pointer;
	padding: 8px 10px;
	${p =>
		p.theme === 'blue'
			? `${blueGradientBackground};`
			: p.theme === 'red'
			? `${redOrangeTextGradient}`
			: `	${pinkOrangeGradientBackground};`}

	border-radius: 10px;
	text-wrap: nowrap;
	position: relative;

	span {
		position: absolute;
		right: 35px;
	}
`
