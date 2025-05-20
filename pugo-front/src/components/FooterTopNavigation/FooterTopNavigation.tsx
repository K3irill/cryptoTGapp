import React, { FunctionComponent } from 'react'
import { NavigationStyled, Title } from './styled'
import { NavElement } from '../NavCircleElement/styled'
import { FooterTopNavigationProps } from './FooterTopNavigation.d'
import { useRouter } from 'next/router'
import { Lock } from '../Navigation/styled'
import Link from 'next/link'

const FooterTopNavigation: FunctionComponent<FooterTopNavigationProps> = ({
	elements,
	extraMenuOpen,
  
}) => {
	const { pathname, locale } = useRouter()

	return (
		<NavigationStyled isOpen={extraMenuOpen}>
			{elements.map((el, i) => {
				const isActive = pathname === el.href
				return (
					<Link  href={el.availability ? el.href : ''} passHref locale={locale} key={el.id}>
						<NavElement
							// position={(i + 1) % 2 === 0 ? 'top' : 'bottom'}
							disabled={el.availability}
							isActive={isActive}
							isTopNav
						>
							{!el.availability && <Lock src='/icons/lock.svg' alt='locked' />}
							<img src={el.src || ''} alt='' />
							{<Title opacity={extraMenuOpen}>{el.title}</Title>}
						</NavElement>
					</Link>
				)
			})}
		</NavigationStyled>
	)
}

export default FooterTopNavigation
