import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { updateTokens } from '@/store/slices/userSlice'
import { Coin } from '@/components/Coin/Coin'
import Button from '@/components/UI/Button/Button'
import { HomeProps } from './Home.d'

import FormControlLabel from '@mui/material/FormControlLabel'

import {
	HomeStyled,
	BannerStyled,
	CoinSection,
	CoinCount,
	CoinName,
	ActivityWrapper,
	AutoMining,
	AutoMiningText,
	CoinCountInfo,
	CoinCountInfoWrapper,
	ReturnStyled,
	NDXStyled,
} from './styled'
import { REQUEST_LINK } from '../../../constant'

import IOSSwitch from '@/components/IOSSwitch/IOSSwitch'
import { BasicModal } from '@/components/CenterModal/CenterModal'
import toast, { Toaster } from 'react-hot-toast'
import GamesSlider from '@/components/GamesSlider/GamesSlider'

export const Home: FunctionComponent<HomeProps> = ({ data, children }) => {
	const { id, tokens, automining } = useSelector(
		(state: RootState) => state.user
	)
	console.log(data)
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [isSwitchOn, setIsSwitchOn] = useState<boolean>(automining || false)
	const [displayingTokens, setDisplayingTokens] = useState<number>(tokens || 0)
	const [initialTokens, setInitialTokens] = useState<number>(tokens || 0)
	const inactivityTimer = useRef<NodeJS.Timeout | null>(null)

	const updateTokensOnServer = async (delta: number) => {
		try {
			const roundedDelta = Number(delta)
			const response = await fetch(`${REQUEST_LINK}/api/user/update-tokens`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					telegramId: id,
					amount: roundedDelta,
				}),
			})
			const data = await response.json()

			if (data.success) {
				console.log(`УСПЕШНО отправляю ${roundedDelta}`)
				dispatch(updateTokens(roundedDelta))
			} else {
				console.error('Ошибка при обновлении токенов на сервере')
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса на сервер:', error)
		}
	}

	const resetInactivityTimer = () => {
		if (inactivityTimer.current) {
			clearTimeout(inactivityTimer.current)
		}

		inactivityTimer.current = setTimeout(() => {
			const delta = displayingTokens - initialTokens
			if (delta > 0) {
				updateTokensOnServer(delta)
				setInitialTokens(displayingTokens)
			}
		}, 5000)
	}

	useEffect(() => {
		return () => {
			if (inactivityTimer.current) {
				clearTimeout(inactivityTimer.current)
			}
		}
	}, [])

	useEffect(() => {
		if (tokens !== displayingTokens) {
			setDisplayingTokens(tokens || 0)
			setInitialTokens(tokens || 0)
		}
	}, [tokens])

	// Обработчик для IOSSwitch
	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (automining) return toast(`🤑${data.mining.notification}`)
		const isChecked = event.target.checked
		setIsSwitchOn(isChecked)
		setShowModal(isChecked)
	}

	const handleModalClose = () => {
		setShowModal(false)
		setIsSwitchOn(false)
	}

	return (
		<>
			<HomeStyled>
				<BannerStyled>
					{/* <Button
            href='https://dexscreener.com/'
            theme='transparent'
            title='TRADE'
          />
          <Button href='https://t.me/pugo_official' theme='fill' title='NEWS' /> */}
					<GamesSlider content={data.gameSlider} />
				</BannerStyled>
				<CoinSection>
					<CoinCountInfoWrapper>
						<CoinCount unit={tokens ? 'P' : ''}>
							{displayingTokens === null
								? 'loading...'
								: Number(displayingTokens)}
						</CoinCount>
						<CoinCountInfo>
							<ReturnStyled>
								In TON: <span>$?</span>
							</ReturnStyled>
							<NDXStyled>
								NDX: <span>+?%</span>
							</NDXStyled>
						</CoinCountInfo>
					</CoinCountInfoWrapper>
					<Coin />
					<ActivityWrapper>
						<CoinName>BIFSCOIN</CoinName>
						<AutoMining>
							<AutoMiningText>{data.mining.text}</AutoMiningText>
							<FormControlLabel
								control={
									<IOSSwitch
										checked={isSwitchOn}
										onChange={handleSwitchChange}
										sx={{ m: 1 }}
									/>
								}
								label=''
							/>
						</AutoMining>
					</ActivityWrapper>

					{children}
				</CoinSection>

				{/* Модальное окно */}

				<BasicModal
					btnText={data.basicModal.btnText}
					title={data.basicModal.title}
					text={data.basicModal.text}
					isVisible={showModal}
					onClose={handleModalClose}
					imgSrc='/pugs/stop-pug.png'
				/>
				<Toaster />
				{children}
			</HomeStyled>
		</>
	)
}
