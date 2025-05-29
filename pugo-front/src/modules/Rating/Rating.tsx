import React, { FunctionComponent } from 'react'
import {
	SubTitle,
	RatingContainer,
	Header,
	MainTitle,
	BenefitsContainer,
	BenefitItem,
	BenefitIcon,
	BenefitText,
	BenefitTitle,
	BenefitDescription,
	ReferralButton,
	ReferralsSection,
	ReferralsHeader,
	ReferralsTitle,
	ReferralsList,
	EmptyState,
} from './styled'
import { RatingProps } from './Rating.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import { Ref } from './components/Ref/Ref'
import { Toaster, toast } from 'react-hot-toast'

import { defineReferralAwardByStatus } from '@/utils/utils'

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

			<Header
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			></Header>

			<Toaster position='top-center' />
		</RatingContainer>
	)
}
