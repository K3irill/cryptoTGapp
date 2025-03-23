import React, { FunctionComponent, useState } from 'react'
import {
	EarnBlock,
	EarnStyled,
	GameCard,
	GCardImageWrapper,
	GCardTitle,
} from './styled'
import { EarnProps } from './Earn.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Container } from '@/styles/styled'
import { TopBorderStyled } from '../Bank/styled'
import Image from 'next/image'

import { useRouter } from 'next/router'

export const Earn: FunctionComponent<EarnProps> = ({ data, children }) => {
	const { id } = useSelector((state: RootState) => state.user)
	const router = useRouter()

	const handleCardClick = () => {
		router.push('/game/spacepug')
	}

	return (
		<EarnStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<TopBorderStyled src='./grey-top-border.svg' alt='border' />
				<EarnBlock>
					{/* Карточка с игрой "Space Pug" */}
					<GameCard
						background='/backgrounds/rocket.png'
						onClick={handleCardClick}
					>
						<GCardTitle>Space Pug</GCardTitle>
					</GameCard>
				</EarnBlock>
			</Container>
		</EarnStyled>
	)
}
