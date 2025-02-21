import styled from 'styled-components'

export const HomeStyled = styled.div`
	display: flex;
	flex-direction: column;

	flex-grow: 1;
	height: 100%;
`
export const BannerStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	padding: 0 8px;
	margin-top: 10px;
`

export const CoinSection = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex: 1 0;
	position: relative;
	background-image: url('./background.svg');
	background-repeat: no-repeat;
	background-position: center center;
`

// export const CoinCountWrapper = styled.div`
// 	margin-top: 20px;
// 	display: flex;
// 	width: 100%;
// 	justify-content: center;
// 	font-size: 56px;
// 	letter-spacing: 7.1px;
// 	line-height: 62px;
// 	// flex: 1 0;
// `

export const CoinCount = styled.div<{ unit?: string }>`
	font-size: 56px;
	letter-spacing: 7.1px;
	line-height: 62px;
	position: absolute;
	bottom: 10px;
	background: linear-gradient(90deg, #f0c877 0%, #f9dc76 50%, #fdcb6a 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;

	&::after {
		position: absolute;
		content: '${props => props.unit || 'P'}';
		right: -30px;
		background: linear-gradient(90deg, #f0c877 0%, #f9dc76 50%, #fdcb6a 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}
`
