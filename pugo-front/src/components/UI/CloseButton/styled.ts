import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { CloseButtonStyledProps } from './CloseButton.d'
import {
	blueGradientBackground,
	pinkOrangeGradientBackground,
} from '@/styles/mixins'

export const ButtonStyled = styled.button<CloseButtonStyledProps>`
	text-align: center;
	font-size: 12px;
	font-weight: 900;
	transition: background-color 0.3s ease, color 0.3s ease,
		border-color 0.3s ease;
	border: 1px solid transparent;
	cursor: pointer;
	width: 25px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	text-wrap: nowrap;
	position: relative;
	${blueGradientBackground}

	span {
		position: absolute;
		right: 35px;
	}
`
