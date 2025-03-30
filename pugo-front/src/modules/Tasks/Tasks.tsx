import React, { FunctionComponent, useState, useEffect } from 'react'
import {
	TasksContainer,
	TasksHeader,
	MainTitle,
	SubTitle,
	TasksContent,
	TasksSection,
	SectionHeader,
	SectionTitle,
	SectionToggle,
	TasksList,
	EmptyState,
	TaskItemWrapper,
	InstructionBlock,
	InstructionSteps,
	InstructionStep,
	InstructionArrow,
} from './styled'
import { TasksProps } from './Tasks.d'
import TopPageInfo from '@/components/TopPageInfo/TopPageInfo'
import { useGetUserTasksQuery } from '@/store/services/api/tasksApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { TasksApi } from '@/types/types'
import TaskItem from '@/components/TaskItem/TaskItem'
import Loader from '@/components/Loader/Loader'
import Error from '@/components/Error/Error'
import { motion } from 'framer-motion'

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

	if (isLoading)
		return (
			<TasksContainer>
				<Loader />
			</TasksContainer>
		)
	if (error)
		return (
			<TasksContainer>
				<Error />
			</TasksContainer>
		)

	return (
		<TasksContainer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<TopPageInfo data={data.top_section} />

			<TasksHeader>
				<SubTitle>Выполняйте задания и получайте BIFS</SubTitle>
			</TasksHeader>

			<InstructionBlock
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				<h3>Как это работает?</h3>
				<InstructionSteps>
					<InstructionStep whileHover={{ scale: 1.05 }}>
						<img src='/instruction-card-1.svg' alt='Шаг 1' />
					</InstructionStep>
					<InstructionArrow src='/icons/arrow-to-right.svg' />
					<InstructionStep whileHover={{ scale: 1.05 }}>
						<img src='/coin-c.png' alt='Шаг 2' />
					</InstructionStep>
					<InstructionArrow src='/icons/arrow-to-right.svg' />
					<InstructionStep whileHover={{ scale: 1.05 }}>
						<img src='/icons/dollar.png' alt='Шаг 3' />
					</InstructionStep>
				</InstructionSteps>
			</InstructionBlock>

			<TasksContent>
				<TasksSection
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<SectionHeader onClick={() => setIsAvailableOpen(!isAvailableOpen)}>
						<SectionTitle>Доступные задания</SectionTitle>
						<SectionToggle isOpen={isAvailableOpen}>
							<img src='/icons/accordion.svg' alt='toggle' />
						</SectionToggle>
					</SectionHeader>

					<TasksList isOpen={isAvailableOpen}>
						{availableTasks.length > 0 ? (
							availableTasks.map((task, index) => (
								<TaskItemWrapper
									key={task.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 * index }}
								>
									<TaskItem props={task} userId={id} />
								</TaskItemWrapper>
							))
						) : (
							<EmptyState>
								<img src='/icons/empty-box.svg' alt='Нет заданий' />
								<p>Нет доступных заданий</p>
							</EmptyState>
						)}
					</TasksList>
				</TasksSection>

				<TasksSection
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<SectionHeader onClick={() => setIsCompletedOpen(!isCompletedOpen)}>
						<SectionTitle>Выполненные задания</SectionTitle>
						<SectionToggle isOpen={isCompletedOpen}>
							<img src='/icons/accordion.svg' alt='toggle' />
						</SectionToggle>
					</SectionHeader>

					<TasksList isOpen={isCompletedOpen}>
						{completedTasks.length > 0 ? (
							completedTasks.map((task, index) => (
								<TaskItemWrapper
									key={task.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 * index }}
								>
									<TaskItem props={task} userId={id} />
								</TaskItemWrapper>
							))
						) : (
							<EmptyState>
								<img src='/icons/empty-box.svg' alt='Нет заданий' />
								<p>Вы еще не выполнили ни одного задания</p>
							</EmptyState>
						)}
					</TasksList>
				</TasksSection>
			</TasksContent>
			{children}
		</TasksContainer>
	)
}
