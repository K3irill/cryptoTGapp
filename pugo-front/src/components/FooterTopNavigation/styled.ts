import styled from 'styled-components'

export const NavigationStyled = styled.div<{ isOpen?: boolean }>`
	display: flex;
	justify-content: space-around;
	border-top-left-radius: 38px;
	border-top-right-radius: 38px;
	margin-bottom: -115px;
	padding: 40px 5px 35px;
	background: url('/topnavfooterbac.png') no-repeat;
	background-size: 100%;
	position: absolute;
	width: 100%;
	z-index: 5;
	transition: all 1s;
	height: 280px;

	p {
		transition: all 1s;
	}

	${p =>
		p.isOpen
			? `
    bottom: 6%;
    	
    `
			: '	bottom: -7%;'};

	@media (max-height: 900px) {
		margin-bottom: -120px;
	}

	@media (max-height: 831px) {
		padding: 30px 5px 30px;
		height: 260px;
		margin-bottom: -105px;
	}

	@media (max-height: 754px) {
		padding: 30px 5px 30px;
		height: 260px;
		margin-bottom: -110px;
	}

	@media (max-height: 670px) {
		margin-bottom: -118px;
		${p =>
			p.isOpen
				? `
      bottom: 9%;
        
      `
				: '	bottom: -7%;'};
	}
`

export const Title = styled.p<{
	opacity?: boolean
	size?: string
	top?: string
}>`
	transition: all 1s;
	position: absolute;
	top:  ${p => (p.top ? `${p.top};` : `110%;`)}
	color: #fff;
  font-size: ${p => (p.size ? `${p.size};` : `12px;`)}
	${p =>
		p.opacity
			? `
    opacity: 1;`
			: 'opacity:0;'};
`
