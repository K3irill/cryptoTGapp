import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { ShinyButtonStyledProps } from './ShinyButton.d'
import {
	bluePurpleTextGradient,
	blueTextGradient,
	goldenTextGradient,
	yellowTextGradient,
} from '@/styles/mixins'
import { goldenShine } from '@/styles/effects'

export const ButtonStyled = styled.button<ShinyButtonStyledProps>`
	width: 100%;
	padding: 0px;
	text-align: center;
	font-size: 22px;
	display: flex;
	flex-direction: column;
  align-items: center;
  justify-content: center;

	transition: background-color 0.3s ease, color 0.3s ease,
		border-color 0.3s ease;

	cursor: pointer;
  width: fit-content;
  padding: 7px 15px 7px 30px;


  position: relative;
  z-index: 2;


background: radial-gradient(42.85% 184.29% at 15.34% 39.06%, rgba(131, 113, 243, 0.5) 0%, rgba(69, 156, 236, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(130.16% 129.69% at 63.64% -12.5%, #8528FB 0%, rgba(86, 84, 74, 0.12) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(80.68% 51.24% at 19.32% 40.62%, #1864B7 0%, rgba(23, 61, 102, 0.88) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(28.98% 110.94% at 43.75% -31.25%, rgba(24, 17, 24, 0.53) 21.25%, #000000 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #030303;
box-shadow: 0px 5px 30px rgba(64, 100, 228, 0.3), -20px -20px 50px rgba(42, 94, 142, 0.5), 10px 20px 80px rgba(122, 33, 237, 0.3), inset 0px 0px 30px rgba(255, 255, 255, 0.3);
border-radius: 35px;

  &::before{
    position: absolute;
    content: '';
    width: 18px;
    height: 18px;
    display: inline-block;
    background: url('/icons/gold-star.svg') ;
    background-size: cover;
    left: 8px;
 
   
  }
	p {
		
    color: ${COLORS.whity};
		font-size: 12px;
    line-heightL 120%;
    font-weight: 900;
	}
	span {
		${blueTextGradient};
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
