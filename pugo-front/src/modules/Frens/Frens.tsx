import React, { FunctionComponent } from 'react'
import {
	SubTitle,
	FrensContainer,
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
import { FrensProps } from './Frens.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import { Ref } from './components/Ref/Ref'
import { Toaster, toast } from 'react-hot-toast'

import { defineReferralAwardByStatus } from '@/utils/utils'

export const Frens: FunctionComponent<FrensProps> = ({ data }) => {
	const { referralCode, referrals, status } = useSelector(
		(state: RootState) => state.user
	)

	const handleCopyReferralLink = () => {
		if (referralCode) {
			const botUsername = 'BIFSCryptoBot'
			const referralLink = `https://t.me/${botUsername}/bifs?startapp=${referralCode}`

			if (document.hasFocus()) {
				navigator.clipboard
					.writeText(referralLink)
					.then(() => {
						toast.success(data.note.success)
					})
					.catch(error => {
						console.error('Ошибка при копировании ссылки: ', error)
						toast.error(data.note.error)
					})
			}
		}
	}

	return (
		<FrensContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<TopPageInfo data={data.top_section} />

			<Header
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<MainTitle>{data.heading.title}</MainTitle>
				<SubTitle>{data.heading.subtitle}</SubTitle>
			</Header>

			<BenefitsContainer
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				<BenefitItem
					whileHover={{ scale: 1.02 }}
					transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				>
					<BenefitIcon>
						<Image src='/icons/gift.svg' width={32} height={32} alt='Бонус' />
					</BenefitIcon>
					<BenefitText>
						<BenefitTitle>{data.bonuses.bonus_1.title}</BenefitTitle>
						<BenefitDescription>
							{data.bonuses.bonus_1.text}
							<span>
								{status ? defineReferralAwardByStatus(status) : 500} BIFS
							</span>
							{data.bonuses.bonus_1.text_part} <span>500 BIFS</span>
						</BenefitDescription>
					</BenefitText>
				</BenefitItem>

				<BenefitItem
					whileHover={{ scale: 1.02 }}
					transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				>
					<BenefitIcon>
						<Image
							src='/icons/gold-star.svg'
							width={26}
							height={26}
							alt='Статус'
						/>
					</BenefitIcon>
					<BenefitText>
						<BenefitTitle>{data.bonuses.bonus_2.title}</BenefitTitle>
						<BenefitDescription>{data.bonuses.bonus_2.text}</BenefitDescription>
					</BenefitText>
				</BenefitItem>
			</BenefitsContainer>

			<ReferralButton
				onClick={handleCopyReferralLink}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				{referralCode ? data.refBtn.text : data.refBtn.loading_text}
			</ReferralButton>

			<ReferralsSection
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<ReferralsHeader>
					<ReferralsTitle>{data.refs_block.title}</ReferralsTitle>
				</ReferralsHeader>

				<ReferralsList>
					{referrals && referrals.length > 0 ? (
						referrals.map((ref, index) => <Ref key={ref} ref={ref} />)
					) : (
						<EmptyState
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							{data.refs_block.empty}
						</EmptyState>
					)}
				</ReferralsList>
			</ReferralsSection>

			<Toaster position='top-center' />
		</FrensContainer>
	)
}
