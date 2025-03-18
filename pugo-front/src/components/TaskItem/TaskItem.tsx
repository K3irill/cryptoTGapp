import {
	TaskItemContainer,
	IconWrapper,
	Description,
	Reward,
	Status,
} from './styled'
import PugoLabel from '../PugoLabel/PugoLabel'
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
		<TaskItemContainer>
			<IconWrapper>
				<Image src={props.icon} width={25} height={25} alt='' />
			</IconWrapper>
			<Description>{props.description}</Description>
			<Status>
				<Reward>
					{Math.floor(+props.reward)} <Label size='12px' title='MAJ' />
				</Reward>
				<PugoLabel
					onClick={
						props.UserTask.status === 'available'
							? props.chatId
								? handleCompleteTgTask
								: handleCompleteTask
							: undefined
					}
					theme={
						isLoading && props.chatId
							? 'pending'
							: props.UserTask.status === 'available'
							? 'available'
							: props.UserTask.status === 'pending'
							? 'pending'
							: 'received'
					}
					radius='5px'
					title={
						isLoading && props.chatId
							? 'Checking'
							: props.UserTask.status === 'available'
							? 'Complete'
							: props.UserTask.status === 'pending'
							? 'Checking'
							: 'Completed'
					}
				/>
			</Status>
		</TaskItemContainer>
	)
}

export default TaskItem
