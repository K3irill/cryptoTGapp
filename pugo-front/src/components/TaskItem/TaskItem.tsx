import {
	TaskItemContainer,
	TaskIcon,
	TaskContent,
	TaskTitle,
	TaskReward,
	TaskStatus,
	TaskButton,
} from './styled'
import { FunctionComponent } from 'react'
import { TasksApi } from '@/types/types'
import Image from 'next/image'
import {
	useCompleteTaskMutation,
	useCompleteTgTaskMutation,
} from '@/store/services/api/tasksApi'
import Label from '../Label/Label'

interface TaskItemProps {
	props: TasksApi
	userId: string | null
}

const TaskItem: FunctionComponent<TaskItemProps> = ({ props, userId }) => {
	const [completeTask] = useCompleteTaskMutation()
	const [completeTgTask, { isLoading, error }] = useCompleteTgTaskMutation()

	const handleCompleteTask = async () => {
		try {
			if (props.UserTask.status === 'available') {
				await completeTask({ userId, taskId: props.id }).unwrap()
			}
			window.Telegram.WebApp.openLink(props.link)
			window.location.reload()
		} catch (err) {
			console.error('Ошибка при завершении задачи:', err)
		}
	}

	const handleCompleteTgTask = async () => {
		try {
			if (props.UserTask.status === 'available') {
				window.Telegram.WebApp.openLink(props.link)
				await completeTgTask({ userId, taskId: props.id }).unwrap()
				window.location.reload()
			}
		} catch (err) {
			console.error('Ошибка при завершении задачи:', err)
		}
	}

	return (
		<TaskItemContainer
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
		>
			<TaskIcon>
				<Image src={props.icon} width={32} height={32} alt='' />
			</TaskIcon>

			<TaskContent>
				<TaskTitle>{props.description}</TaskTitle>
			</TaskContent>

			<TaskStatus>
				<TaskReward>
					<p>{Math.floor(+props.reward)} </p>
					<Label size='14px' title='BIFS' />
				</TaskReward>
				<TaskButton
					onClick={
						props.UserTask.status === 'available'
							? props.chatId
								? handleCompleteTgTask
								: handleCompleteTask
							: undefined
					}
					status={isLoading && props.chatId ? 'pending' : props.UserTask.status}
					disabled={props.UserTask.status !== 'available'}
				>
					{isLoading && props.chatId
						? 'Проверяем...'
						: props.UserTask.status === 'available'
						? 'Выполнить'
						: props.UserTask.status === 'pending'
						? 'Проверка'
						: 'Выполнено'}
				</TaskButton>
			</TaskStatus>
		</TaskItemContainer>
	)
}

export default TaskItem
