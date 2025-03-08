import React, { FunctionComponent, useEffect } from 'react'
import { BannerStyled, CoinCount, CoinSection, HomeStyled } from './styled'
import { HomeProps } from './Home'
import { Coin } from '@/components/Coin/Coin'
import Button from '@/components/UI/Button/Button'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Home: FunctionComponent<HomeProps> = ({ data, children }) => {
	const { tokens } = useSelector((state: RootState) => state.user)

	return (
		<HomeStyled>
			<BannerStyled>
				<Button theme='transparent' title='TRADE' />
				<Button theme='fill' title='NEWS' />
			</BannerStyled>
			<CoinSection>
				<Coin />
				{children}
				<CoinCount unit={!tokens ? '' : 'P'}>
					{!tokens ? 'loading...' : Math.floor(tokens)}
				</CoinCount>
			</CoinSection>

			{children}
		</HomeStyled>
	)
}
