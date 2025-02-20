import React, { FunctionComponent } from 'react'
import {
	BannerStyled,
	CoinCount,
	CoinCountWrapper,
	CoinSection,
	CoinStyled,
	HomeStyled,
} from './styled'
import { HomeProps } from './Home.d'
import HomeNavigation from '../HomeNavigation/HomeNavigation'
import { Container } from '@/styles/styled'

export const Home: FunctionComponent<HomeProps> = ({ data, children }) => {
	return (
		<HomeStyled>
			<BannerStyled></BannerStyled>
			<CoinSection>
				<CoinStyled>
					<img src='/coin.png' alt='pug coin' />
				</CoinStyled>
			</CoinSection>
			<CoinCountWrapper>
				<CoinCount>100000</CoinCount>
			</CoinCountWrapper>
			<Container>
				<HomeNavigation elements={data.navigation} />
			</Container>
			{children}
		</HomeStyled>
	)
}
