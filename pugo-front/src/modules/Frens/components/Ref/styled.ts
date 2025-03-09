import { COLORS } from '@/styles/colors'
import { goldenTextGradientV2, silverTextGradient } from '@/styles/mixins'
import styled from 'styled-components'

export const RefContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid ${COLORS.grey};
	padding: 0px 8px;
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
