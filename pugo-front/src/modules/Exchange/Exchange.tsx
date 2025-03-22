/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent } from 'react'
import {
	ExchangeStyled,
	OverviewStyled,
	FirstColumnOverview,
	SecondColumnOverview,
	Balance,
	Title,
	StarsWrapper,
	StarOptionFirstBlock,
	StarsOptionList,
	StarOptionItem,
	Count,
	StarInfo,
	StarButton,
	Mining,
	InDollars,
	StarWrapper,
} from './styled'
import { ExchangeProps } from './Exchange.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import PugoLabel from '@/components/PugoLabel/PugoLabel'
import ShinyButton from '@/components/UI/ShinyButton/ShinyButton'

import { TextStyled } from '../Frens/styled'
import { Container, Headline, Notify } from '@/styles/styled'

import GoldStar from '@/components/GoldStar/GoldStar'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { REQUEST_LINK } from '../../../constant'
import { Toaster, toast } from 'react-hot-toast'
import { products } from './exchange.content'
import Label from '@/components/Label/Label'
import { handleAutomining, handleBuyTokens } from '@/utils/sendBotMessage'

export const Exchange: FunctionComponent<ExchangeProps> = ({
	data,
	children,
}) => {
	const user = useSelector((state: RootState) => state.user)

	return (
		<>
			<ExchangeStyled>
				<TopPageInfo data={data.top_section} />
				<Container>
					<OverviewStyled>
						<FirstColumnOverview>
							<h2>Обзор</h2>
							<p>Баланс</p>
							<Balance>
								<h3>{user.tokens || 'loading...'}</h3>
								<Label size='20px' title='BIFS' />
							</Balance>
							<InDollars>$?????</InDollars>
						</FirstColumnOverview>
						<SecondColumnOverview>
							{!user.automining ? (
								<>
									<Title>Авто-добыча монет</Title>
									<ShinyButton
										onClick={() => handleAutomining(user)}
										title='Подключить майнинг'
										subtitle='1450 монет в день!'
									></ShinyButton>
								</>
							) : (
								<Mining>
									<img src='/mining.gif' alt='' />
									<Title>You have auto mining enabled for 7 days.</Title>
								</Mining>
							)}
						</SecondColumnOverview>
					</OverviewStyled>
					<StarsWrapper>
						<Headline size={22}>
							Купить монеты <Label isInline size='14px' title='BIFS' /> за
							звезды телеграм:
						</Headline>
						<StarsOptionList>
							{Object.keys(products).map((productKey, index) => {
								const product = products[productKey]

								if (!product.for_admin || user.id === '1112303359') {
									return (
										<StarOptionItem key={productKey}>
											<StarButton
												onClick={() =>
													handleBuyTokens(product.stars, product.pugo, user)
												}
											>
												Купить
											</StarButton>
											<StarInfo>
												<StarWrapper>
													<GoldStar count={+index} />
												</StarWrapper>
												<Count>
													<p>{product.stars}</p>

													<span>Звезд</span>
												</Count>
											</StarInfo>

											<Count>
												<p>{product.pugo}</p> <Label size='18px' title='BIFS' />
											</Count>
										</StarOptionItem>
									)
								}
								return null
							})}
						</StarsOptionList>
					</StarsWrapper>
					{children}
				</Container>
			</ExchangeStyled>

			<Toaster />
		</>
	)
}
