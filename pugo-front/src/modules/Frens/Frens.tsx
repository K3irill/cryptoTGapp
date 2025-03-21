import React, { FunctionComponent } from 'react'
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
import PugoLabel from '@/components/PugoLabel/PugoLabel'
import { REQUEST_LINK } from '../../../constant'
import { Ref } from './components/Ref/Ref'
import { Toaster, toast } from 'react-hot-toast'
import Label from '@/components/Label/Label'

export const Frens: FunctionComponent<FrensProps> = ({ data, children }) => {
	const { referralCode, referrals } = useSelector(
		(state: RootState) => state.user
	)

	const handleCopyReferralLink = () => {
		if (referralCode) {
			const botUsername = 'PugoCoinBot'
			const referralLink = `https://t.me/${botUsername}/pugo?startapp=${referralCode}`

			if (document.hasFocus()) {
				navigator.clipboard
					.writeText(referralLink)
					.then(() => {
						toast.success('Реферальный код скопирован!')
					})
					.catch(error => {
						console.error('Ошибка при копировании ссылки: ', error)
						toast.error('Ошибка, обновите страницу пожалуйста!')
					})
			}
		}
	}

	return (
		<>
			<FrensStyled>
				<TopPageInfo data={data.top_section} />
				<Container>
					<FrensBlock>
						<Headline>
							<Title>Приглашайте друзей</Title>
							<SubTitle>Вы и ваш друг получите токены</SubTitle>
						</Headline>
						<DescriptionBlock>
							<OptionItem>
								<OptionImg>
									<Image src='/icons/gift.svg' width={50} height={50} alt='' />
								</OptionImg>
								<OptionTextBlock>
									<OptionTitle>За приглашение одно друга</OptionTitle>
									<OptionTitle>
										+ до 50 <Label isInline size='18px' title='BIFS' /> для тебя
										и твоего друга
									</OptionTitle>
								</OptionTextBlock>
							</OptionItem>
							<OptionItem>
								<OptionImg>
									<Image src='/icons/gift.svg' width={50} height={50} alt='' />
								</OptionImg>
								<OptionTextBlock>
									<OptionTitle>
										За приглашение одно друга с<br></br>{' '}
										<span> Telegram Premium</span>
									</OptionTitle>
									<OptionTitle>
										+ до 75 <Label isInline size='18px' title='BIFS' /> для тебя
										и твоего друга
									</OptionTitle>
								</OptionTextBlock>
							</OptionItem>
						</DescriptionBlock>
						<ButtonBlock>
							<PugoLabel
								onClick={handleCopyReferralLink}
								height='30px'
								radius='5px'
								fontSize='12px'
								title={
									referralCode
										? 'КОПИРОВАТЬ РЕФ ССЫЛКУ'
										: 'Загружаем вашу реф ссылку...'
								}
							/>
						</ButtonBlock>
						<Headline>
							<SubTitle>Ваши рефералы:</SubTitle>
						</Headline>
						<ReferralsBlock>
							<ReferralsHeading>
								{referrals && referrals?.length > 0 && (
									<>
										<TextStyled>Имя</TextStyled>
										<TextStyled>Токены</TextStyled>
									</>
								)}
							</ReferralsHeading>
							<ReferralsInfo>
								{referrals && referrals?.length > 0 ? (
									referrals?.map(ref => <Ref key={ref} ref={ref} />)
								) : (
									<TextStyled style={{ textAlign: 'center' }}>
										У вас пока нет рефералов. Скорее приглашайте и получайте
										бонусы!
									</TextStyled>
								)}
							</ReferralsInfo>
						</ReferralsBlock>
					</FrensBlock>
					{children}
				</Container>
			</FrensStyled>

			{/* Добавляем Toaster для уведомлений */}
			<Toaster />
		</>
	)
}
