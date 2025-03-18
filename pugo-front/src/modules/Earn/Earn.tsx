import React, { FunctionComponent, useState, useEffect } from 'react'
import {
	EarnBlock,
	EarnStyled,
	GameCard,
	GCardImageWrapper,
	GCardTitle,
} from './styled'
import { EarnProps } from './Earn.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'

import { InstructionBlock } from './components/InstructionBlock/InstructionBlock'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import TaskItem from '@/components/TaskItem/TaskItem'
import { Container, Headline } from '@/styles/styled'
import { TopBorderStyled } from '../Bank/styled'
import Image from 'next/image'

export const Earn: FunctionComponent<EarnProps> = ({ data, children }) => {
	const { id } = useSelector((state: RootState) => state.user)

	return (
		<EarnStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<TopBorderStyled src='./grey-top-border.svg' alt='border' />
				<EarnBlock>
					<GameCard>
						<GCardImageWrapper>
							<Image src='/icons/roulete.png' width='45' height='45' alt='' />
						</GCardImageWrapper>
						<GCardTitle>The Wheel of Fortune</GCardTitle>
					</GameCard>
					<GameCard>
						<GCardImageWrapper radius='8px'>
							<Image src='/icons/777.png' width='45' height='45' alt='' />
						</GCardImageWrapper>
						<GCardTitle>777</GCardTitle>
					</GameCard>
					<GameCard>
						<GCardImageWrapper>
							<Image src='/icons/roulete.png' width='45' height='45' alt='' />
						</GCardImageWrapper>
						<GCardTitle>The Wheel of Fortune</GCardTitle>
					</GameCard>
					<GameCard>
						<GCardImageWrapper>
							<Image src='/icons/roulete.png' width='45' height='45' alt='' />
						</GCardImageWrapper>
						<GCardTitle>The Wheel of Fortune</GCardTitle>
					</GameCard>
				</EarnBlock>
				{children}
			</Container>
		</EarnStyled>
	)
}
