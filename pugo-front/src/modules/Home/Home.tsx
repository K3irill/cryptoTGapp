import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { updateTokens } from '@/store/slices/userSlice'
import { Coin } from '@/components/Coin/Coin'
import Button from '@/components/UI/Button/Button'
import { HomeProps } from './Home.d'

import { styled } from '@mui/material/styles'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch, { SwitchProps } from '@mui/material/Switch'

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
	const IOSSwitch = styled((props: SwitchProps) => (
		<Switch
			focusVisibleClassName='.Mui-focusVisible'
			disableRipple
			{...props}
		/>
	))(({ theme }) => ({
		width: 42,
		height: 26,
		padding: 0,
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: 2,
			transitionDuration: '300ms',
			'&.Mui-checked': {
				transform: 'translateX(16px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					backgroundColor: '#33cacf',
					opacity: 1,
					border: 0,
					...theme.applyStyles('dark', {
						backgroundColor: '#33cacf',
					}),
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5,
				},
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				color: '#33cacf',
				border: '6px solid #fff',
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: theme.palette.grey[100],
				...theme.applyStyles('dark', {
					color: theme.palette.grey[600],
				}),
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.7,
				...theme.applyStyles('dark', {
					opacity: 0.3,
				}),
			},
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: 22,
			height: 22,
		},
		'& .MuiSwitch-track': {
			borderRadius: 26 / 2,
			backgroundColor: '#E9E9EA',
			opacity: 1,
			transition: theme.transitions.create(['background-color'], {
				duration: 500,
			}),
			...theme.applyStyles('dark', {
				backgroundColor: '#39393D',
			}),
		},
	}))
	return (
		<HomeStyled>
			<BannerStyled>
				{/* <Button
					href='https://dexscreener.com/'
					theme='transparent'
					title='TRADE'
				/>
				<Button href='https://t.me/pugo_official' theme='fill' title='NEWS' /> */}
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
							In TON: <span>$1,500</span>
						</ReturnStyled>
						<NDXStyled>
							NDX: <span>+7,50%</span>
						</NDXStyled>
					</CoinCountInfo>
				</CoinCountInfoWrapper>
				<Coin />
				<ActivityWrapper>
					<CoinName>MAJESTIC</CoinName>
					<AutoMining>
						<AutoMiningText>Auto-Mining</AutoMiningText>
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
							label=''
						/>
					</AutoMining>
				</ActivityWrapper>
				{children}
			</CoinSection>
			{children}
		</HomeStyled>
	)
}
