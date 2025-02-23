import React, { FunctionComponent } from 'react'
import {
	BannerStyled,
	BankStyled,
	ConnectBlock,
	CoinWithFrame,
	CoinWithFrameWrapper,
	ButtonWrapper,
	ButtonBlock,
	BankButtonStyled,
	HistoryBlock,
	TopHistoryStyled,
	TopBorderStyled,
	HeadingElementsStyled,
	ActivityList,
} from './styled'
import { BankProps } from './Bank.d'

import TopPageInfo from '../TopPageInfo/TopPageInfo'

import MulticolouredButton from '../UI/MulticolouredButton/MulticolouredButton'
import UserBank from '../UserBank/UserBank'
import ActivityItem from '../ActivityItem/ActivityItem'

export const Bank: FunctionComponent<BankProps> = ({ data, children }) => {
	console.log(data.top_section)
	return (
		<BankStyled>
			<TopPageInfo data={data.top_section} />
			<ConnectBlock>
				<CoinWithFrameWrapper>
					<CoinWithFrame src='./coin-with-frame.svg' alt='' />
				</CoinWithFrameWrapper>
				<ButtonWrapper>
					<MulticolouredButton
						iconSrc='./icons/lock-key.svg'
						title={'CONNECT WALLET'}
					/>
				</ButtonWrapper>
			</ConnectBlock>
			<ButtonBlock>
				<BankButtonStyled>
					<img src='./icons/recieve.svg' alt='recieve' />
				</BankButtonStyled>
				<BankButtonStyled>
					<img src='./icons/send.svg' alt='send' />
				</BankButtonStyled>
			</ButtonBlock>
			<HistoryBlock>
				<UserBank />
				<TopHistoryStyled>
					<TopBorderStyled src='./grey-top-border.svg' alt='border' />
					<HeadingElementsStyled>
						<span>Activity history</span>
						<span>Amount</span>
					</HeadingElementsStyled>
					<ActivityList>
						{data.activity_section.activity.map(item => {
							return <ActivityItem key={item.id} data={item} />
						})}
					</ActivityList>
				</TopHistoryStyled>
			</HistoryBlock>
			{children}
		</BankStyled>
	)
}
