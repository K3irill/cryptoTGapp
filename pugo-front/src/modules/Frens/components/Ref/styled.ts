import { COLORS } from '@/styles/colors'
import { goldenTextGradientV2, silverTextGradient } from '@/styles/mixins'
import styled from 'styled-components'

export const RefContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border-top: 1px solid #3c3b3b8b;
	padding: 5px 0px;
`
export const RefName = styled.div`
	font-size: 16px;

	${silverTextGradient}
`
export const RefTokens = styled.div`
	font-size: 18px;
	font-weight: bold;
	${goldenTextGradientV2}
`
