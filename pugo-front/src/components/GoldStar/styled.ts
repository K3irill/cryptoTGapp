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
	width: 100%;
	height: 100%;
	margin-left: -${props => (props.index !== 0 ? 15 : 0)}px;

	z-index: ${props => 10 - props.index};
`
