import React, { FunctionComponent } from 'react'
import {
	HeaderStyled,
	UserAvatarStyled,
	UserBlockStyled,
	UserNicknameStyled,
	UserAvatarContainer,
} from './styled'
import { HeaderProps } from './Header.d'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { NavCircleElement } from '../NavCircleElement/NavCircleElement'

export const Header: FunctionComponent<HeaderProps> = ({
	content,
	children,
}) => {
	const user = useSelector((state: RootState) => state.user)
	// console.log(user)
	return (
		<HeaderStyled>
			<UserBlockStyled>
				<UserAvatarContainer>
					<UserAvatarStyled src={user.photoUrl || '1.svg'} />
				</UserAvatarContainer>
				<UserNicknameStyled>
					{user.username || 'Who are you?'}
				</UserNicknameStyled>
			</UserBlockStyled>
			<NavCircleElement
				path={content.site_link}
				background='#FDC910'
				width='47px'
				height='47px'
			>
				<img src='/icons/output.svg'></img>
			</NavCircleElement>
			{children}
		</HeaderStyled>
	)
}
