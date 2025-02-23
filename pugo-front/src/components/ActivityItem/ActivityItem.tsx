import React, { FunctionComponent } from 'react'

import { ActivityItemProps } from './ActivityItem.d'
import {
	ActivityStyled,
	ActivityWrapper,
	ActivityIconWrapper,
	ActivityIconStyled,
	ActivityInfo,
	ActivityOption,
	NumberWallet,
	ActivityAmount,
	TokenName,
} from './styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const ActivityItem: FunctionComponent<ActivityItemProps> = ({ data }) => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<ActivityStyled>
			<ActivityWrapper>
				<ActivityIconWrapper>
					<ActivityIconStyled
						src={
							data?.active === 'send'
								? './icons/send.svg'
								: './icons/recieve.svg'
						}
					/>
				</ActivityIconWrapper>

				<ActivityInfo>
					<ActivityOption>
						{data?.active === 'send' ? 'Send' : 'Receive'}
					</ActivityOption>
					<NumberWallet>{data?.wallet}</NumberWallet>
				</ActivityInfo>
			</ActivityWrapper>
			<ActivityAmount>
				<p>{data?.amount}</p>

				<TokenName>PUGO</TokenName>
			</ActivityAmount>
		</ActivityStyled>
	)
}

export default ActivityItem
