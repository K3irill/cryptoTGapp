import { COLORS } from '@/styles/colors'
import {
	goldenTextGradient,
	goldenTextGradientV2,
	mainBlockBackground,
} from '@/styles/mixins'
import styled, { css } from 'styled-components'

export const TasksStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 12px;
	overflow-y: auto;
	max-height: calc(100vh - 170px);
	padding-bottom: 8px;
	position: relative;
	z-index: 2;
	::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
	scrollbar-color: transparent transparent;
`

export const TextStyled = styled.h2`
	font-weight: bold;
	font-size: 12px;
	color: ${COLORS.grey};
`

export const TasksBlock = styled.div``
export const Tasks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`
export const CompletedTasks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`
export const AvailableTasks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`
export const Column = styled.div<{ withOpacity?: boolean; isOpen?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
	transition: all 0.4s;

	${p =>
		p.isOpen
			? css`
					max-height: 2000px;
					height: 100%;
			  `
			: css`
					max-height: 0;
					height: 0px;
			  `}
	${p => p.withOpacity && 'opacity: 0.6'}
`

export const AccordionTop = styled.div<{ isOpen?: boolean }>`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
  align-items: center;
	gap: 10px;

  img{
  transition: all 0.4s;
  ${p => (p.isOpen ? `transform: rotate(0)` : `transform: rotate(180deg)`)}
`
