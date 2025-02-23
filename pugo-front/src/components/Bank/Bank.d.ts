import { BankTypes, ContentData } from '@/types/types'
import React from 'react'

export interface BankProps {
	children?: React.ReactNode | string
	data: BankTypes
}
