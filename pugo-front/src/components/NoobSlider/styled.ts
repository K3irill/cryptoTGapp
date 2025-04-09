import { COLORS } from '@/styles/colors'
import { goldenShine } from '@/styles/effects'
import {
	bluePurpleTextGradient,
	goldenTextGradient,
	goldenTextGradientV2,
	purpleTextGradient,
	silverTextGradient,
} from '@/styles/mixins'
import styled from 'styled-components'

export const NoobSliderStyled = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`

export const NoobSlide = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px 15px;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	width: 100%;
	height: 100vh;
	color: white;
	background-position: cover;
`
export const SlideTitle = styled.div`
	font-weight: 800;
	font-size: 28px;
	line-height: 36px;
	text-align: center;

	background: linear-gradient(90deg, #ffffff 0%, #7287b4 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`
export const SlideBanner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
export const SlideImage = styled.img`
	height: 305px;
`
export const SlideTokenName = styled.div`
	font-family: var(--font-nosifer);
	font-size: 42px;
	font-weight: 900;
	letter-spacing: 7.1px;
	line-height: 62px;
	position: relative;
	top: -30px;
	${bluePurpleTextGradient}

	@media (max-height: 931px) {
		font-size: 28px;
	}
`
export const SlideText = styled.div`
	font-weight: 800;
	font-size: 16px;
	line-height: 19px;
	text-align: center;

	background: linear-gradient(244.51deg, #ffffff 5.3%, #8072b4 66.87%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	flex: 1 1;
`
export const SlideButtons = styled.div`
	display: flex;
	margin-top: 15px;
	align-items: center;
	gap: 15px;
	justify-content: space-between;
`
