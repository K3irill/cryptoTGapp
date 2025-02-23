import React, { FunctionComponent } from 'react'
import { BannerStyled, CoinCount, CoinSection, HomeStyled } from './styled'
import { HomeProps } from './Home.d'
import { Coin } from '../Coin/Coin'

import Button from '../UI/Button/Button'

export const Home: FunctionComponent<HomeProps> = ({ data, children }) => {
	return (
		<HomeStyled>
			<BannerStyled>
				<Button theme='transparent' title='TRADE' />
				<Button theme='fill' title='NEWS' />
			</BannerStyled>
			<CoinSection>
				<Coin />
				<CoinCount>100000</CoinCount>
			</CoinSection>

			{children}
		</HomeStyled>
	)
}
