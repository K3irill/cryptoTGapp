import { StoreTypes, ContentData } from '@/types/types'
import React from 'react'

export interface StoreProps {
	children?: React.ReactNode | string
	data: StoreTypes
}
