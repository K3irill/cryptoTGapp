import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { updateTokens } from '@/store/slices/userSlice'
import { Coin } from '@/components/Coin/Coin'
import Button from '@/components/UI/Button/Button'
import { HomeProps } from './Home.d'
import { HomeStyled, BannerStyled, CoinSection, CoinCount } from './styled'
import { REQUEST_LINK } from '../../../constant'

export const Home: FunctionComponent<HomeProps> = ({ data, children }) => {
	const { id, tokens } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

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
		}, 10000)
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

	return (
		<HomeStyled>
			<BannerStyled>
				<Button
					href='https://dexscreener.com/'
					theme='transparent'
					title='TRADE'
				/>
				<Button href='https://t.me/pugo_official' theme='fill' title='NEWS' />
			</BannerStyled>
			<CoinSection>
				<Coin
					tokens={displayingTokens}
					setTokens={setDisplayingTokens}
					onActivity={resetInactivityTimer}
				/>
				{children}
				<CoinCount unit={tokens ? 'P' : ''}>
					{displayingTokens === null ? 'loading...' : Number(displayingTokens)}
				</CoinCount>
			</CoinSection>
			{children}
		</HomeStyled>
	)
}
