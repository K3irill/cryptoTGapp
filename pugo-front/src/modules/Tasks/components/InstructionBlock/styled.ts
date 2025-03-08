import { COLORS } from '@/styles/colors'
import { mainBlockBackground } from '@/styles/mixins'
import styled from 'styled-components'

export const InstructionBlockStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin: 10px 0;
`
export const InstructionStyled = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`

export const InstructionItem = styled.div`
	${mainBlockBackground}
	width: 69px;
	height: 69px;
	flex-shrink: 0;
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

export const IconWrapper = styled.div`
	max-width: 71px;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const ArrowIcon = styled.img`
	width: 100%;
`
