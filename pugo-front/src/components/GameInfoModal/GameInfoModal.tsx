/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CloseButtonWrapper, Content } from './styled'
import CloseButton from '../UI/CloseButton/CloseButton'
import { Button, Paper, List, ListItem, ListItemIcon } from '@mui/material'
import { useTranslation } from 'next-i18next'

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
	const { t, ready } = useTranslation('common')

	const guide = t('content', { returnObjects: true }).games.spacePug
		.spacePugGuide

	const SectionHeader = ({ children }: { children: React.ReactNode }) => (
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
						{guide.title}
					</Typography>

					{/* Goal Section */}
					<SectionHeader>{guide.sections.goal.title}</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						{guide.sections.goal.content}
					</Typography>

					{/* Controls Section */}
					<SectionHeader>{guide.sections.controls.title}</SectionHeader>
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
										{guide.sections.controls.items.up}
									</Typography>
								</ListItem>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>⬇️</ListItemIcon>
									<Typography color='white' variant='body2'>
										{guide.sections.controls.items.down}
									</Typography>
								</ListItem>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>⬅️</ListItemIcon>
									<Typography color='white' variant='body2'>
										{guide.sections.controls.items.left}
									</Typography>
								</ListItem>
								<ListItem sx={{ px: 0 }}>
									<ListItemIcon sx={{ minWidth: 30 }}>➡️</ListItemIcon>
									<Typography color='white' variant='body2'>
										{guide.sections.controls.items.right}
									</Typography>
								</ListItem>
							</List>
						</Paper>
					</Box>

					{/* Items Section */}
					<SectionHeader>{guide.sections.items.title}</SectionHeader>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
							mb: 3,
						}}
					>
						{guide.sections.items.list.map((item, index) => {
							const colors = [
								'#8c00ff',
								'#ff00ea',
								'#FF5252',
								'#FFD700',
								'#4CAF50',
								'#FF9800',
							]
							const icons = ['🪙', '💰', '❤️', '⚡', '⬆️', '⬇️']
							return (
								<Paper
									key={index}
									sx={{
										p: 2,
										background: `rgba(${hexToRgb(colors[index])}, 0.1)`,
										border: `1px solid ${colors[index]}`,
										borderRadius: '8px',
									}}
								>
									<Typography sx={{ color: colors[index], fontWeight: 'bold' }}>
										{icons[index]} {item.name}
									</Typography>
									<Typography variant='body2' sx={{ color: '#AAA' }}>
										{item.desc}
									</Typography>
								</Paper>
							)
						})}
					</Box>

					{/* Dangers Section */}
					<SectionHeader>{guide.sections.dangers.title}</SectionHeader>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
							mb: 3,
						}}
					>
						{guide.sections.dangers.list.map((item, index) => {
							const colors = ['#FF5722', '#e2a00f', '#0000ff', '#FF5252']
							const icons = ['🪨', '☄️', '🌀', '💀']
							return (
								<Paper
									key={index}
									sx={{
										p: 2,
										background: `rgba(${hexToRgb(colors[index])}, 0.1)`,
										border: `1px solid ${colors[index]}`,
										borderRadius: '8px',
									}}
								>
									<Typography sx={{ color: colors[index], fontWeight: 'bold' }}>
										{icons[index]} {item.name}
									</Typography>
									<Typography variant='body2' sx={{ color: '#AAA' }}>
										{item.desc}
									</Typography>
								</Paper>
							)
						})}
					</Box>

					{/* Tips Section */}
					<SectionHeader>{guide.sections.tips.title}</SectionHeader>
					<Box
						component='ul'
						sx={{ color: '#FFFFFF', pl: 2, '& li': { mb: 1 } }}
					>
						{guide.sections.tips.list.map((tip, index) => (
							<li key={index}>{tip}</li>
						))}
					</Box>

					{/* Scoring Section */}
					<SectionHeader>{guide.sections.scoring.title}</SectionHeader>
					<Typography sx={{ color: '#FFFFFF', mb: 2 }}>
						{guide.sections.scoring.content}
					</Typography>
					<Box
						component='ul'
						sx={{ color: '#FFFFFF', pl: 2, mb: 3, '& li': { mb: 1 } }}
					>
						{guide.sections.scoring.factors?.map((factor, index) => (
							<li key={index}>{factor}</li>
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
						{guide.footer}
					</Typography>
				</Content>
			</Box>
		</Modal>
	)
}

// Вспомогательная функция для преобразования hex в rgb
const hexToRgb = (hex: string) => {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return `${r}, ${g}, ${b}`
}
