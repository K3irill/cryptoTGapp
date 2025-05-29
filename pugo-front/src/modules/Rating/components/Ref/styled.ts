import { COLORS } from '@/styles/colors'
import {
	bluePurpleTextGradient,
	blueTextGradient,
	goldenTextGradientV2,
	silverTextGradient,
} from '@/styles/mixins'
import styled from 'styled-components'

export const RefContainer = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border-top: 1px solid #3c3b3b8b;
	padding: 5px 0px;
`
export const RefName = styled.div`
	font-size: 16px;

	color: ${COLORS.grey};
`
export const RefTokens = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	font-size: 20px;
	font-weight: bold;
	font-family: var(--font-inclusive-sans);
	${blueTextGradient};
`
