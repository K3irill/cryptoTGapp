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

export const Exchange: FunctionComponent<ExchangeProps> = ({
	data,
	children,
}) => {
	const user = useSelector((state: RootState) => state.user)

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
					The Pugo bot sent you a request in the
					<a href='https://t.me/PugoCoinBot'>chat</a>😊
				</Notify>
			))
			window.open('https://t.me/PugoCoinBot', '_blank')
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
			window.open('https://t.me/PugoCoinBot', '_blank')
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
								<Label title='Jyntra' />
							</Balance>
							<InDollars>$?????</InDollars>
						</FirstColumnOverview>
						<SecondColumnOverview>
							{!user.automining ? (
								<>
									<Title>Auto-Mining</Title>
									<ShinyButton
										onClick={handleAutomining}
										title='Enable mining'
										subtitle='14500 tokens per one day'
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
						<Headline size={22}>The PUGO package for the stars:</Headline>
						<StarsOptionList>
							{Object.keys(products).map((productKey, index) => {
								const product = products[productKey]

								if (!product.for_admin || user.id === '1112303359') {
									return (
										<StarOptionItem key={productKey}>
											<StarButton
												onClick={() => handleBuy(product.stars, product.pugo)}
											>
												Buy
											</StarButton>
											<StarInfo>
												<StarWrapper>
													<GoldStar count={+index} />
												</StarWrapper>
												<Count>
													<p>{product.stars}</p>

													<span>Stars</span>
												</Count>
											</StarInfo>

											<Count>
												<p>{product.pugo}</p>{' '}
												<Label size='18px' title='Jyntra' />
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
