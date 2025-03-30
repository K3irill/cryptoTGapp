/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent, useState } from 'react'
import {
	HeaderStyled,
	UserAvatarStyled,
	UserBlockStyled,
	UserNicknameStyled,
	UserAvatarContainer,
	AvatarBacklight,
	Backlight,
	OutButton,
	StatusBadge,
	UserAvatarWrap,
} from './styled'
import { HeaderProps } from './Header.d'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { InfoModal } from '../InfoModal/InfoModal'
import { statusConfig } from '@/assets/constants/statusConfig'
// import { NavCircleElement } from '../NavCircleElement/NavCircleElement'

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
	const user = useSelector((state: RootState) => state.user)
	const [openInfoModal, setOpenInfoModal] = useState(false)

	const handleModalClose = () => {
		setOpenInfoModal(false)
	}

	return (
		<HeaderStyled>
			<UserBlockStyled>
				<UserAvatarWrap>
					<UserAvatarContainer status={user.status || 1}>
						<UserAvatarStyled src={user.photoUrl || 'coin-c.png'} />
					</UserAvatarContainer>

					<StatusBadge as='div' status={user.status || 1}>
						{statusConfig[user.status || 1].name}
					</StatusBadge>
				</UserAvatarWrap>

				<UserNicknameStyled>
					{user.username && user.firstName ? (
						<>
							<p>{'@' + user.username}</p>
							<h3>{user.firstName}</h3>
						</>
					) : (
						<p>Not found</p>
					)}
				</UserNicknameStyled>
			</UserBlockStyled>

			<OutButton onClick={() => setOpenInfoModal(prev => !prev)}>
				<img src='/icons/info.svg' alt='' />
			</OutButton>

			{children}
			<InfoModal isVisible={openInfoModal} onClose={handleModalClose} />
		</HeaderStyled>
	)
}
