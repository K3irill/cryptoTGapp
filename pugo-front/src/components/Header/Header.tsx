import React, { FunctionComponent } from 'react'
import { HeaderStyled } from './styled'
import { HeaderProps } from './Header.d'

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
	return <HeaderStyled>{children}</HeaderStyled>
}
