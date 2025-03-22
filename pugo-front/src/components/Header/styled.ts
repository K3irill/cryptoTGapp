import { COLORS } from '@/styles/colors'
import styled from 'styled-components'

export const HeaderStyled = styled.div`
	padding: 10px 18px 10px 18px;
	height: 90px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	z-index: 2px;
`
export const UserBlockStyled = styled.div`
	display: flex;
	align-items: end;
	gap: 15px;
	width: 100%;
`

export const UserAvatarStyled = styled.img`
	width: 100%;
	height: 100%;
`
export const UserNicknameStyled = styled.div`
	p {
		color: ${COLORS.grey};
		font-size: 14x;
	}
	h3 {
		font-size: 20x;
		color: #fff;
	}

	margin: 0;

	padding-bottom: 8px;
`
export const UserAvatarContainer = styled.div`
	width: 56px;
	height: 56px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 5px;
	box-shadow: 1px 0px 30px #526efb7b;
	border: 3px solid ${COLORS.blue};
`

export const AvatarBacklight = styled.div`
	position: relative;
	width: 69px;
	height: 67px;
	display: flex;
	align-items: center;
	justify-content: center;
	// background: url('./avatar-background.png');
	// background-size: contain;
`

export const Backlight = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	right: 3px;
`

export const OutButton = styled.button`
	width: 56px;
	height: 56px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 5px;
	box-shadow: inner 1px 0px 30px #91a2f854;
	border: 2px solid #1e3451;
	flex-shrink: 0;
	background: rgba(18, 32, 49, 0.704);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: relative;
	z-index: 5;
	img {
		width: 35px;
		height: 35px;
	}
`
/* Ellipse 19 */
