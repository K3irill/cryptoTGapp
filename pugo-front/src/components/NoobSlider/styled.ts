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
	background: url('/backgrounds/space-stars.gif'),
		radial-gradient(
				42.85% 184.29% at 15.34% 39.06%,
				rgba(131, 113, 243, 0.2) 0%,
				rgba(69, 156, 236, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				130.16% 129.69% at 63.64% -12.5%,
				rgba(133, 40, 251, 0.3) 0%,
				rgba(86, 84, 74, 0.036) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				80.68% 51.24% at 19.32% 40.62%,
				rgba(24, 100, 183, 0.3) 0%,
				rgba(23, 61, 102, 0.264) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		radial-gradient(
				28.98% 110.94% at 43.75% -31.25%,
				rgba(24, 17, 24, 0.53) 21.25%,
				#000000 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		rgba(3, 3, 3, 0.3);
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
