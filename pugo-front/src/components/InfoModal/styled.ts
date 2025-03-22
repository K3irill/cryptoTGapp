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
export const Divider = styled.div`
	width: 100%;
	height: 1px;
	background-color: rgba(255, 255, 255, 0.2);
	margin: 16px 0;
`

export const SocialLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 16px;
`
