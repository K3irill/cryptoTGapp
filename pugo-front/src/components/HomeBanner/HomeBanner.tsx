import React, { FunctionComponent } from 'react'
import { HomeBannerProps } from './HomeBanner.d'
import { HomeBannerStyled } from './styled'

export const HomeBanner: FunctionComponent<HomeBannerProps> = ({ title }) => {
	return (
		<HomeBannerStyled
			dangerouslySetInnerHTML={{ __html: title }}
		></HomeBannerStyled>
	)
}

export default HomeBanner
