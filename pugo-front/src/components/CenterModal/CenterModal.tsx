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

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 320,
	background: `url(/backgrounds/space.png)`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	// border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	color: 'white',
	borderRadius: '10px',
	overflow: 'hidden',
}

interface BasicModalProps {
	isVisible: boolean
	onClose: () => void
}

export const BasicModal: React.FC<BasicModalProps> = ({
	isVisible,
	onClose,
}) => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<Modal
			open={isVisible}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={modalStyle}>
				<CloseButtonWrapper>
					<CloseButton onClick={onClose} title='X' />
				</CloseButtonWrapper>
				<Content>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Авто-майнинг недоступен
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Чтобы использовать авто-майнинг, необходимо приобрести эту функцию..
					</Typography>
					<MulticolouredButton
						title='КУПИТЬ'
						onClick={() => handleAutomining(user)}
					/>
				</Content>
				<PugImage src='/pugs/stop-pug.png' />
			</Box>
		</Modal>
	)
}
