import React, { FunctionComponent } from 'react'
import { NavigationStyled, Title } from './styled'
import { NavElement } from '../NavCircleElement/styled'
import { FooterTopNavigationProps } from './FooterTopNavigation.d'
import { useRouter } from 'next/router'
import { Lock } from '../Navigation/styled'

const FooterTopNavigation: FunctionComponent<FooterTopNavigationProps> = ({
	elements,
	extraMenuOpen,
}) => {
	const router = useRouter()
	return (
		<NavigationStyled isOpen={extraMenuOpen}>
			{elements.map((el, i) => {
				const isActive = router.pathname === el.href
				return (
					<NavElement
						// position={(i + 1) % 2 === 0 ? 'top' : 'bottom'}
						disabled={el.availability}
						href={el.href}
						key={el.id}
						isActive={isActive}
						isTopNav
					>
						{!el.availability && <Lock src='/icons/lock.svg' alt='locked' />}
						<img src={el.src || ''} alt='' />
						{<Title opacity={extraMenuOpen}>{el.title}</Title>}
					</NavElement>
				)
			})}
		</NavigationStyled>
	)
}

export default FooterTopNavigation
