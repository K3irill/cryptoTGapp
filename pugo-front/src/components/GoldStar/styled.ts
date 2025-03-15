import styled from 'styled-components'
import { GoldStarStyledProps } from './GoldStar.d'
import { goldenShine } from '@/styles/effects'

export const StarsWrapperStyled = styled.div`
	display: flex;
	position: relative;
	width: 100%;
`

export const GoldStarStyled = styled.img<GoldStarStyledProps>`
	position: relative;
	width: 25px;
	height: 25px;

	left: -${props => (props.index !== 0 ? 21 * props.index : 0)}px;

	z-index: ${props => 10 - props.index};
`
