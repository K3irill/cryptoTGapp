import { goldenGradient, goldenShine } from '@/styles/effects'
import { goldenBackground } from '@/styles/mixins'
import styled from 'styled-components'

export const LabelStyled = styled.div`
	${goldenShine};
	${goldenBackground};
	border-radius: 10px;
	height: 18px;
	display: flex;
	padding: 0px 10px;
	align-items: center;
	position: relative;
	overflow: hidden;

	span {
		display: inline-block;
		line-height: 10px;
		font-size: 8px;
		color: #000;
		font-weight: 900;

		@media (min-width: 460px) {
			font-size: 12px;
		}
	}
`
