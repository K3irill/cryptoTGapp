import React, { useState, useCallback, useEffect } from 'react'
import { Roulette } from '../Roullete/Roullete'
import {
	CaseModalStyled,
	CaseModalTitle,
	CasePreviewWrapper,
	CloseButtonWrapper,
	Content,
	ResultModal,
	ResultContent,
	PrizeImage,
	PrizeTitle,
	CaseInfo,
	CaseButtonWrapper,
	CaseItemsWrapper,
	CaseItems,
	CaseItemsModal,
} from './styled'
import CloseButton from '../UI/CloseButton/CloseButton'
import MulticolouredButton from '../UI/MulticolouredButton/MulticolouredButton'
import Item from '../Roullete/Item'

import { useSelector } from 'react-redux'
import { REQUEST_LINK } from '../../../constant'
import { RootState } from '@/store/store'
import { BasicModal } from '../CenterModal/CenterModal'

interface CaseModalProps {
	isVisible: boolean
	onClose: () => void
	title?: string
	text?: string
	btnText?: string
	imgSrc?: string
	caseType: 'coins' | 'days' | 'ships'
	casePrice?: number
}

export const CaseModal: React.FC<CaseModalProps> = ({
	isVisible,
	onClose,
	title = 'CASE',
	text = 'BIFS COINS',
	btnText = 'ОТКРЫТЬ ЗА 500 BIFS',
	imgSrc = '/store/cases/case-1.png',
	caseType,
	casePrice = 500,
}) => {
	const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
	const [isSpinning, setIsSpinning] = useState(false)
	const [showResult, setShowResult] = useState(false)
	const [showCaseItems, setShowCaseItems] = useState(false)
	const [prizeResult, setPrizeResult] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [caseItems, setCaseItems] = useState<string[]>([])
	const { id, tokens } = useSelector((state: RootState) => state.user)
	const [isProcessing, setIsProcessing] = useState(false)

	const handleBuyModalClose = () => {
		setShowBuyModal(false)
	}

	const updateTokensOnServer = async (
		delta: number,
		isPlus: boolean = true
	) => {
		try {
			const roundedDelta = Number(delta)
			const response = await fetch(`${REQUEST_LINK}/api/user/update-tokens`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					telegramId: Number(id),
					amount: roundedDelta,
					isPlus: isPlus,
				}),
			})
			const data = await response.json()

			if (data.success) {
				// dispatch(updateTokens(roundedDelta))
			} else {
				console.error('Ошибка при обновлении токенов на сервере')
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса на сервер:', error)
		}
	}

	useEffect(() => {
		const generateCaseItems = () => {
			const chances = {
				coins: {
					50: 400,
					150: 350,
					250: 300,
					500: 250,
					1000: 150,
					1500: 100,
					2000: 50,
					4000: 30,
					6000: 20,
					8000: 10,
					10000: 2,
					15000: 1,
					20000: 1,
					40000: 0.8,
					60000: 0.5,
					80000: 0.3,
					100000: 0.1,
				},
				days: {
					7: 60,
					21: 30,
					30: 10,
				},
				ships: {
					Ship1: 20,
					Ship2: 20,
					Ship3: 20,
					Ship4: 20,
					Ship5: 20,
				},
			}

			setCaseItems(Object.keys(chances[caseType]))
		}

		generateCaseItems()
	}, [caseType])

	const handleOpenRoulette = useCallback(async () => {
		if (isSpinning || isProcessing) return

		try {
			setIsProcessing(true)

			setIsSpinning(true)
			setShowResult(false)
			setPrizeResult('')
			setIsOpen(true)
		} catch (error) {
			console.error('Ошибка при открытии кейса:', error)
		} finally {
			setIsProcessing(false)
		}
	}, [isSpinning, isProcessing, casePrice])

	const handleDrop = useCallback(
		async (result: string) => {
			setPrizeResult(result)

			if (caseType !== 'coins') return

			try {
				const prizeAmount = parseInt(result, 10)
				if (isNaN(prizeAmount)) {
					throw new Error('Invalid prize amount')
				}

				const delta = Math.abs(prizeAmount - casePrice)
				const isWin = prizeAmount > casePrice

				await updateTokensOnServer(delta, isWin)
			} catch (error) {
				console.error('Ошибка при начислении выигрыша:', error)
				alert('Произошла ошибка. Попробуйте ещё раз.')
			}
		},
		[caseType, casePrice]
	)

	const handleAnimationEnd = useCallback(() => {
		setIsSpinning(false)
		setShowResult(true)
	}, [])

	const handleCloseModal = useCallback(() => {
		setIsSpinning(false)
		setShowResult(false)
		setPrizeResult('')
		setIsOpen(false)
		onClose()
	}, [onClose])

	const handleCloseResult = useCallback(() => {
		setShowResult(false)
	}, [])

	const getPrizeImage = useCallback(() => {
		const images = {
			coins: '/coin-c.png',
			days: '/day-icon.png',
			ships: '/ship-icon.png',
		}
		return images[caseType] || '/coin-c.png'
	}, [caseType])

	const getPrizeName = useCallback(() => {
		if (!prizeResult) return ''

		const names = {
			coins: `${prizeResult} BIFS Coins`,
			days: `${prizeResult} Days Auto-Mining`,
			ships: `Ship ${prizeResult.replace('Ship', '')}`,
		}

		return names[caseType] || prizeResult
	}, [caseType, prizeResult])

	const hasEnoughTokens = tokens && tokens >= casePrice
	const buttonText = !hasEnoughTokens
		? 'НЕ ХВАТАЕТ BIFS'
		: isSpinning
		? 'ОТКРЫВАЕМ...'
		: showResult
		? 'ЗАКРЫТЬ'
		: btnText

	if (!isVisible) return null

	return (
		<CaseModalStyled>
			<CloseButtonWrapper>
				{!showCaseItems && <CloseButton onClick={handleCloseModal} title='X' />}
			</CloseButtonWrapper>

			<Content>
				<CaseInfo>
					<CaseModalTitle>
						<h2>{title}</h2>
						<p>{text}</p>
					</CaseModalTitle>
					<CasePreviewWrapper>
						<img src={imgSrc} alt='Case' />
					</CasePreviewWrapper>
				</CaseInfo>

				<Roulette
					caseType={caseType}
					onDrop={handleDrop}
					isSpinning={isSpinning}
					onAnimationEnd={handleAnimationEnd}
				/>

				<CaseButtonWrapper>
					<MulticolouredButton
						theme={hasEnoughTokens ? '' : 'red'}
						onClick={
							hasEnoughTokens ? handleOpenRoulette : () => setShowBuyModal(true)
						}
					>
						{buttonText}
					</MulticolouredButton>
				</CaseButtonWrapper>

				{showResult && (
					<ResultModal>
						<ResultContent>
							<PrizeImage src={getPrizeImage()} alt='Prize' />
							<PrizeTitle>Поздравляем!</PrizeTitle>
							<p style={{ color: 'white', marginBottom: '10px' }}>
								Вы выиграли: {getPrizeName()}
							</p>
							<MulticolouredButton onClick={handleCloseResult}>
								Закрыть
							</MulticolouredButton>
						</ResultContent>
					</ResultModal>
				)}

				<CaseButtonWrapper>
					<MulticolouredButton
						theme='blue'
						onClick={() => setShowCaseItems(true)}
					>
						СОДЕРЖАНИЕ КЕЙСА
					</MulticolouredButton>
				</CaseButtonWrapper>

				{showCaseItems && (
					<CaseItemsModal>
						<CaseItemsWrapper>
							<CaseItems>
								{caseItems.map((item, i) => (
									<Item name={item} key={`case-item-${item}-${i}`} />
								))}
							</CaseItems>
							<MulticolouredButton
								theme='blue'
								onClick={() => setShowCaseItems(false)}
							>
								Закрыть
							</MulticolouredButton>
						</CaseItemsWrapper>
					</CaseItemsModal>
				)}
			</Content>
			<BasicModal
				title='Не хватает монет BIFS'
				text='Вы можете заработать монеты в играх, приглашая друзей, рекламируя нас или приобрести в Маркете'
				btnText='Приобрести'
				isVisible={showBuyModal}
				onClose={handleBuyModalClose}
			/>
		</CaseModalStyled>
	)
}
