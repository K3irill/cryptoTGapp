import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { ShinyButtonStyledProps } from './ShinyButton.d'
import { goldenTextGradient, yellowTextGradient } from '@/styles/mixins'
import { goldenShine } from '@/styles/effects'

export const ButtonStyled = styled.button<ShinyButtonStyledProps>`
	width: 100%;
	padding: 0px;
	text-align: center;
	font-size: 19px;
	display: flex;
	flex-direction: column;
  align-items: center;
  justify-content: center;
 
	transition: background-color 0.3s ease, color 0.3s ease,
		border-color 0.3s ease;
	border-top: 1px solid #ded8b995;
	cursor: pointer;
  width: fit-content;
  padding: 5px 10px 5px 30px;
	background: #1f1f1f;
	box-shadow: 0px 1.66052px 0px #000000;
	border-radius: 4150.88px;
  position: relative;
  z-index: 2;

  &::before{
    position: absolute;
    content: url('/icons/gold-star.svg');
    left: 8px;
  }
	p {
		${goldenTextGradient}
		font-size: 10px;
    line-heightL 120%;
	}
	span {
		${yellowTextGradient}
		font-size: 6px;
	}

 
`
export const BackgroundImg = styled.img`
	position: absolute;
	z-index: 0;
	right: -5%;
`
export const ButtonWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
