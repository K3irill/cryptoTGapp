import React, { FunctionComponent, useState } from 'react'
import {
	GamesContainer,
	Header,
	MainTitle,
	SubTitle,
	GamesGrid,
	GameCard,
	GameImage,
	GameContent,
	GameTitle,
	GameDescription,
	LockOverlay,
	ComingSoonBadge,
} from './styled'
import { EarnProps } from './Earn.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export const Earn: FunctionComponent<EarnProps> = ({ data }) => {
	const router = useRouter()

	const games = [
		{
			id: 'miner',
			title: 'Crystal Miner',
			description: 'Добывайте кристалы в увлекательной мини-игре',
			image: '/games/crystal-preview.jpg',
			available: true,
		},
		{
			id: 'spacepug',
			title: 'Space Pug',
			description: 'Помогите пуглику собрать токены BIFS в космосе',
			image: '/games/space-pug.jpg',
			available: true,
		},
		{
			id: 'quiz',
			title: 'Crypto Quiz',
			description: 'Проверьте свои знания о криптовалютах',
			image: '/games/quiz-preview.jpg',
			available: false,
		},
	]

	const handleCardClick = (gameId: string, isAvailable: boolean) => {
		if (isAvailable) {
			router.push(`/game/${gameId}`)
		}
	}

	return (
		<GamesContainer
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
				<MainTitle>Игры и развлечения</MainTitle>
				<SubTitle>Зарабатывайте токены, играя в увлекательные игры</SubTitle>
			</Header>

			<GamesGrid>
				{games.map((game, index) => (
					<GameCard
						key={game.id}
						$available={game.available}
						onClick={() => handleCardClick(game.id, game.available)}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1, duration: 0.5 }}
						whileHover={
							game.available
								? { y: -5, boxShadow: '0 10px 20px rgba(0, 191, 255, 0.3)' }
								: {}
						}
						whileTap={game.available ? { scale: 0.98 } : {}}
					>
						<GameImage $src={game.image}>
							{!game.available && (
								<LockOverlay>
									<img
										src='/icons/lock.svg'
										alt='locked'
										width={40}
										height={40}
									/>
								</LockOverlay>
							)}
							{!game.available && <ComingSoonBadge>СКОРО</ComingSoonBadge>}
						</GameImage>

						<GameContent>
							<GameTitle>{game.title}</GameTitle>
							<GameDescription>{game.description}</GameDescription>
						</GameContent>
					</GameCard>
				))}
			</GamesGrid>
		</GamesContainer>
	)
}
