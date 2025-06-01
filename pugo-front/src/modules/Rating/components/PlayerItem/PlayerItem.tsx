import React from 'react'
import { IUser } from '@/types/user'
import {
	PlayerItemStyled,
	PlayerItemTokens,
	PlayerItemTokensAmount,
	PlayerItemTokensLabel,
	PlayerItemPosition,
	PlayerItemStyledWrap,
	PositionText,
} from './styled'
import { StatusBadge } from '@/components/Header/styled'
import { UserAvatarStyled } from '@/components/Header/styled'
import { UserAvatarContainer } from '@/components/Header/styled'
import { UserAvatarWrap } from '@/components/Header/styled'
import { statusConfig } from '@/assets/constants/statusConfig'
import Label from '@/components/Label/Label'
import PositionSvg from './PositionSvg'

const PlayerItem = ({ user, position }: { user: IUser; position: number }) => {
	return (
		<PlayerItemStyled>
			<PlayerItemStyledWrap>
				<UserAvatarWrap>
					<UserAvatarContainer
						status={
							user.status as unknown as
								| 1
								| 2
								| 3
								| 4
								| 5
								| 6
								| 7
								| 8
								| 9
								| 10
								| 11
								| 12
						}
					>
						<UserAvatarStyled src={'/coin-c.png'} alt='User avatar' />
					</UserAvatarContainer>
					<StatusBadge
						as='div'
						status={
							user.status as unknown as
								| 1
								| 2
								| 3
								| 4
								| 5
								| 6
								| 7
								| 8
								| 9
								| 10
								| 11
								| 12
						}
					>
						{
							statusConfig[
								user.status as unknown as
									| 1
									| 2
									| 3
									| 4
									| 5
									| 6
									| 7
									| 8
									| 9
									| 10
									| 11
									| 12
							].name
						}
					</StatusBadge>
				</UserAvatarWrap>
			</PlayerItemStyledWrap>
			<PlayerItemStyledWrap>
				<PlayerItemTokens>
					<PlayerItemTokensLabel>{user.username}</PlayerItemTokensLabel>
					<PlayerItemTokensAmount>
						{user.tokens} <Label size='15px' title='BIFS' />
					</PlayerItemTokensAmount>
				</PlayerItemTokens>
			</PlayerItemStyledWrap>
			<PlayerItemStyledWrap>
				<PlayerItemPosition position={position}>
					<PositionSvg position={position} />
				</PlayerItemPosition>
			</PlayerItemStyledWrap>
		</PlayerItemStyled>
	)
}

export default PlayerItem
