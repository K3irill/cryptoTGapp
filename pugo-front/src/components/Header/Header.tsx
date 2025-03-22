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
} from './styled'
import { HeaderProps } from './Header.d'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { InfoModal } from '../InfoModal/InfoModal'
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
				<UserAvatarContainer>
					<UserAvatarStyled src={user.photoUrl || 'coin-c.png'} />
				</UserAvatarContainer>

				<UserNicknameStyled>
					{user.username && user.firstName ? (
						<>
							{' '}
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
