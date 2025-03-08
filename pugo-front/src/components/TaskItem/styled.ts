import { COLORS } from '@/styles/colors'
import {
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
} from '@/styles/mixins'
import styled from 'styled-components'

export const TaskItemContainer = styled.div`
	width: 100%;
	padding: 7px 18px;
	display: grid;
	align-items: center;
	grid-template-columns: 25px 1fr 88px;
	gap: 7px;

	${mainBlockBackground}
`
export const IconWrapper = styled.div``

export const Description = styled.div`
	${goldenTextGradientV2}
	font-size: 14px;
	line-height: 14px;
	font-weight: bold;
`
export const Reward = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	padding: 4px 7px;
	border: 1px solid ${COLORS.gold};
	${goldenTextGradient}
	font-size: 13px;
	line-height: 14px;
	font-weight: bold;
`
export const Status = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`
