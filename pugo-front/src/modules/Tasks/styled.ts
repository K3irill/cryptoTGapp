import { COLORS } from '@/styles/colors'
import {
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
} from '@/styles/mixins'
import styled from 'styled-components'

export const TasksStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 12px;
	overflow-y: auto;
	max-height: calc(100vh - 265px);
	padding-bottom: 8px;

	::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
	scrollbar-color: transparent transparent;
`

export const InstructionBlock = styled.div`
	margin-top: 24px;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	padding: 10px;
`

export const InstructionItem = styled.div`
	${mainBlockBackground}
	width: 69px;
	height: 69px;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		transition: 0.5s all;
	}

	&:hover {
		img {
			transition: 0.5s all;
			filter: drop-shadow(0px 0px 10px ${COLORS.gold});
		}
	}
`
export const ArrowIcon = styled.img``
