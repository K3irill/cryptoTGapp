/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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
import {
	useActivateMiningMutation,
	useUpdateTokensMutation,
} from '@/store/services/api/userApi'
import { handleBuyTokens } from '@/utils/sendBotMessage'
import items from '../Roullete/items'

interface CaseModalProps {
	isVisible: boolean
	onClose: () => void
	title?: string
	text?: string
	btnText?: string
	imgSrc?: string
	caseType: 'coins' | 'days' | 'ships' | 'privileges'
	casePrice?: number
}

export const CaseModal: React.FC<CaseModalProps> = ({
	isVisible,
	onClose,
	title = 'CASE',
	text = 'BIFS COINS',
	btnText = 'ОТКРЫТЬ ЗА',
	imgSrc = '/store/cases/case-1.png',
	caseType,
	casePrice = 500,
	data,
}) => {
	const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
	const [isSpinning, setIsSpinning] = useState(false)
	const [showResult, setShowResult] = useState(false)
	const [showCaseItems, setShowCaseItems] = useState(false)
	const [prizeResult, setPrizeResult] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [caseItems, setCaseItems] = useState<string[]>([])
	const user = useSelector((state: RootState) => state.user)
	const [isProcessing, setIsProcessing] = useState(false)

	const getPrizeResult = (value: string) => {
		if (caseType === 'coins') {
			return value.match(/^\d+$/) ? parseInt(value, 10) : 0
		}
		if (caseType === 'days') {
			const match = value.match(/^days-(\d+)$/)
			return match ? parseInt(match[1], 10) : 0
		}
		if (caseType === 'privileges') {
			const match = value.match(/^privilege-(\d+)$/)
			return match ? parseInt(match[1], 10) : 0
		}
		return 0
	}
	const handleBuyModalClose = () => {
		setShowBuyModal(false)
	}
	const filteredItems = items =>
		Object.entries(items).filter(([key, value]) => {
			if (caseType === 'coins') return key.match(/^\d+$/)
			if (caseType === 'days') return key.startsWith('days-')
			if (caseType === 'privileges') return key.startsWith('privilege-')
			return false
		})
	useEffect(() => {
		const generateCaseItems = () => {
			const filteredItemsArr = filteredItems(items)

			setCaseItems(filteredItemsArr.map(([key]) => key))
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

	const handleDrop = useCallback((result: string) => {
		setPrizeResult(result)
	}, [])

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
			days: `/store/cases/${getPrizeResult(prizeResult)}.svg`,
			ships: '/ship-icon.png',
			privileges: `/store/privileges/${getPrizeResult(prizeResult)}.svg`,
		}
		return images[caseType] || '/coin-c.png'
	}, [prizeResult, caseType])

	const getPrizeName = useCallback(() => {
		if (!prizeResult) return ''

		const names = {
			coins: `${getPrizeResult(prizeResult)} ${data.caseResults.coins}`,
			days: `${getPrizeResult(prizeResult)} ${data.caseResults.days}`,
			ships: `Ship ${prizeResult.replace('Ship', '')}`,
			privileges: `${data.caseResults.privileges} ${getPrizeResult(
				prizeResult
			)}`,
		}

		return names[caseType] || prizeResult
	}, [caseType, prizeResult])

	const hasEnoughTokens = user.tokens && user.tokens >= casePrice
	const buttonText = !hasEnoughTokens
		? data.modals.notEnough
		: isSpinning
		? data.modals.opening
		: showResult
		? data.modals.close
		: `${data.modals.openBtn} ${casePrice} BIFS`

	if (!isVisible) return null

	return (
		<CaseModalStyled theme={caseType}>
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
					casePrice={casePrice}
				/>
				<CaseButtonWrapper>
					{caseType === 'privileges' && user.status === 10 ? (
						<h3>{data.modals.alreadyHaveStatus}</h3>
					) : (
						<MulticolouredButton
							theme={
								caseType === 'coins'
									? ''
									: caseType === 'days'
									? 'yellow'
									: caseType === 'privileges'
									? 'green'
									: !hasEnoughTokens
									? 'red'
									: ''
							}
							onClick={
								hasEnoughTokens
									? handleOpenRoulette
									: () => setShowBuyModal(true)
							}
						>
							{`${buttonText}  ${casePrice} BIFS`}
						</MulticolouredButton>
					)}
				</CaseButtonWrapper>

				{showResult && (
					<ResultModal>
						<ResultContent>
							<PrizeImage src={getPrizeImage()} alt='Prize' />
							<PrizeTitle>{data.modals.congrats}</PrizeTitle>
							<p style={{ color: 'white', marginBottom: '10px' }}>
								{data.modals.youWon} {getPrizeName()}
							</p>
							<MulticolouredButton onClick={handleCloseResult}>
								{data.modals.close}
							</MulticolouredButton>
						</ResultContent>
					</ResultModal>
				)}
				<CaseButtonWrapper>
					<MulticolouredButton
						theme='blue'
						onClick={() => setShowCaseItems(true)}
					>
						{data.modals.contentBtn}
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
								{data.modals.close}
							</MulticolouredButton>
						</CaseItemsWrapper>
					</CaseItemsModal>
				)}
			</Content>
			<BasicModal
				title={data.modals.buy_modal.title}
				text={data.modals.buy_modal.text}
				btnText={data.modals.buy_modal.btnText}
				isVisible={showBuyModal}
				onButtonClick={() => handleBuyTokens(500, 40000, user)}
				onClose={handleBuyModalClose}
			/>
		</CaseModalStyled>
	)
}
