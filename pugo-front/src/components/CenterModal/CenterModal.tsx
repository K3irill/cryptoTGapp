import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CloseButtonWrapper, Content, PugImage } from './styled'
import MulticolouredButton from '../UI/MulticolouredButton/MulticolouredButton'
import zIndex from '@mui/material/styles/zIndex'
import CloseButton from '../UI/CloseButton/CloseButton'
import { handleAutomining } from '@/utils/sendBotMessage'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useTranslation } from 'next-i18next'

interface BasicModalProps {
	isVisible: boolean
	onClose: () => void
	title?: string
	text?: string
	btnText?: string
	onButtonClick?: () => void
	imgSrc?: string
	background?: string
}

export const BasicModal: React.FC<BasicModalProps> = ({
	isVisible,
	onClose,
	title,
	text,
	btnText,
	onButtonClick,
	imgSrc,
	background,
}) => {
	const user = useSelector((state: RootState) => state.user)
  const { t, ready } = useTranslation('common')
  
	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 320,
		background: background || `url(/backgrounds/space.png)`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		// border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		color: 'white',
		borderRadius: '10px',
		overflow: 'hidden',
	}

	return (
		<Modal
			open={isVisible}
			onClose={(event, reason) => {
				if (reason === 'backdropClick') return
				onClose()
			}}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={modalStyle}>
				<CloseButtonWrapper>
					<CloseButton onClick={onClose} title='X' />
				</CloseButtonWrapper>

				<Content>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{title && title}
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						{text && text}
					</Typography>
					<MulticolouredButton
						title={btnText && btnText}
						onClick={
							onButtonClick ? onButtonClick : () => handleAutomining(user, t)
						}
					/>
				</Content>
				<PugImage src={imgSrc && imgSrc} />
			</Box>
		</Modal>
	)
}
