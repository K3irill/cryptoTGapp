import { RatingTypes } from '@/types/types'
import React from 'react'

export interface RatingProps {
	children?: React.ReactNode | string
	data: RatingTypes
}
