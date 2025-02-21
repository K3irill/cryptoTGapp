import styled from 'styled-components'

interface NavElementStyledProps {
	width?: string
	height?: string
	background?: string
}

export const NavElement = styled.a<NavElementStyledProps>`
	width: ${p => p.width || '64px'};
	height: ${p => p.height || '64px'};
	background: ${p =>
		p.background === 'light-grey'
			? `radial-gradient(55.5% 55.5% at 50% 50%, #282828 5%, #282828 50%, #161616 100%)`
			: p.background
			? p.background
			: `radial-gradient(47.61% 47.61% at 49.12% 57.89%, #242320 50%, #161615 100%)`};
	${p => p.background === 'transparent' && `background: transparent`}
	box-shadow: 0px 0px 6.1479px #f0c777;
	border: 1px solid #f0c777;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`
