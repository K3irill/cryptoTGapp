/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent } from 'react'
import {
	ExchangeStyled,
	OverviewStyled,
	FirstColumnOverview,
	SecondColumnOverview,
	Balance,
	GoldTitle,
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
import { Container, Notify } from '@/styles/styled'

import GoldStar from '@/components/GoldStar/GoldStar'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { REQUEST_LINK } from '../../../constant'
import { Toaster, toast } from 'react-hot-toast'

export const Exchange: FunctionComponent<ExchangeProps> = ({
	data,
	children,
}) => {
	const user = useSelector((state: RootState) => state.user)

	const products = {
		1: {
			for_admin: true,
			stars: 1,
			pugo: 1000000,
			description: '1000000 PUGO for 1 Stars ⭐',
		},
		50: { stars: 50, pugo: 2500, description: '1000 PUGO for 50 Stars ⭐' },
		150: { stars: 150, pugo: 10000, description: '1750 PUGO for 75 Stars ⭐' },
		500: { stars: 500, pugo: 50000, description: '2500 PUGO for 100 Stars ⭐' },
		1000: {
			stars: 1000,
			pugo: 150000,
			description: '3500 PUGO for 150 Stars ⭐',
		},
		2500: {
			stars: 2500,
			pugo: 500000,
			description: '7770 PUGO for 250 Stars ⭐',
		},
	}

	const handleBuy = async (stars: number, pugos: number) => {
		try {
			const response = await fetch(`${REQUEST_LINK}/api/exchange/buy-tokens`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ stars, pugos, telegramId: user.id }),
			})

			const data = await response.json()

			toast(t => (
				<Notify>
					<p>The Pugo bot sent you a request in the</p>
					<a href='https://t.me/PugoCoinBot'>CHAT</a>😊
				</Notify>
			))
		} catch (error) {
			console.error('Error triggering bot action:', error)
			toast.error(
				'There was an error completing your purchase. Please try again.'
			)
		}
	}

	const handleAutomining = async () => {
		try {
			const response = await fetch(`${REQUEST_LINK}/api/exchange/automining`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ telegramId: user.id, days: 7, stars: 777 }),
			})

			const data = await response.json()

			toast(t => (
				<Notify>
					The bot sent you a request in the
					<a href='https://t.me/PugoCoinBot'>chat</a>😊
				</Notify>
			))
		} catch (error) {
			console.error('Error triggering bot action:', error)
			toast.error('There was an error enabling auto-mining. Please try again.')
		}
	}

	return (
		<>
			<ExchangeStyled>
				<TopPageInfo data={data.top_section} />
				<Container>
					<OverviewStyled>
						<FirstColumnOverview>
							<h2>Overview</h2>
							<p>Total Balance</p>
							<Balance>
								<h3>{user.tokens || 'loading...'}</h3>
								<PugoLabel title='PUGO' />
							</Balance>
							<InDollars>$?????</InDollars>
						</FirstColumnOverview>
						<SecondColumnOverview>
							{!user.automining ? (
								<>
									<GoldTitle>Enable mining for 7 days for 150 stars</GoldTitle>
									<ShinyButton
										onClick={handleAutomining}
										title='Enable mining'
										subtitle='10 tokens per one hour'
									></ShinyButton>
								</>
							) : (
								<Mining>
									<img src='/mining.gif' alt='' />
									<GoldTitle>
										You have auto mining enabled for 7 days.
									</GoldTitle>
								</Mining>
							)}
						</SecondColumnOverview>
					</OverviewStyled>
					<StarsWrapper>
						<TextStyled>The PUGO package for the stars:</TextStyled>

						<StarsOptionList>
							{Object.keys(products).map((productKey, index) => {
								const product = products[productKey]

								if (!product.for_admin || user.id === '1112303359') {
									return (
										<StarOptionItem key={productKey}>
											<StarOptionFirstBlock>
												<StarButton
													onClick={() => handleBuy(product.stars, product.pugo)}
												>
													Buy
												</StarButton>
												<StarInfo>
													<StarWrapper>
														<GoldStar count={+(index + 1)} />
													</StarWrapper>
													<Count>
														{product.stars} <span>Stars</span>
													</Count>
												</StarInfo>
											</StarOptionFirstBlock>
											<Count>
												{product.pugo} <span>PUGO</span>
											</Count>
											<Image src='/coin.svg' width={33} height={33} alt='' />
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
