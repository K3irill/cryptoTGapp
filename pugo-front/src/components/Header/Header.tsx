import React, { FunctionComponent } from 'react'
import {
	HeaderStyled,
	UserAvatarStyled,
	UserBlockStyled,
	UserNicknameStyled,
} from './styled'
import { HeaderProps } from './Header.d'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
	const user = useSelector((state: RootState) => state.user)
	// console.log(user)
	return (
		<HeaderStyled>
			<UserBlockStyled>
				<UserAvatarStyled src={user.photoUrl || '1.svg'} />
				<UserNicknameStyled>{user.id || 'Who are you?'}</UserNicknameStyled>
			</UserBlockStyled>
			{children}
		</HeaderStyled>
	)
}
