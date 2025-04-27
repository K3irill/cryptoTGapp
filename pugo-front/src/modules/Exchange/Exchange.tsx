/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent, useState, useEffect } from 'react'
import {
	ExchangeContainer,
	OverviewSection,
	BalanceColumn,
	MiningColumn,
	BalanceInfo,
	BalanceTitle,
	BalanceAmount,
	MiningStatus,
	MiningTimer,
	StarsSection,
	StarsHeader,
	StarsGrid,
	StarProductCard,
	StarProductButton,
	StarProductInfo,
	StarCount,
	TokenCount,
	MiningAnimation,
	DollarEquivalent,
} from './styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { handleAutomining, handleBuyTokens } from '@/utils/sendBotMessage'

import ShinyButton from '@/components/UI/ShinyButton/ShinyButton'
import { toast, Toaster } from 'react-hot-toast'
import Label from '@/components/Label/Label'
import type { ExchangeProps } from './Exchange.d'
import { defineMiningAwardByStatus } from '@/utils/utils'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import { products } from '@/assets/constants/storeContent'
import { useTranslation } from 'next-i18next'
export const Exchange: FunctionComponent<ExchangeProps> = ({
	data,
	children,
}) => {
	const user = useSelector((state: RootState) => state.user)
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
	})
	const { t } = useTranslation('common')
	useEffect(() => {
		if (!user.autominingExpiresAt) return

		const calculateTimeLeft = () => {
			const now = new Date()
			const expiry = new Date(user.autominingExpiresAt as Date)
			const diffTime = expiry.getTime() - now.getTime()

			if (diffTime <= 0) return { days: 0, hours: 0, minutes: 0 }

			return {
				days: Math.floor(diffTime / (1000 * 60 * 60 * 24)),
				hours: Math.floor(
					(diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				),
				minutes: Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)),
			}
		}

		setTimeLeft(calculateTimeLeft())
		const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000)

		return () => clearInterval(timer)
	}, [user.autominingExpiresAt])

	const getTimeWord = (value: number, words: string[]) => {
		const cases = [2, 0, 1, 1, 1, 2]
		return words[
			value % 100 > 4 && value % 100 < 20 ? 2 : cases[Math.min(value % 10, 5)]
		]
	}

	const handleBuyClick = (stars: number, pugo: number) => {
		handleBuyTokens(stars, pugo, user, t)
	}

	return (
		<ExchangeContainer>
			<TopPageInfo data={data.top_section} />

			<OverviewSection>
				<BalanceColumn>
					<BalanceTitle>{data.content.balance.title}</BalanceTitle>
					<BalanceInfo>
						<BalanceAmount>{user.tokens || '0'}</BalanceAmount>
						<Label size='20px' title={data.content.stars.tokensLabel} />
					</BalanceInfo>
					<DollarEquivalent>
						{data.content.balance.dollarEquivalent}
					</DollarEquivalent>
				</BalanceColumn>

				<MiningColumn>
					{!user.automining ? (
						<>
							<MiningStatus>{data.content.mining.title}</MiningStatus>
							<MiningAnimation>
								<img src='/coin-c.png' alt='Mining in progress' />
							</MiningAnimation>
							<ShinyButton
								onClick={() => handleAutomining(user, t)}
								title={data.content.mining.activateButton}
								subtitle={`${
									user.status ? defineMiningAwardByStatus(user.status) : 1000
								} ${data.content.mining.dailyReward}`}
							/>
						</>
					) : (
						<>
							<MiningAnimation>
								<img src='/coin-c.png' alt='Mining in progress' />
							</MiningAnimation>
							<MiningTimer>
								{timeLeft.days > 0 ? (
									<>
										{data.content.mining.active} {timeLeft.days}{' '}
										{getTimeWord(timeLeft.days, data.content.timeUnits.days)}{' '}
										{timeLeft.hours}{' '}
										{getTimeWord(timeLeft.hours, data.content.timeUnits.hours)}
									</>
								) : (
									data.content.mining.inactive
								)}
							</MiningTimer>
						</>
					)}
				</MiningColumn>
			</OverviewSection>

			<StarsSection>
				<StarsHeader>
					<p>{data.content.stars.title}</p>
					<p>{data.content.stars.subtitle}</p>
				</StarsHeader>

				<StarsGrid>
					{Object.entries(products).map(([key, product], index) => (
						<StarProductCard key={key}>
							<StarProductInfo>
								<StarCount>
									<span className='count'>{product.stars}</span>
									<span className='label'>{data.content.stars.starsLabel}</span>
								</StarCount>
								<TokenCount>
									<span className='count'>{product.pugo}</span>
									<Label size='20px' title={data.content.stars.tokensLabel} />
								</TokenCount>
							</StarProductInfo>
							<StarProductButton
								onClick={() => handleBuyClick(product.stars, product.pugo)}
							>
								{data.content.stars.buyButton}
							</StarProductButton>
						</StarProductCard>
					))}
				</StarsGrid>
			</StarsSection>
		</ExchangeContainer>
	)
}
