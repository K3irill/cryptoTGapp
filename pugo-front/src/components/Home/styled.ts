import { goldenTextGradient } from '@/styles/mixins'
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
	${goldenTextGradient};

	&::after {
		position: absolute;
		content: '${props => props.unit || 'P'}';
		right: -40px;
		${goldenTextGradient};
	}
`
export const CoinFrame = styled.div``
