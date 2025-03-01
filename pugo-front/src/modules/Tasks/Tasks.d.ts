import { TasksTypes, ContentData } from '@/types/types'
import React from 'react'

export interface TasksProps {
	children?: React.ReactNode | string
	data: TasksTypes
}
