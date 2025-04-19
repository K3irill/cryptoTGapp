/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import {
	Box,
	Typography,
	Modal,
	Paper,
	List,
	ListItem,
	ListItemIcon,
} from '@mui/material'
import { CloseButtonWrapper, Content } from './styled'
import CloseButton from '../UI/CloseButton/CloseButton'

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: { xs: '90%', sm: '80%', md: '700px' },
	maxHeight: '90vh',
	overflowY: 'auto',
	background: `linear-gradient(135deg, #14001a 0%, #1b0030 100%)`,
	boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
	backdropFilter: 'blur(12px)',
	border: '1px solid rgba(255, 255, 255, 0.1)',
	p: { xs: 2, md: 4 },
	color: 'white',
	borderRadius: '16px',
}

interface BifsMinerGuideModalProps {
	isVisible: boolean
	onClose: () => void
}

export const BifsMinerGuideModal: React.FC<BifsMinerGuideModalProps> = ({
	isVisible,
	onClose,
}) => {
	const SectionHeader = ({ children }: { children: React.ReactNode }) => (
		<Typography
			variant='h5'
			component='h2'
			sx={{
				color: '#FFD700',
				fontWeight: 'bold',
				mt: 4,
				mb: 2,
				textAlign: 'center',
			}}
		>
			{children}
		</Typography>
	)

	return (
		<Modal open={isVisible} onClose={onClose}>
			<Box sx={modalStyle}>
				<CloseButtonWrapper>
					<CloseButton onClick={onClose} title='✕' />
				</CloseButtonWrapper>

				<Content>
					<Typography
						variant='h4'
						component='h1'
						sx={{
							color: '#0077ff',
							fontWeight: 'bold',
							mb: 3,
							textAlign: 'center',
						}}
					>
						🚀 CRYSTAL Miner: Как играть
					</Typography>

					<SectionHeader>🎯 Цель игры</SectionHeader>
					<Typography sx={{ mb: 2 }}>
						Нажимай по падающим объектам, чтобы собирать кристаллы BIFS и
						бонусы. Избегай ловушек и собирай как можно больше очков до
						окончания игры.
					</Typography>

					<SectionHeader>💎 Объекты</SectionHeader>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
						}}
					>
						{[
							{
								icon: '💎',
								name: 'BIFS кристалл',
								desc: 'Даёт +3 очка. Основная цель!',
							},
							{
								icon: '🔮',
								name: 'Большой кристалл',
								desc: 'Даёт больше очков.',
							},
							{
								icon: '🪨',
								name: 'Бело-красный кристалл',
								desc: '-100 очков! Лучше не трогать.',
							},
							{
								icon: '🌀',
								name: 'Чёрная дыра',
								desc: 'Уменьшает твой счёт в 2 раза.',
							},
							{
								icon: '👁️',
								name: 'Охотник',
								desc: 'Увеличивает лимит ошибок на 10.',
							},
							{
								icon: '♦️',
								name: 'Красный отравленный кристалл',
								desc: 'Игра заканчивается мгновенно!',
							},
						].map(item => (
							<Paper
								key={item.name}
								sx={{
									p: 2,
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid #ffffff22',
									borderRadius: '8px',
								}}
							>
								<Typography sx={{ fontWeight: 'bold', color: '#00bfff' }}>
									{item.icon} {item.name}
								</Typography>
								<Typography variant='body2' sx={{ color: '#bbb' }}>
									{item.desc}
								</Typography>
							</Paper>
						))}
					</Box>

					<SectionHeader>⚙️ Механики</SectionHeader>
					<List dense sx={{ color: '#ddd', mb: 2 }}>
						<ListItem>
							<ListItemIcon>🔥</ListItemIcon>
							<Typography>
								Комбо-механика: 5 удачных кликов подряд активируют бафф на +50%
								очков на 7 сек.
							</Typography>
						</ListItem>
						<ListItem>
							<ListItemIcon>⏱️</ListItemIcon>
							<Typography>
								Сложность увеличивается со временем и уровнем.
							</Typography>
						</ListItem>
						<ListItem>
							<ListItemIcon>📉</ListItemIcon>
							<Typography>
								Законченный лимит пропущенных кристаллов — игра закончится.
							</Typography>
						</ListItem>
					</List>

					<SectionHeader>📊 Подсчёт очков</SectionHeader>
					<Typography sx={{ mb: 1 }}>
						Каждый объект приносит или отнимает очки. Используй комбо, чтобы
						увеличить эффективность!
					</Typography>

					<SectionHeader>💡 Советы</SectionHeader>
					<Box component='ul' sx={{ pl: 3, color: '#ccc' }}>
						<li>Старайся попадать точно — у каждого объекта есть хитбокс.</li>
						<li>Используй комбо-режим по максимуму.</li>
						<li>Охотник — полезен, не игнорируй его.</li>
						<li>
							Если видишь красный или бело-красный кристалл — лучше не
							рисковать.
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
						Crystal Miner v1.1 · © 2025 BIFS Ecosystem
					</Typography>
				</Content>
			</Box>
		</Modal>
	)
}

export default BifsMinerGuideModal
