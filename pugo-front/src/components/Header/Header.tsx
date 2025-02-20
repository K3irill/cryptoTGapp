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
				width='32px'
				height='32px'
			>
				<img style={{ width: '18px' }} src='/icons/output.svg' />
			</NavCircleElement>
			{children}
		</HeaderStyled>
	)
}
