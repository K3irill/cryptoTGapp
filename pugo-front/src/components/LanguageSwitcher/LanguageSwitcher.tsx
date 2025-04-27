import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
	SelectStyled,
	SelectButton,
	ActiveIndicator,
	TransitionOverlay,
	OptionsList,
	OptionItem,
} from './styled'
import { useTranslation } from 'next-i18next'

interface CustomSelectProps {
	options: { value: string; label: string; icon?: string }[]
	value: string
	onChange: (value: string) => Promise<void> | void
}

const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
	const { i18n } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const selectedOption =
		options.find(option => option.value === value) || options[0]

	const handleSelect = async (newValue: string) => {
		if (value === newValue || isTransitioning) {
			return
		}

		setIsTransitioning(true)
		setIsOpen(false)

		// Анимация перед сменой языка
		await new Promise(resolve => setTimeout(resolve, 800))

		await i18n.changeLanguage(newValue)

		await onChange(newValue)

		setIsTransitioning(false)
	}

	return (
		<>
			<AnimatePresence>
				{isTransitioning && (
					<TransitionOverlay
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8 }}
					/>
				)}
			</AnimatePresence>

			<SelectStyled $isTransitioning={isTransitioning}>
				<ActiveIndicator $active={true} $transitioning={isTransitioning} />

				<SelectButton
					$active={true}
					$disabled={isTransitioning}
					onClick={() => setIsOpen(!isOpen)}
					whileHover={{ scale: isTransitioning ? 1 : 1.05 }}
					whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
				>
					<motion.span
						className='icon'
						animate={{
							rotate: [0, 10, -5, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{ duration: 0.5 }}
					>
						{selectedOption.icon}
					</motion.span>
					<span className='text'>{selectedOption.label}</span>
					{/* <motion.span
						className='arrow'
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
					>
						▼
					</motion.span> */}
				</SelectButton>

				<AnimatePresence>
					{isOpen && (
						<OptionsList
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							{options.map(option => (
								<OptionItem
									key={option.value}
									$active={option.value === value}
									onClick={() => handleSelect(option.value)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{option.icon && <span className='icon'>{option.icon}</span>}
									<span className='text'>{option.label}</span>
								</OptionItem>
							))}
						</OptionsList>
					)}
				</AnimatePresence>

				<div className='cosmic-glow' />
				<div className='particles' />
			</SelectStyled>
		</>
	)
}

export default CustomSelect
