import styled from 'styled-components'

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 2;
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
	z-index: 2;
`

export const PugImage = styled.img`
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 1;
`
