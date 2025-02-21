import { COLORS } from '@/constants/colors'
import styled from 'styled-components'
import { ButtonStyledProps } from './Button.d'

export const ButtonStyled = styled.a<ButtonStyledProps>`
	width: 100%;
	padding: 10px;
	text-align: center;
	font-size: 19px;
	border-radius: 9px;

	${p =>
		p.theme === 'fill'
			? `
      background: 	 linear-gradient(90deg, #F0C877 0%, #F9DC76 50%, #FDCB6A 100%);
      color: #000;
    `
			: p.theme === 'transparent'
			? `background: transparent;
    color: ${COLORS.gold};
      border: 1px solid ${COLORS.gold};
    `
			: ''}
`
