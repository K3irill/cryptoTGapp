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
	background: url('./frame.svg') 49.3% 46.5%, url('./background.svg') 50% 50%;
	background-repeat: no-repeat;

	@media (max-width: 530px) {
		background: url('./frame.svg') 48% 46.5%, url('./background.svg') 50% 50%;
		background-repeat: no-repeat;
	}
	@media (max-width: 430px) {
		background: url('./frame.svg') 42% 46.5%, url('./background.svg') 50% 50%;
		background-repeat: no-repeat;
	}
	@media (max-width: 349px) {
		background: url('./frame.svg') 56% 46.5%, url('./background.svg') 50% 50%;
		background-repeat: no-repeat;
	}
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
	font-size: 36px;
	font-weight: 600;
	letter-spacing: 7.1px;
	line-height: 62px;
	position: absolute;
	bottom: 10px;
	background: linear-gradient(
			224.54deg,
			#c49337 10.03%,
			#fcf7cd 31.51%,
			#edcd78 48.7%,
			#a7602b 59.25%,
			#fdf8d0 74.48%,
			#bb9138 88.16%
		),
		linear-gradient(
			135.34deg,
			#8c421d 15.43%,
			#fbe67b 38.47%,
			#fcfbe7 53.36%,
			#f7d14e 69.97%,
			#d4a041 86.26%
		),
		linear-gradient(
			137.14deg,
			#cce8fe 17.58%,
			#cda0ff 34.64%,
			#8489f5 45.84%,
			#cdf1ff 67.97%,
			#b591e9 88.23%
		),
		linear-gradient(46.58deg, #33cdff 25.15%, #f2fe08 53.06%, #f5fdff 86.95%),
		#ffffff;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;

	&::after {
		position: absolute;
		content: '${props => props.unit || 'P'}';
		right: -40px;
		background: linear-gradient(
				224.54deg,
				#c49337 10.03%,
				#fcf7cd 31.51%,
				#edcd78 48.7%,
				#a7602b 59.25%,
				#fdf8d0 74.48%,
				#bb9138 88.16%
			),
			linear-gradient(
				135.34deg,
				#8c421d 15.43%,
				#fbe67b 38.47%,
				#fcfbe7 53.36%,
				#f7d14e 69.97%,
				#d4a041 86.26%
			),
			linear-gradient(
				137.14deg,
				#cce8fe 17.58%,
				#cda0ff 34.64%,
				#8489f5 45.84%,
				#cdf1ff 67.97%,
				#b591e9 88.23%
			),
			linear-gradient(46.58deg, #33cdff 25.15%, #f2fe08 53.06%, #f5fdff 86.95%),
			#ffffff;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}
`
export const CoinFrame = styled.div``
