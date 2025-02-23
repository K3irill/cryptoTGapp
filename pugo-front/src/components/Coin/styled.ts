import styled from 'styled-components'
export const CoinStyled = styled.div<{
	$rotateX: number
	$rotateY: number
	$scale: number
}>`
	position: relative;
	top: 5px;
	right: -2px;
	width: 160px;
	height: 160px;
	transition: transform 0.3s ease-out, scale 0.1s ease-in-out;
	transform: perspective(500px) rotateX(${props => props.$rotateX}deg)
		rotateY(${props => props.$rotateY}deg) scale(${props => props.$scale});

	img {
		width: 100%;
		height: 100%;
	}
`

export const CoinFrame = styled.div`
	position: relative;
	width: 370px;
	height: 290px;
	display: flex;
	align-items: center;
	justify-content: center;
`
export const ImgFrame = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`
