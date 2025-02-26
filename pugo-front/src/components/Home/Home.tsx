import React, { FunctionComponent, useEffect } from 'react'
import { BannerStyled, CoinCount, CoinSection, HomeStyled } from './styled'
import { HomeProps } from './Home.d'
import { Coin } from '../Coin/Coin'
import Button from '../UI/Button/Button'

import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

export const Home: FunctionComponent<HomeProps> = ({ data, children }) => {
	const { tokens } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	console.log(tokens)
	return (
		<HomeStyled>
			<BannerStyled>
				<Button theme='transparent' title='TRADE' />
				<Button theme='fill' title='NEWS' />
			</BannerStyled>
			<CoinSection>
				<Coin />
				{children}
				<CoinCount>{!tokens ? 'undefined' : tokens}</CoinCount>
			</CoinSection>

			{children}
		</HomeStyled>
	)
}
