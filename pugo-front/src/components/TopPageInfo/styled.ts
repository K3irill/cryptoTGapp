import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { TopPageInfoStyledProps } from './TopPageInfo.d'

export const TopPageStyled = styled.div`
	width: 100%;
	position: relative;
`

export const ButtonBackStyled = styled.a`
	cursor: pointer;
	display: inline-block;
	background-color: ${COLORS.gold};
	width: 24px;
	height: 24px;
	border-radius: 50%;
`

export const BorderTopWrapper = styled.div`
	position: absolute;
	width: 100%;
`

export const BorderTopStyled = styled.img`
	width: 100%;
	height: 100%;
`
export const TopInfoWrapperStyled = styled.div`
	position: relative;
	z-index: 2;
	padding: 25px 30px 0px 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (min-width: 460px) {
		padding: 30px 50px 0px 50px;
	}

	@media (min-width: 520px) {
		padding: 40px 50px 0px 50px;
	}

	@media (min-width: 720px) {
		padding: 50px 50px 0px 50px;
	}
`

export const NamePage = styled.div<TopPageInfoStyledProps>`
	${p =>
		p.withBorder &&
		`
  border: 1px solid ${COLORS.gold};
  border-radius: 15px;`}
	text-align: center;
	padding: 7px 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 7px;

	p {
		font-size: 16px;
		color: ${COLORS.gold};
		text-transform: uppercase;
		font-weight: 800;

		@media (min-width: 460px) {
			font-size: 24px;
		}
	}
`

export const StarWrapper = styled.div`
	width: 25px;
	height: auto;
`
