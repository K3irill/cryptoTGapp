import React, { FunctionComponent } from 'react'

import { UserBankProps } from './UserBank.d'
import {
	UserAvatarStyled,
	UserAvatarWrapper,
	UserBankStyled,
	UserCountInDollars,
	UserInfo,
	UserNameStyled,
	UserTokenCountStyled,
	UserWrapper,
} from './styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const UserBank: FunctionComponent<UserBankProps> = () => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<UserBankStyled>
			<UserWrapper>
				<UserAvatarWrapper>
					<UserAvatarStyled src={user.photoUrl || './coin.svg'} />
				</UserAvatarWrapper>

				<UserInfo>
					<UserNameStyled>{user.firstName || 'Who are you?'}</UserNameStyled>
					<UserTokenCountStyled>
						<p>15000</p>
						<span>PUGO</span>
					</UserTokenCountStyled>
				</UserInfo>
			</UserWrapper>
			<UserCountInDollars>$????.?</UserCountInDollars>
		</UserBankStyled>
	)
}

export default UserBank
