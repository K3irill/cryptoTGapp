/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CloseButtonWrapper, Content, SocialLinks, Divider } from './styled'
import CloseButton from '../UI/CloseButton/CloseButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Link from 'next/link'
import { statusConfig } from '@/assets/constants/statusConfig'
import {
	Button,
	Chip,
	Paper,
	List,
	ListItem,
	ListItemIcon,
} from '@mui/material'
import { darkenColor, lightenColor } from '@/utils/utils'
import {
	useSetUserStatusMutation,
	useUpdateTokensMutation,
} from '@/store/services/api/userApi'

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: { xs: '90%', sm: '80%', md: '700px' },
	maxHeight: '90vh',
	overflowY: 'auto',
	background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
	boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
	backdropFilter: 'blur(10px)',
	border: '1px solid rgba(255, 255, 255, 0.1)',
	p: { xs: 2, md: 4 },
	color: 'white',
	borderRadius: '16px',
	'&::-webkit-scrollbar': {
		width: '8px',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: 'rgba(0, 191, 255, 0.5)',
		borderRadius: '4px',
	},
}

interface BasicModalProps {
	isVisible: boolean
	onClose: () => void
}

export const InfoModal: React.FC<BasicModalProps> = ({
	isVisible,
	onClose,
}) => {
	const user = useSelector((state: RootState) => state.user)
	const [setUserStatus] = useSetUserStatusMutation()
	const [updateTokens] = useUpdateTokensMutation()

	const setUserStatusOnServer = async (status: number) => {
		const roundedStatus = Math.round(Number(status))

		try {
			const response = await setUserStatus({
				telegramId: Number(user.id),
				status: roundedStatus,
			}).unwrap()

			if (!response.success) {
				throw new Error(response.error || 'Failed to set status')
			}
		} catch (error) {
			console.error('Setting status error:', error)
			throw error
		}
	}
	const updateTokensOnServer = async (
		delta: number,
		isPlus: boolean = true
	) => {
		const roundedDelta = Math.round(Number(delta))
		try {
			await updateTokens({
				telegramId: Number(user.id),
				amount: roundedDelta,
				isPlus: isPlus,
			}).unwrap()
		} catch (error) {
			console.error('Update tokens error:', error)
			throw error
		}
	}

	const handleBuyStatus = async (status, cost) => {
		if (status <= user.status) {
			return
		}

		if (user.tokens >= cost) {
			await updateTokensOnServer(cost, false)
			await setUserStatusOnServer(status)
		} else {
		}
	}
	const SectionHeader = ({
		children,
		id,
		icon,
	}: {
		children: React.ReactNode
		id?: string
		icon?: React.ReactNode
	}) => (
		<Typography
			id={id}
			variant='h5'
			component='h2'
			sx={{
				color: 'primary.main',
				fontWeight: 'bold',
				mt: 4,
				mb: 2,
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				'&:before': {
					content: '""',
					flex: 1,
					height: '1px',
					background: 'linear-gradient(to right, transparent, #00BFFF)',
					mr: 2,
				},
				'&:after': {
					content: '""',
					flex: 1,
					height: '1px',
					background: 'linear-gradient(to left, transparent, #00BFFF)',
					ml: 2,
				},
			}}
		>
			{icon && <span style={{ display: 'flex' }}>{icon}</span>}
			{children}
		</Typography>
	)

	return (
		<Modal
			open={isVisible}
			onClose={onClose}
			aria-labelledby='info-modal-title'
			aria-describedby='info-modal-description'
		>
			<Box sx={modalStyle}>
				<CloseButtonWrapper>
					<CloseButton onClick={onClose} title='✕' />
				</CloseButtonWrapper>

				<Content>
					<Typography
						variant='h4'
						component='h1'
						sx={{
							color: 'gold',
							fontWeight: 'bold',
							mb: 3,
							textAlign: 'center',
							textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
							position: 'relative',
							'&:after': {
								content: '""',
								position: 'absolute',
								bottom: -10,
								left: '25%',
								width: '50%',
								height: '2px',
								background:
									'linear-gradient(to right, transparent, gold, transparent)',
							},
						}}
					>
						🚀 Руководство по экосистеме BIFS
					</Typography>

					{/* Оглавление */}
					<Paper
						elevation={3}
						sx={{
							p: 2,
							mb: 4,
							background: 'rgba(0, 0, 0, 0.2)',
							borderLeft: '4px solid #00BFFF',
						}}
					>
						<Typography variant='h6' sx={{ color: '#f200ff', mb: 1 }}>
							<strong>📋 Содержание</strong>
						</Typography>
						<List dense sx={{ py: 0 }}>
							{[
								{
									id: 'tokens',
									text: 'Как заработать токены',
								},
								{
									id: 'value',
									text: 'Ценность токенов',
								},
								{
									id: 'privileges',
									text: 'Статусы и привилегии',
								},
								{
									id: 'invite',
									text: 'Реферальная программа',
								},
								{
									id: 'ads',
									text: 'Вознаграждения за рекламу',
								},
								{
									id: 'goals',
									text: 'Наши цели',
								},
								{
									id: 'bot',
									text: 'О боте BIF',
								},
							].map(item => (
								<ListItem key={item.id} sx={{ py: 0.5, px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30, color: '#f200ff' }}>
										{item.icon}
									</ListItemIcon>
									<Link
										href={`#${item.id}`}
										style={{ color: '#00BFFF', textDecoration: 'none' }}
									>
										<Typography variant='body2'>{item.text}</Typography>
									</Link>
								</ListItem>
							))}
						</List>
					</Paper>

					{/* Важное уведомление */}
					<SectionHeader id='tokens' icon='⚠️'>
						Важная информация
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Наше приложение находится в активной разработке. Некоторые функции
						могут быть недоступны, так как мы работаем над:
					</Typography>
					<ul style={{ color: '#FFFFFF', paddingLeft: 20, marginBottom: 16 }}>
						<li>Улучшением пользовательского опыта</li>
						<li>Добавлением новых способов заработка</li>
						<li>Повышением безопасности</li>
					</ul>
					<Typography sx={{ color: '#FFFFFF', fontStyle: 'italic' }}>
						Благодарим за терпение и поддержку, пока мы вместе строим будущее
						BIFS!
					</Typography>

					{/* Как заработать токены */}
					<SectionHeader id='tokens' icon='💰'>
						Как заработать токены
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Пополняйте баланс BIFS несколькими способами:
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
							mb: 3,
						}}
					>
						{[
							{
								title: 'Ежедневный майнинг',
								desc: 'Пассивный доход от автомайнинга',
								emoji: '⛏️',
							},
							{
								title: 'Рефералы',
								desc: 'Заработок с приглашенных друзей',
								emoji: '👥',
							},
							{
								title: 'Создание контента',
								desc: 'Вознаграждение за продвижение BIFS',
								emoji: '🎬',
							},
							{
								title: 'Задания в приложении',
								desc: 'Выполняйте миссии за токены',
								emoji: '✅',
							},
							{
								title: 'Открывайте кейсы',
								desc: 'Вы можете выиграть BIFS открывая кейсы!',
								emoji: '📦',
							},
						].map(item => (
							<Paper
								key={item.title}
								sx={{
									p: 2,
									background: 'rgba(0, 191, 255, 0.1)',
									border: '1px solid rgba(0, 191, 255, 0.3)',
									borderRadius: '8px',
								}}
							>
								<Typography sx={{ color: '#00BFFF', fontWeight: 'bold' }}>
									{item.emoji} {item.title}
								</Typography>
								<Typography variant='body2' sx={{ color: '#AAA' }}>
									{item.desc}
								</Typography>
							</Paper>
						))}
					</Box>

					{/* Ценность токенов */}
					<SectionHeader id='value' icon='💎'>
						Ценность токенов
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Токены BIFS дают доступ к эксклюзивным возможностям экосистемы:
					</Typography>
					<Box
						component='ul'
						sx={{
							color: '#FFFFFF',
							pl: 2,
							'& li': { mb: 1 },
						}}
					>
						<li>
							<strong>Премиум-функции:</strong> Расширенные возможности
							приложения
						</li>
						<li>
							<strong>Управление:</strong> Участие в принятии решений по проекту
						</li>
						<li>
							<strong>Биржевая торговля:</strong> Листинг на платформах в
							будущем
						</li>
						<li>
							<strong>Доступ к NFT:</strong> Получение цифровых коллекционных
							предметов
						</li>
					</Box>

					{/* Статусы и привилегии */}
					{/* Статусы и привилегии */}
					<SectionHeader id='privileges' icon='🏆'>
						Уровни статусов
					</SectionHeader>
					<Typography
						sx={{
							color: '#FFFFFF',
							mb: 3,
							textAlign: 'center',
							fontStyle: 'italic',
						}}
					>
						Повышайте статус для максимального заработка во всех активностях
					</Typography>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(2, 1fr)',
								md: 'repeat(3, 1fr)',
								lg: 'repeat(4, 1fr)',
							},
							gap: 3,
							mb: 4,
						}}
					>
						{Object.entries(statusConfig).map(([key, status]) => {
							const statusKey = parseInt(key)
							const isSpecialStatus = statusKey >= 8 // Для KING, LEGEND, GOD
							const hasGlow = status.glow

							return (
								<Paper
									key={key}
									elevation={4}
									sx={{
										p: 2,
										borderRadius: '12px',
										background: `
            linear-gradient(
              135deg, 
              ${darkenColor(status.color, 0.3)} 0%, 
              ${status.color} 100%
            )`,
										border: '1px solid',
										borderColor: lightenColor(status.color, 0.2),
										boxShadow: hasGlow
											? `0 4px 20px ${status.glowColor}`
											: '0 4px 10px rgba(0, 0, 0, 0.2)',
										transition: 'all 0.3s ease',
										position: 'relative',
										overflow: 'hidden',
										'&:hover': {
											transform: 'translateY(-5px)',
											boxShadow: hasGlow
												? `0 6px 25px ${status.glowColor}`
												: '0 6px 15px rgba(0, 0, 0, 0.3)',
										},
										...(hasGlow && {
											'&::before': {
												content: '""',
												position: 'absolute',
												top: '-50%',
												left: '-50%',
												width: '200%',
												height: '200%',
												background: `
                radial-gradient(
                  circle at center, 
                  ${status.glowColor}80 0%, 
                  transparent 70%
                )`,
												animation: 'rotate 10s linear infinite',
												zIndex: 0,
											},
										}),
									}}
								>
									<Box sx={{ position: 'relative', zIndex: 1 }}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												mb: 2,
												justifyContent: 'space-between',
											}}
										>
											<Typography
												variant='h6'
												sx={{
													color: status.textColor,
													fontWeight: 'bold',
													textShadow: hasGlow
														? `0 0 8px ${status.glowColor}`
														: 'none',
												}}
											>
												{status.name}
												{statusKey === 1 && '🌟'}
												{statusKey === 3 && '💎'}
												{statusKey === 5 && '⚡'}
												{statusKey === 7 && '💥'}
												{statusKey === 8 && '👑'}
												{statusKey === 9 && '🔥'}
												{statusKey === 10 && '☠️'}
                        {statusKey === 11 && '👾'}
											</Typography>
											<Chip
												label={`${status.requirements.minTokens.toLocaleString()}+`}
												size='small'
												sx={{
													fontWeight: 'bold',
													bgcolor: 'rgba(255, 255, 255, 0.2)',
													color: status.textColor,
													border: `1px solid ${lightenColor(
														status.color,
														0.3
													)}`,
												}}
											/>
										</Box>

										<Divider
											sx={{
												my: 1,
												bgcolor: lightenColor(status.color, 0.3),
												height: '1px',
											}}
										/>

										<Box sx={{ mt: 2 }}>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													mb: 2,
												}}
											>
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Typography
														variant='body2'
														sx={{ color: status.textColor, opacity: 0.8 }}
													>
														⛏️ Майнинг:
													</Typography>
												</Box>
												<Typography
													sx={{
														color: status.textColor,
														fontWeight: 'bold',
														fontSize: '1.1rem',
													}}
												>
													{status.miningAward.toLocaleString()}
													<Typography
														component='span'
														sx={{
															color: status.textColor,
															opacity: 0.7,
															fontSize: '0.7rem',
															ml: 0.5,
														}}
													>
														/день
													</Typography>
												</Typography>
											</Box>

											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													mb: 2,
												}}
											>
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Typography
														variant='body2'
														sx={{ color: status.textColor, opacity: 0.8 }}
													>
														👥 Рефералы:
													</Typography>
												</Box>
												<Typography
													sx={{
														color: status.textColor,
														fontWeight: 'bold',
														fontSize: '1.1rem',
													}}
												>
													{status.referralAward.toLocaleString()}
													<Typography
														component='span'
														sx={{
															color: status.textColor,
															opacity: 0.7,
															fontSize: '0.7rem',
															ml: 0.5,
														}}
													>
														/приглашение
													</Typography>
												</Typography>
											</Box>

											{statusKey > 1 && (
												<Button
													fullWidth
													variant='contained'
													size='small'
													disabled={
														statusKey <= user.status ||
														user.tokens < status.requirements.minTokens
													}
													onClick={() =>
														handleBuyStatus(
															statusKey,
															status.requirements.minTokens
														)
													}
													sx={{
														mt: 2,
														bgcolor: 'rgba(255, 255, 255, 0.15)',
														color: status.textColor,
														border: `1px solid ${lightenColor(
															status.color,
															0.3
														)}`,
														fontWeight: 'bold',
														'&:hover': {
															bgcolor:
																statusKey <= user.status ||
																user.tokens < status.requirements.minTokens
																	? 'rgba(255, 255, 255, 0.15)' // Отключаем hover, если кнопка disabled
																	: 'rgba(255, 255, 255, 0.25)',
														},
														'&.Mui-disabled': {
															color: `${status.textColor} !important`,
															opacity: 0.7,
															borderColor: `${lightenColor(
																status.color,
																0.1
															)} !important`,
														},
													}}
												>
													{statusKey > user.status
														? user.tokens >= status.requirements.minTokens
															? `Повысить до ${status.name}`
															: 'Недостаточно токенов'
														: `Получено`}
												</Button>
											)}
										</Box>
									</Box>
								</Paper>
							)
						})}
					</Box>

					<style jsx global>{`
						@keyframes rotate {
							from {
								transform: rotate(0deg);
							}
							to {
								transform: rotate(360deg);
							}
						}
					`}</style>

					{/* Реферальная программа */}
					<SectionHeader id='invite' icon='👥'>
						Реферальная программа
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Приглашайте друзей и зарабатывайте вместе:
					</Typography>
					<Box
						sx={{
							p: 2,
							mb: 3,
							background: 'rgba(0, 191, 255, 0.1)',
							borderRadius: '8px',
							border: '1px dashed #00BFFF',
						}}
					>
						<Typography sx={{ color: '#00BFFF', fontStyle: 'italic' }}>
							Приглашайте друзей и получайте <strong>бонусные токены</strong>,
							когда они:
						</Typography>
						<Box
							component='ul'
							sx={{
								color: '#FFFFFF',
								pl: 2,
								mt: 1,
								'& li': { mb: 1 },
							}}
						>
							<li>Завершат регистрацию</li>
						</Box>
						<Typography
							sx={{
								color: '#FFFFFF',
								mt: 1,
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Используйте команду{' '}
							<span style={{ color: '#f200ff' }}>/invite</span> в боте
						</Typography>
					</Box>

					{/* Вознаграждения за рекламу */}
					<SectionHeader id='ads' icon='📢'>
						Программа для создателей контента
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Зарабатывайте токены, продвигая BIFS через:
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
							mb: 3,
						}}
					>
						{[
							{
								title: 'Соцсети',
								desc: 'Посты в Twitter, Telegram и др.',
								reward: '1000-10,000 токенов',
							},
							{
								title: 'Видео',
								desc: 'Обзоры на YouTube/TikTok',
								reward: '5000-100,000 токенов',
							},
							{
								title: 'Статьи',
								desc: 'Блог-посты и руководства',
								reward: '1,000-25,000 токенов',
							},
							{
								title: 'Сообщество',
								desc: 'Активная модерация групп',
								reward: 'Ежемесячный бонус',
							},
						].map(item => (
							<Paper
								key={item.title}
								sx={{
									p: 2,
									background: 'rgba(0, 191, 255, 0.05)',
									border: '1px solid rgba(0, 191, 255, 0.2)',
									borderRadius: '8px',
								}}
							>
								<Typography sx={{ color: '#00BFFF', fontWeight: 'bold' }}>
									{item.title}
								</Typography>
								<Typography variant='body2' sx={{ color: '#AAA', mb: 1 }}>
									{item.desc}
								</Typography>
								<Typography variant='body2' sx={{ color: '#f200ff' }}>
									Награда: {item.reward}
								</Typography>
							</Paper>
						))}
					</Box>
					<Typography
						sx={{
							color: '#FFFFFF',
							fontStyle: 'italic',
							textAlign: 'center',
							mb: 3,
						}}
					>
						Отправляйте контент через команду{' '}
						<span style={{ color: '#f200ff' }}>/earn</span>
					</Typography>

					{/* Наши цели */}
					<SectionHeader id='goals' icon='🌌'>
						Видение проекта
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Наша дорожная карта включает амбициозные этапы:
					</Typography>
					<Box
						sx={{
							background: 'rgba(0, 0, 0, 0.3)',
							p: 2,
							borderRadius: '8px',
							mb: 3,
						}}
					>
						{[
							{
								title: 'Q2 2025',
								items: [
									'Веб-сайт',
                  'Телаграм бот BIFS',
									'Релиз мобильного Telegram-приложения с мини-игрой "Space Pug"',
									'Базовая реферальная система',
								],
							},
							{
								title: 'Q3 2025',
								items: [
									'Листинг на BLUM',
									'Первые аирдропы',
									'Стейкинг токенов',
									'Первый листинг на централизованной бирже',
                 'Конкурс трейдеров с призами в BIFS'
								],
							},
							{
								title: 'Q4 2025',
								items: [
									'NFT-коллекция "Космические мопсы"',
									'Продвинутые DeFi-функции',
                  'Турнирная система с розыгрышем эксклюзивных NFT',
									'Листинг на крупных биржах',
                   'Сюрпризный ивент "Тайна черной дыры"'
								],
							},
						].map(quarter => (
							<Box key={quarter.title} sx={{ mb: 2 }}>
								<Typography
									sx={{
										color: '#00BFFF',
										fontWeight: 'bold',
										mb: 1,
									}}
								>
									{quarter.title}
								</Typography>
								<Box
									component='ul'
									sx={{
										color: '#FFFFFF',
										pl: 2,
										'& li': {
											mb: 0.5,
											position: 'relative',
											pl: '20px',
											'&:before': {
												content: '"»"',
												position: 'absolute',
												left: 0,
												color: '#00BFFF',
											},
										},
									}}
								>
									{quarter.items.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</Box>
							</Box>
						))}
					</Box>

					{/* О боте BIF */}
					<SectionHeader id='bot' icon='🤖'>
						Возможности бота BIF
					</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Ваш персональный помощник для всех активностей BIFS:
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
							mb: 3,
						}}
					>
						{[
							{
								command: '/balance',
								desc: 'Проверка баланса и истории',
								color: '#00BFFF',
							},
							{
								command: '/mining',
								desc: 'Управление автомайнингом',
								color: '#00BFFF',
							},
							{
								command: '/invite',
								desc: 'Создание реферальных ссылок',
								color: '#f200ff',
							},
							{
								command: '/earn',
								desc: 'Отправка контента для наград',
								color: '#f200ff',
							},
							{
								command: '/store',
								desc: 'Покупка токенов и статусов',
								color: '#FFD700',
							},
							{
								command: '/support',
								desc: 'Помощь от нашей команды',
								color: '#FFD700',
							},
						].map(feature => (
							<Paper
								key={feature.command}
								sx={{
									p: 2,
									background: 'rgba(0, 0, 0, 0.2)',
									borderLeft: `3px solid ${feature.color}`,
									borderRadius: '4px',
								}}
							>
								<Typography
									sx={{
										color: feature.color,
										fontWeight: 'bold',
										mb: 0.5,
									}}
								>
									{feature.command}
								</Typography>
								<Typography variant='body2' sx={{ color: '#AAA' }}>
									{feature.desc}
								</Typography>
							</Paper>
						))}
					</Box>

					{/* Социальные сети */}
					<SectionHeader id='socials' icon='🌐'>
						Наши сообщества
					</SectionHeader>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							gap: 3,
							mt: 3,
							mb: 2,
							flexWrap: 'wrap',
						}}
					>
						{[
							{
								name: 'Telegram Канал',
								url: 'https://t.me/BIFScryptoSpace',
								icon: '📢',
							},
              {
                name: 'Сайт',
                url: 'https://bifscoin.ru',
                icon: '🌐',
              },
							// {
							// 	name: 'Twitter',
							// 	url: 'https://twitter.com',
							// 	icon: '🐦',
							// },
							// {
							// 	name: 'Discord',
							// 	url: 'https://discord.gg',
							// 	icon: '💬',
							// },
              
						].map(social => (
							<Link
								key={social.name}
								href={social.url}
								target='_blank'
								rel='noopener noreferrer'
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant='outlined'
									startIcon={<span>{social.icon}</span>}
									sx={{
										color: '#00BFFF',
										borderColor: '#00BFFF',
										'&:hover': {
											bgcolor: 'rgba(0, 191, 255, 0.1)',
											borderColor: '#00BFFF',
										},
									}}
								>
									{social.name}
								</Button>
							</Link>
						))}
					</Box>

					<Typography
						sx={{
							color: '#AAA',
							textAlign: 'center',
							mt: 4,
							fontSize: '0.8rem',
						}}
					>
						Экосистема BIFS v1.0 · © 2025 Все права защищены
					</Typography>
				</Content>
			</Box>
		</Modal>
	)
}
