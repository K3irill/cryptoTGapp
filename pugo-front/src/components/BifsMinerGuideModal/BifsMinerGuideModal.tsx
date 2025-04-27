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
import { useTranslation } from 'next-i18next'

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

const BifsMinerGuideModal: React.FC<BifsMinerGuideModalProps> = ({
	isVisible,
	onClose,
}) => {
	const { t, ready } = useTranslation('common')
	const guide = t('content', { returnObjects: true }).games.bifsMiner
		.crystalMinerGuide

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

	const objectIcons = ['💎', '🔮', '🪨', '🌀', '👁️', '♦️']
	const mechanicIcons = ['🔥', '⏱️', '📉']

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
						{guide.title}
					</Typography>

					<SectionHeader>{guide.sections.goal.title}</SectionHeader>
					<Typography sx={{ mb: 2 }}>{guide.sections.goal.content}</Typography>

					<SectionHeader>{guide.sections.objects.title}</SectionHeader>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
							gap: 2,
						}}
					>
						{guide.sections.objects.items.map((item, index) => (
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
									{objectIcons[index]} {item.name}
								</Typography>
								<Typography variant='body2' sx={{ color: '#bbb' }}>
									{item.desc}
								</Typography>
							</Paper>
						))}
					</Box>

					<SectionHeader>{guide.sections.mechanics.title}</SectionHeader>
					<List dense sx={{ color: '#ddd', mb: 2 }}>
						{guide.sections.mechanics.items.map((item, index) => (
							<ListItem key={index}>
								<ListItemIcon>{mechanicIcons[index]}</ListItemIcon>
								<Typography>{item}</Typography>
							</ListItem>
						))}
					</List>

					<SectionHeader>{guide.sections.scoring.title}</SectionHeader>
					<Typography sx={{ mb: 1 }}>
						{guide.sections.scoring.content}
					</Typography>

					<SectionHeader>{guide.sections.tips.title}</SectionHeader>
					<Box component='ul' sx={{ pl: 3, color: '#ccc' }}>
						{guide.sections.tips.items.map((tip, index) => (
							<li key={index}>{tip}</li>
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

export default BifsMinerGuideModal
