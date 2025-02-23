import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { MulticolouredButtonStyledProps } from './MulticolouredButton.d'

export const ButtonStyled = styled.a<MulticolouredButtonStyledProps>`
	width: 100%;
	text-align: center;
	font-size: 12px;
	font-weight: 900;
	transition: background-color 0.3s ease, color 0.3s ease,
		border-color 0.3s ease;
	border: 1px solid transparent;
	cursor: pointer;
	padding: 12px 15px;
	background: linear-gradient(90deg, #77f0d8 0%, #c976f9 50%, #fdcb6a 100%);
	border-radius: 25px;
	text-wrap: nowrap;
	position: relative;

	span {
		position: absolute;
		right: 35px;
	}
`
