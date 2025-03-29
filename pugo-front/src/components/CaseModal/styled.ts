import { COLORS } from '@/styles/colors'
import {
	bluePurpleTextGradient,
	pinkBlueGradientBackground,
	yellowGradientBackground,
	greenGradientBackground,
} from '@/styles/mixins'
import styled from 'styled-components'

export const CaseModalStyled = styled.div<{ theme: string }>`
	display: flex;
	flex-direction: column;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	height: 70vh;
	overflow: hidden;
	border-radius: 14px;
	z-index: 10;
	${p =>
		p.theme === 'coins'
			? `background: url(/backgrounds/stars.png), url(/backgrounds/purple-panet.png),
		${pinkBlueGradientBackground};`
			: p.theme === 'days'
			? `background: url(/backgrounds/stars.png), url(/backgrounds/yellow-panet.png),
		${yellowGradientBackground};`
			: p.theme === 'privileges'
			? `background: url(/backgrounds/stars.png), url(/backgrounds/green-panet.png),
		${greenGradientBackground};`
			: ''};

	background-size: cover;

	max-width: 748px;
	width: 100%;
	margin: 0 auto;
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 19;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	padding-bottom: 25px;
	height: 100%;
	& a {
		margin-top: 15px;
	}
`
export const CloseButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 15px;
	top: 15px;
	z-index: 20;
`
export const CaseInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
	margin-bottom: 10px;
`

export const CaseModalTitle = styled.div`
	font-weight: 600;
	letter-spacing: 7.1px;
	padding: 15px;
	text-align: center;

	h2 {
		color: ${COLORS.ice};
		text-shadow: 0px 0px 8px #0000003f;
		font-size: 12px;
	}

	p {
		text-shadow: 0px 0px 8px #83006627;
		font-size: 20px;
		font-family: var(--font-nosifer);
		line-height: 145%;
		${bluePurpleTextGradient};
	}
`

export const CasePreviewWrapper = styled.div`
	width: 228px;
	height: 116px;

	img {
		width: 100%;
	}
`
export const CaseItemsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`
export const CaseButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	a {
		max-width: 240px;
	}
`

export const CaseItems = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
	justify-content: center;
	flex: 1;
	& > div {
		background: #01bbff23;
		border-radius: 10px;
		box-shadow: 0px 0px 5px #053e4c;
	}
	* {
		&::before {
			opacity: 0;
		}
	}
`
export const CaseItemsModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(35, 7, 47, 0.856);
	padding: 50px 15px;
	z-index: 1000;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	max-width: 748px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
`

export const ResultModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`

export const ResultContent = styled.div`
	background: #1a1a2e;
	padding: 2rem;
	border-radius: 10px;
	text-align: center;
	max-width: 400px;
	width: 90%;
`

export const PrizeImage = styled.img`
	width: 150px;
	height: 150px;
	object-fit: contain;
	margin-bottom: 1rem;
`

export const PrizeTitle = styled.h3`
	color: #fff;
	font-size: 1.5rem;
	margin-bottom: 1rem;
`
