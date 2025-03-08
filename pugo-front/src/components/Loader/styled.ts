import { COLORS } from '@/styles/colors'
import styled, { keyframes } from 'styled-components'

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const LoaderContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`
export const LoaderWrap = styled.div`
	background: url('/coin.svg');
	background-size: cover;
`
export const LoaderSpinner = styled.div`
	border: 4px solid #8d531000;
	border-top: 4px solid ${COLORS.gold};
	border-radius: 50%;
	width: 75px;
	height: 75px;
	animation: ${spin} 1s linear infinite;
`
