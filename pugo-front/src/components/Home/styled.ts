import styled from 'styled-components'

export const HomeStyled = styled.div`
	display: flex;
	flex-direction: column;

	background-image: url('./background.svg');
	background-repeat: no-repeat;
	background-position: center 0%;

	flex-grow: 1;
	height: 100%;
`
export const BannerStyled = styled.div`
	display: flex;
	width: 100%;
	height: 56px;
	justify-content: center;
	align-items: center;
	background: #000000aa;
	margin-top: 10px;
`
export const CoinStyled = styled.div`
	width: 268px;
	height: 268px;
	img {
		width: 100%;
		height: 100%;
	}
`

export const CoinSection = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;

	margin-top: 90px;
`

export const CoinCountWrapper = styled.div`
	margin-top: 20px;
	display: flex;
	width: 100%;
	justify-content: center;
	font-size: 56px;
	letter-spacing: 7.1px;
	line-height: 62px;
	flex: 1 0;
`

export const CoinCount = styled.div`
	font-size: 56px;
	letter-spacing: 7.1px;
	line-height: 62px;

	position: relative;
	&::after {
		position: absolute;
		content: 'P';
		right: -30px;
	}
`
