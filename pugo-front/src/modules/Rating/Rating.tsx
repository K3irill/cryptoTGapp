import React, { FunctionComponent } from 'react'
import {
	RatingContainer,
	Header,
	BestPlayerContainer,
	HeaderBorderImg,
	HeaderInfoRow,
	HeaderInfoItemWrap,
	HeaderInfoItem,
	SubTitle,
	BestPlayersList,
} from './styled'
import { RatingProps } from './Rating.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Toaster, toast } from 'react-hot-toast'

export const Rating: FunctionComponent<RatingProps> = ({ data }) => {
	const { referralCode, referrals, status } = useSelector(
		(state: RootState) => state.user
	)

	return (
		<RatingContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<TopPageInfo data={data.top_section} />
			<BestPlayerContainer>
				<Header
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<HeaderBorderImg src='/grey-top-border.svg' alt='border' />
					<HeaderInfoRow>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Avatar</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Name/coins</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
						<HeaderInfoItemWrap>
							<HeaderInfoItem>
								<SubTitle>Position</SubTitle>
							</HeaderInfoItem>
						</HeaderInfoItemWrap>
					</HeaderInfoRow>
				</Header>
				<BestPlayersList></BestPlayersList>
			</BestPlayerContainer>

			<Toaster position='top-center' />
		</RatingContainer>
	)
}
