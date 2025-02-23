import React, { FunctionComponent } from 'react'
import {
	HeaderStyled,
	UserAvatarStyled,
	UserBlockStyled,
	UserNicknameStyled,
	UserAvatarContainer,
	AvatarBacklight,
	Backlight,
} from './styled'
import { HeaderProps } from './Header.d'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// import { NavCircleElement } from '../NavCircleElement/NavCircleElement'

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<HeaderStyled>
			<UserBlockStyled>
				<UserNicknameStyled>
					@{user.username || 'Who are you?'}
				</UserNicknameStyled>
				<AvatarBacklight>
					<Backlight src='./avatar-background.png' alt='' />
					<UserAvatarContainer>
						<UserAvatarStyled src={user.photoUrl || 'default.png'} />
					</UserAvatarContainer>
				</AvatarBacklight>
			</UserBlockStyled>

			{children}
		</HeaderStyled>
	)
}
