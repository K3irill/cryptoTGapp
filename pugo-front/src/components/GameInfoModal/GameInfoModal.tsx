/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CloseButtonWrapper, Content } from './styled'
import CloseButton from '../UI/CloseButton/CloseButton'
import { Button, Paper, List, ListItem, ListItemIcon } from '@mui/material'

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

interface GameGuideModalProps {
	isVisible: boolean
	onClose: () => void
}

export const GameGuideModal: React.FC<GameGuideModalProps> = ({
	isVisible,
	onClose,
}) => {
	const SectionHeader = ({
		children,
		icon,
	}: {
		children: React.ReactNode
		icon?: string
	}) => (
		<Typography
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
			{icon && <span>{icon}</span>}
			{children}
		</Typography>
	)

	return (
		<Modal
			open={isVisible}
			onClose={onClose}
			aria-labelledby='game-guide-modal-title'
			aria-describedby='game-guide-modal-description'
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
							color: '#a600ff',
							fontWeight: 'bold',
							mb: 3,
							textAlign: 'center',
							textShadow: '0 0 10px rgba(0, 30, 255, 0.5)',
							position: 'relative',
							'&:after': {
								content: '""',
								position: 'absolute',
								bottom: -10,
								left: '25%',
								width: '50%',
								height: '2px',
								background:
									'linear-gradient(to right, transparent, #6a00ff, transparent)',
							},
						}}
					>
						👩‍🚀 Space Pug: Руководство по игре
					</Typography>

					{/* Основная цель игры */}
					<SectionHeader icon='🎯'>Цель игры</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Управляйте космическим кораблем мопса, собирайте кристаллы BIFS и
						избегайте опасностей! Чем дольше вы продержитесь, тем больше токенов
						заработаете.
					</Typography>

					{/* Управление */}
					<SectionHeader icon='🎮'>Управление</SectionHeader>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
							mb: 3,
						}}
					>
						<Paper
							sx={{
								p: 2,
								background: 'rgba(0, 191, 255, 0.1)',
								border: '1px solid rgba(0, 191, 255, 0.3)',
								borderRadius: '8px',
							}}
						>
							<Typography sx={{ color: '#00BFFF', fontWeight: 'bold' }}>
								🕹️ Основное управление
							</Typography>
							<List dense>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>⬆️</ListItemIcon>
									<Typography color='white' variant='body2'>
										Вверх
									</Typography>
								</ListItem>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>⬇️</ListItemIcon>
									<Typography color='white' variant='body2'>
										Вниз
									</Typography>
								</ListItem>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>⬅️</ListItemIcon>
									<Typography color='white' variant='body2'>
										Влево
									</Typography>
								</ListItem>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>➡️</ListItemIcon>
									<Typography color='white' variant='body2'>
										Вправо
									</Typography>
								</ListItem>
							</List>
						</Paper>
					</Box>

					{/* Предметы */}
					<SectionHeader icon='💎'>Предметы и бонусы</SectionHeader>
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
								icon: '🪙',
								name: 'Монеты BIFS',
								desc: 'Основная валюта игры',
								color: '#8c00ff',
							},
							{
								icon: '💰',
								name: 'Сумки с монетами',
								desc: 'Редкие и ценные',
								color: '#ff00ea',
							},
							{
								icon: '❤️',
								name: 'Аптечки',
								desc: 'Восстанавливают HP',
								color: '#FF5252',
							},
							{
								icon: '⚡',
								name: 'Бустер скорости',
								desc: 'Временное ускорение',
								color: '#FFD700',
							},
							{
								icon: '⬆️',
								name: 'Увеличитель',
								desc: 'Увеличивает размер корабля',
								color: '#4CAF50',
							},
							{
								icon: '⬇️',
								name: 'Уменьшитель',
								desc: 'Уменьшает размер корабля',
								color: '#FF9800',
							},
						].map(item => (
							<Paper
								key={item.name}
								sx={{
									p: 2,
									background: `rgba(${
										item.color === '#00BFFF'
											? '0, 191, 255, 0.1'
											: item.color === '#f200ff'
											? '242, 0, 255, 0.1'
											: item.color === '#FF5252'
											? '255, 82, 82, 0.1'
											: item.color === '#FFD700'
											? '255, 215, 0, 0.1'
											: item.color === '#4CAF50'
											? '76, 175, 80, 0.1'
											: '255, 152, 0, 0.1'
									})`,
									border: `1px solid ${item.color}`,
									borderRadius: '8px',
								}}
							>
								<Typography sx={{ color: item.color, fontWeight: 'bold' }}>
									{item.icon} {item.name}
								</Typography>
								<Typography variant='body2' sx={{ color: '#AAA' }}>
									{item.desc}
								</Typography>
							</Paper>
						))}
					</Box>

					{/* Опасности */}
					<SectionHeader icon='⚠️'>Опасности</SectionHeader>
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
								icon: '🪨',
								name: 'Астероиды',
								desc: 'Отнимают HP',

								color: '#FF5722',
							},
							{
								icon: '☄️',
								name: 'Огненные кометы',
								desc: 'Отнимают 99% HP',
								color: '#e2a00f',
							},
							{
								icon: '🌀',
								name: 'Черные дыры',
								desc: 'Уменьшают счет вдвое',
								color: '#0000ff',
							},
							{
								icon: '💀',
								name: 'Бомбы',
								desc: 'Мгновенный Game Over',
								color: '#FF5252',
							},
						].map(item => (
							<Paper
								key={item.name}
								sx={{
									p: 2,
									background: `rgba(${
										item.color === '#FF5252'
											? '255, 82, 82, 0.1'
											: item.color === '#9C27B0'
											? '156, 39, 176, 0.1'
											: item.color === '#212121'
											? '33, 33, 33, 0.1'
											: '255, 87, 34, 0.1'
									})`,
									border: `1px solid ${item.color}`,
									borderRadius: '8px',
								}}
							>
								<Typography sx={{ color: item.color, fontWeight: 'bold' }}>
									{item.icon} {item.name}
								</Typography>
								<Typography variant='body2' sx={{ color: '#AAA' }}>
									{item.desc}
								</Typography>
							</Paper>
						))}
					</Box>

					{/* Стратегии */}
					<SectionHeader icon='🧠'>Советы и стратегии</SectionHeader>
					<Box
						component='ul'
						sx={{
							color: '#FFFFFF',
							pl: 2,
							'& li': { mb: 1 },
						}}
					>
						<li>
							<strong>Собирайте аптечки</strong> - они помогут вам продержаться
							дольше
						</li>
						<li>
							<strong>Используйте ускорение</strong> - но помните, оно делает
							игру сложнее
						</li>
						<li>
							<strong>Избегайте черных дыр</strong> - они могут уничтожить ваш
							прогресс
						</li>
						<li>
							<strong>Следите за размером корабля</strong> - маленький корабль
							маневреннее, большой - проще попасть
						</li>
					</Box>

					{/* Статистика */}
					<SectionHeader icon='📊'>Система подсчета очков</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						Ваш итоговый счет зависит от нескольких факторов:
					</Typography>
					<Box
						component='ul'
						sx={{
							color: '#FFFFFF',
							pl: 2,
							mb: 3,
							'& li': { mb: 1 },
						}}
					>
						<li>
							<strong>Собранные кристаллы</strong>: Основной источник очков
						</li>
						<li>
							<strong>Время выживания</strong>: +1 очко каждую секунду
						</li>
					</Box>

					<Typography
						sx={{
							color: '#AAA',
							textAlign: 'center',
							mt: 4,
							fontSize: '0.8rem',
						}}
					>
						Space Pug v1.2 · © 2025 BIFS Ecosystem
					</Typography>
				</Content>
			</Box>
		</Modal>
	)
}
