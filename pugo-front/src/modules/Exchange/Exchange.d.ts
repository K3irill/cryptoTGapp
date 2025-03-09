import { ExchangeTypes, ContentData } from '@/types/types'
import React from 'react'

export interface ExchangeProps {
	children?: React.ReactNode | string
	data: ExchangeTypes
}
