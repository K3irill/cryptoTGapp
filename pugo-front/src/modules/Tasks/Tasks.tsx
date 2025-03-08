import React, { FunctionComponent, useState, useEffect } from 'react'
import {
	AvailableTasks,
	TasksBlock,
	TasksStyled,
	TextStyled,
	CompletedTasks,
	Column,
	AccordionTop,
} from './styled'
import { TasksProps } from './Tasks.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import Image from 'next/image'
import { InstructionBlock } from './components/InstructionBlock/InstructionBlock'
import { useGetUserTasksQuery } from '@/store/services/api/tasksApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { TasksApi } from '@/types/types'
import TaskItem from '@/components/TaskItem/TaskItem'
import { Container } from '@/styles/styled'
import { TopBorderStyled } from '../Bank/styled'

export const Tasks: FunctionComponent<TasksProps> = ({ data, children }) => {
	const [isCompletedOpen, setIsCompletedOpen] = useState<boolean>(true)
	const [isAvailableOpen, setIsAvailableOpen] = useState<boolean>(true)
	const [completedTasks, setCompletedTasks] = useState<TasksApi[]>([])
	const [availableTasks, setAvailableTasks] = useState<TasksApi[]>([])
	const { id } = useSelector((state: RootState) => state.user)
	const { data: taskData, error, isLoading } = useGetUserTasksQuery(id!)

	useEffect(() => {
		if (taskData) {
			const completed = taskData.tasks.filter(
				task => task.UserTask.status === 'completed'
			)
			const available = taskData.tasks.filter(
				task =>
					task.UserTask.status === 'available' ||
					task.UserTask.status === 'pending'
			)
			setCompletedTasks(completed)
			setAvailableTasks(available)
		}
	}, [taskData])

	if (isLoading) return <div>Загрузка...</div>
	if (error) return <div>Ошибка при загрузке Задача</div>

	return (
		<TasksStyled>
			<TopPageInfo data={data.top_section} />
			<Container>
				<TopBorderStyled src='./grey-top-border.svg' alt='border' />

				<InstructionBlock />
				<TasksBlock>
					<CompletedTasks>
						<AccordionTop
							isOpen={isCompletedOpen}
							onClick={() => setIsCompletedOpen(prev => !prev)}
						>
							<TextStyled>Completed tasks</TextStyled>
							<Image src='/icons/accordion.svg' width={15} height={15} alt='' />
						</AccordionTop>

						<Column withOpacity isOpen={isCompletedOpen}>
							{completedTasks.length > 0 ? (
								completedTasks.map(task => (
									<TaskItem key={task.id} props={task} userId={id} />
								))
							) : (
								<TextStyled style={{ textAlign: 'center' }}>
									There are no completed tasks
								</TextStyled>
							)}
						</Column>
					</CompletedTasks>
					<AvailableTasks>
						<AccordionTop
							isOpen={isAvailableOpen}
							onClick={() => setIsAvailableOpen(prev => !prev)}
						>
							<TextStyled>Available tasks</TextStyled>
							<Image src='/icons/accordion.svg' width={15} height={15} alt='' />
						</AccordionTop>

						<Column isOpen={isAvailableOpen}>
							{availableTasks.length > 0 ? (
								availableTasks.map(task => (
									<TaskItem key={task.id} props={task} userId={id} />
								))
							) : (
								<TextStyled style={{ textAlign: 'center' }}>
									There are no available tasks
								</TextStyled>
							)}
						</Column>
					</AvailableTasks>
				</TasksBlock>
				{children}
			</Container>
		</TasksStyled>
	)
}
