import { NavItem } from '@/types/types'

import { Dispatch, SetStateAction } from 'react'

export interface NavigationProps {
	elements: NavItem[]
	setExtraMenuOpen?: Dispatch<SetStateAction<boolean>>
	extraMenuOpen?: boolean
}
