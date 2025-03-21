import { COLORS } from '@/styles/colors'
import {
	goldenBackground,
	purpleBackground,
	redGradientBackground,
} from '@/styles/mixins'
import styled from 'styled-components'

export const ErrorContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`
export const ErrorText = styled.div``
export const ErrorContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 7px;
`
export const ErrorButton = styled.button`
	padding: 5px 7px;
	border-radius: 5px;
	font-weight: bold;

	${redGradientBackground}
`
