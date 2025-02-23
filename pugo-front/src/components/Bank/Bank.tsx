import React, { FunctionComponent } from 'react'
import { BannerStyled, BankStyled } from './styled'
import { BankProps } from './Bank.d'

import TopPageInfo from '../TopPageInfo/TopPageInfo'

export const Bank: FunctionComponent<BankProps> = ({ data, children }) => {
	console.log(data.top_section)
	return (
		<BankStyled>
			<TopPageInfo data={data.top_section} />
			<BannerStyled></BannerStyled>

			{children}
		</BankStyled>
	)
}
