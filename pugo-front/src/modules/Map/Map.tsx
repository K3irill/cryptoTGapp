import React, { FunctionComponent, useEffect } from 'react'
import { MapStyled, MapBlock, MapSvg } from './styled'
import { MapProps } from './Map.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'

import { Container } from '@/styles/styled'

export const Map: FunctionComponent<MapProps> = ({ data, children }) => {
	return (
		<MapStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<MapBlock>
					<MapSvg src='/map.svg' />
				</MapBlock>
				{children}
			</Container>
		</MapStyled>
	)
}
