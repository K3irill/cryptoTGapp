import { COLORS } from '@/styles/colors'
import styled from 'styled-components'

export const HeaderStyled = styled.header`
	padding: 10px 8px 0 8px;
	height: 47px;
	display: flex;
	justify-content: space-between;
`
export const UserBlockStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`

export const UserAvatarStyled = styled.img`
	width: 100%;
	height: 100%;
`
export const UserNicknameStyled = styled.p`
	font-size: 24px;
	margin: 0;
	color: ${COLORS.grey};
`
export const UserAvatarContainer = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 5px;

	border: 1px solid #bf860b38;
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
