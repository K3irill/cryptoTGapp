import { shinyBlueBackground } from '@/styles/mixins'
import styled from 'styled-components'

export const NavBlockStyled = styled.div`
	height: 82px;
	width: 100%;
	background: url('/back-black.png') no-repeat;
	background-size: cover;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: relative;
	z-index: 7;
`

export const NavTitleStyled = styled.p`
	font-size: 14px;
	font-family: var(--font-monoton);
	background: linear-gradient(180deg, #f0c777 24.48%, #10151a 76.56%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;

	@media (min-width: 768px) {
		font-size: 24px;
	}
`
export const FooterBtn = styled.div<{ active?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	${shinyBlueBackground}
	cursor: pointer;
	transition: all 1s;

	span {
		transition: all 1s;
		display: inline-block;
		width: 5px;
		height: 25px;
		background: #fff;
		border: 1px solid #fff;
		box-shadow: 1px 0px 5px #fff;
		border-radius: 5px;
		transform: rotate(-45deg);
	}
	& span:first-child {
		transform: ${p =>
			p.active
				? `rotate(-39deg) translate(-5px)`
				: `rotate(39deg) translate(-5px)`};
	}
	& span:last-child {
		transform: ${p =>
			p.active
				? `rotate(39deg) translate(5px)`
				: `rotate(-39deg) translate(5px)`};
	}
`
export const Lock = styled.img`
	position: absolute;
	object-fit: cover;
`
