import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { ButtonStyledProps } from './Button.d'

export const ButtonStyled = styled.a<ButtonStyledProps>`
	width: 100%;
	padding: 10px;
	text-align: center;
	font-size: 19px;
	border-radius: 9px;
	font-weight: 900;
	transition: background-color 0.3s ease, color 0.3s ease,
		border-color 0.3s ease;
	border: 1px solid transparent;
	cursor: pointer;

	${p =>
		p.theme === 'fill'
			? `
      background: linear-gradient(90deg, #F0C877 0%, #F9DC76 50%, #FDCB6A 100%);
      color: #000;

      @media (hover: hover) and (pointer: fine) {
		    &:hover {
          &:hover {
          border-color: #151514;
      }
  }
    `
			: p.theme === 'transparent'
			? `
      background: transparent;
      color: ${COLORS.gold};
      border-color: ${COLORS.gold};

      @media (hover: hover) and (pointer: fine) {
		    &:hover {
          &:hover {
            background-color: #F0C877; 
            color: #000;
      }
  }
    `
			: ''}
`
