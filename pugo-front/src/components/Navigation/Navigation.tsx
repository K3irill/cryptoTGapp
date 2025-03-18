/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { FunctionComponent, useState } from 'react'
import { NavBlockStyled, NavTitleStyled, FooterBtn, Lock } from './styled'
import { NavigationProps } from './Navigation.d'
import { NavCircleElement } from '../NavCircleElement/NavCircleElement'
import { SvgIconStyled } from '@/styles/styled'
import { useRouter } from 'next/router'
import { Title } from '../FooterTopNavigation/styled'

const Navigation: FunctionComponent<NavigationProps> = ({
	elements,
	setExtraMenuOpen,
	extraMenuOpen,
}) => {
	const router = useRouter()

	return (
		<NavBlockStyled>
			{elements.map(elem => {
				const isActive = router.pathname === elem.href

				if (elem.isButton) {
					return (
						<FooterBtn
							onClick={() => setExtraMenuOpen(prev => !prev)}
							active={extraMenuOpen}
							key={elem.id}
						>
							<span></span>
							<span></span>
						</FooterBtn>
					)
				}

				return (
					<NavCircleElement
						disabled={elem.availability}
						path={elem.href}
						key={elem.id}
						background='transparent'
						isActive={isActive}
					>
						{!elem.availability && <Lock src='/icons/lock.svg' alt='locked' />}

						<SvgIconStyled src={elem.src || ''} alt={elem.title || 'alt'} />
						{
							<Title size='8px' top='80%' opacity={extraMenuOpen}>
								{elem.title}
							</Title>
						}
					</NavCircleElement>
				)
			})}
		</NavBlockStyled>
	)
}

export default Navigation
