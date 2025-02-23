import React, { FunctionComponent } from 'react'
import { FooterBannerProps } from './FooterBanner.d'
import { FooterBannerStyled, FooterBorder } from './styled'
import { useRouter } from 'next/router'

export const FooterBanner: FunctionComponent<FooterBannerProps> = ({}) => {
	const router = useRouter()
	const routerPath = router.asPath
	return (
		<FooterBannerStyled>
			<FooterBorder page={routerPath}>
				<img
					src={
						router.asPath === '/' ? '/home-border.svg' : '/another-border.svg'
					}
					alt=''
				/>
			</FooterBorder>
		</FooterBannerStyled>
	)
}

export default FooterBanner
