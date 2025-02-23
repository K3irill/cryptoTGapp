import styled from 'styled-components'
export const CoinStyled = styled.div<{
	$rotateX: number
	$rotateY: number
	$scale: number
}>`
	width: 163.68px;
	height: 157.68px;
	transition: transform 0.3s ease-out, scale 0.1s ease-in-out;
	transform: perspective(500px) rotateX(${props => props.$rotateX}deg)
		rotateY(${props => props.$rotateY}deg) scale(${props => props.$scale});

	img {
		width: 100%;
		height: 100%;
	}
`
