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
} from './styled'
import { FrensProps } from './Frens.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Container } from '@/styles/styled'
import { TopBorderStyled } from '../Bank/styled'
import PugoLabel from '@/components/PugoLabel/PugoLabel'

export const Frens: FunctionComponent<FrensProps> = ({ data, children }) => {
	const { referralCode } = useSelector((state: RootState) => state.user)

	const handleInviteClick = () => {
		const botUsername = 'PugoCoinBot/pugo'
		const referralLink = `https://t.me/${botUsername}/app?startapp=${referralCode}`
		const message = `Присоединяйся ко мне и получи бонусы! Перейди по ссылке: ${referralLink}`

		if (window.Telegram && window.Telegram.WebApp) {
			window.Telegram.WebApp.openLink(referralLink)
		} else {
			alert('Функция доступна только в Telegram Mini App')
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
									+ before 5 PUGO For you and your friend
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
									+ up to 7.5 PUGO For you and your friend
								</OptionTitle>
							</OptionTextBlock>
						</OptionItem>
					</DescriptionBlock>
					<ButtonBlock>
						<PugoLabel
							onClick={handleInviteClick}
							height='30px'
							radius='5px'
							title='INVITE'
						/>
					</ButtonBlock>
				</FrensBlock>
				{children}
			</Container>
		</FrensStyled>
	)
}
