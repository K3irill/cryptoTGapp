import React, { FunctionComponent, useEffect } from 'react'
import {
	FrensStyled,
	FrensBlock,
	Headline,
	Title,
	SubTitle,
	DescriptionBlock,
	OptionItem,
	OptionTitle,
	OptionTextBlock,
	OptionImg,
	ButtonBlock,
	ReferralsBlock,
	TextStyled,
	ReferralsInfo,
	ReferralsHeading,
} from './styled'
import { FrensProps } from './Frens.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Container } from '@/styles/styled'
import { TopBorderStyled } from '../Bank/styled'
import PugoLabel from '@/components/PugoLabel/PugoLabel'
import { REQUEST_LINK } from '../../../constant'
import { Ref } from './components/Ref/Ref'

export const Frens: FunctionComponent<FrensProps> = ({ data, children }) => {
	const { referralCode, referrals } = useSelector(
		(state: RootState) => state.user
	)

	const handleCopyReferralLink = () => {
		const botUsername = 'PugoCoinBot'
		const referralLink = `https://t.me/${botUsername}/pugo?startapp=${referralCode}`

		if (document.hasFocus()) {
			navigator.clipboard
				.writeText(referralLink)
				.then(() => {
					alert('Реферальная ссылка скопирована в буфер обмена!')
				})
				.catch(error => {
					alert('Не удалось скопировать ссылку')
					console.error('Ошибка при копировании ссылки: ', error)
				})
		} else {
			alert('Пожалуйста, сначала активируйте окно приложения.')
		}
	}

	return (
		<FrensStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<FrensBlock>
					<TopBorderStyled src='/grey-top-border.svg' alt='border' />
					<Headline>
						<Title>Invite your friends</Title>
						<SubTitle>You and your friend will receive bonuses</SubTitle>
					</Headline>
					<DescriptionBlock>
						<OptionItem>
							<OptionImg>
								<Image src='/icons/gift.svg' width={50} height={50} alt='' />
							</OptionImg>
							<OptionTextBlock>
								<OptionTitle>Invite your friend</OptionTitle>
								<OptionTitle>
									+ before 50 PUGO For you and your friend
								</OptionTitle>
							</OptionTextBlock>
						</OptionItem>
						<OptionItem>
							<OptionImg>
								<Image src='/icons/gift.svg' width={50} height={50} alt='' />
							</OptionImg>
							<OptionTextBlock>
								<OptionTitle>
									Invite a friend with <span>Telegram Premium</span>
								</OptionTitle>
								<OptionTitle>
									+ up to 75 PUGO For you and your friend
								</OptionTitle>
							</OptionTextBlock>
						</OptionItem>
					</DescriptionBlock>
					<ButtonBlock>
						<PugoLabel
							onClick={handleCopyReferralLink}
							height='30px'
							radius='5px'
							title='COPY REFERRAL LINK'
						/>
					</ButtonBlock>
					<Headline>
						<SubTitle>Your Referrals:</SubTitle>
					</Headline>
					<ReferralsBlock>
						<ReferralsHeading>
							<TextStyled>Name</TextStyled>
							<TextStyled>Tokens</TextStyled>
						</ReferralsHeading>
						<ReferralsInfo>
							{referrals && referrals?.length > 0 ? (
								referrals?.map(ref => <Ref key={ref} ref={ref} />)
							) : (
								<TextStyled style={{ textAlign: 'center' }}>
									There is empty here!
								</TextStyled>
							)}
						</ReferralsInfo>
					</ReferralsBlock>
				</FrensBlock>
				{children}
			</Container>
		</FrensStyled>
	)
}
