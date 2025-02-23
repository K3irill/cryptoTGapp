import styled from 'styled-components'

export const NavBlockStyled = styled.div`
	height: 56px;
	width: 100%;
	background: rgba(27, 28, 30, 0.46);
	border: 1.53697px solid #f0c777;
	box-shadow: 0px 0px 6.1479px #f0c777;
	border-radius: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
