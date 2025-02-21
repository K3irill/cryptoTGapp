import React, { FunctionComponent } from 'react'
import { BannerStyled, CoinCount, CoinSection, HomeStyled } from './styled'
import { HomeProps } from './Home.d'
import HomeNavigation from '../HomeNavigation/HomeNavigation'
import { Container } from '@/styles/styled'
import { Coin } from '../Coin/Coin'
import HomeBanner from '../HomeBanner/HomeBanner'
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
			<Container>
				<HomeBanner title='<p>Listing will be <span>soon</span>, trust us <3</p>' />
				<HomeNavigation elements={data.navigation} />
			</Container>
			{children}
		</HomeStyled>
	)
}
