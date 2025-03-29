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
import { products } from './exchange.content'

import ShinyButton from '@/components/UI/ShinyButton/ShinyButton'
import { toast, Toaster } from 'react-hot-toast'
import Label from '@/components/Label/Label'
import type { ExchangeProps } from './Exchange.d'
import { defineMiningAwardByStatus } from '@/utils/utils'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
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
		toast.promise(handleBuyTokens(stars, pugo, user), {
			loading: 'Обработка покупки...',
			success: `Успешно куплено ${pugo} BIFS!`,
			error: 'Ошибка при покупке',
		})
	}

	return (
		<ExchangeContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<TopPageInfo data={data.top_section} />
			<OverviewSection
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				<BalanceColumn>
					<BalanceTitle>Ваш баланс</BalanceTitle>
					<BalanceInfo>
						<BalanceAmount>{user.tokens || '0'}</BalanceAmount>
						<Label size='20px' title='BIFS' />
					</BalanceInfo>
					<DollarEquivalent>≈ $?.??</DollarEquivalent>
				</BalanceColumn>

				<MiningColumn>
					{!user.automining ? (
						<>
							<MiningStatus>Автоматический майнинг</MiningStatus>
							<MiningAnimation
							// animate={{ rotate: 360 }}
							// transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
							>
								<img src='/coin-c.png' alt='Mining in progress' />
							</MiningAnimation>
							<ShinyButton
								onClick={() => handleAutomining(user)}
								title='Активировать майнинг'
								subtitle={`${
									user.status ? defineMiningAwardByStatus(user.status) : 1000
								} BIFS ежедневно`}
							/>
						</>
					) : (
						<>
							<MiningAnimation>
								<img src='/coin-c.png' alt='Mining in progress' />
							</MiningAnimation>
							<MiningTimer
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{
									repeat: Infinity,
									repeatType: 'reverse',
									duration: 2,
								}}
							>
								{timeLeft.days > 0 ? (
									<>
										Майнинг активен: {timeLeft.days}{' '}
										{getTimeWord(timeLeft.days, ['день', 'дня', 'дней'])}{' '}
										{timeLeft.hours}{' '}
										{getTimeWord(timeLeft.hours, ['час', 'часа', 'часов'])}
									</>
								) : (
									'Майнинг не активен'
								)}
							</MiningTimer>
						</>
					)}
				</MiningColumn>
			</OverviewSection>

			<StarsSection
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<StarsHeader>
					<p>
						Купить <Label size='38px' title='BIFS' />
					</p>{' '}
					<p> за Telegram Stars</p>
				</StarsHeader>

				<StarsGrid>
					{Object.entries(products).map(([key, product], index) => {
						if (!product.for_admin || user.id === '1112303359') {
							return (
								<StarProductCard
									key={key}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
									whileHover={{ scale: 1.03 }}
								>
									<StarProductInfo>
										<StarCount>
											<span className='count'>{product.stars}</span>
											<span className='label'>Stars</span>
										</StarCount>
										<TokenCount>
											<span className='count'>{product.pugo}</span>
											<Label size='20px' title='BIFS' />
										</TokenCount>
									</StarProductInfo>
									<StarProductButton
										onClick={() => handleBuyClick(product.stars, product.pugo)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										Купить
									</StarProductButton>
								</StarProductCard>
							)
						}
						return null
					})}
				</StarsGrid>
			</StarsSection>

			{children}
			<Toaster position='bottom-right' />
		</ExchangeContainer>
	)
}
