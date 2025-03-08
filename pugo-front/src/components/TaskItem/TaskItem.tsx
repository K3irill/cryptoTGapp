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
import { useCompleteTaskMutation } from '@/store/services/api/tasksApi'

interface TaskItemProps {
	props: TasksApi
	userId: string | null
}

const TaskItem: FunctionComponent<TaskItemProps> = ({ props, userId }) => {
	const [completeTask, { isLoading, error }] = useCompleteTaskMutation()

	const handleCompleteTask = async () => {
		try {
			if (props.UserTask.status === 'available') {
				await completeTask({ userId, taskId: props.id }).unwrap()
				console.log('Задача завершена')
			}
			window.Telegram.WebApp.openLink(props.link)
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
					{Math.floor(+props.reward)}{' '}
					<Image src='/coin.svg' width={17} height={17} alt='' />
				</Reward>
				<PugoLabel
					onClick={
						props.UserTask.status === 'available'
							? handleCompleteTask
							: undefined
					}
					theme={
						props.UserTask.status === 'available'
							? 'available'
							: props.UserTask.status === 'pending'
							? 'pending'
							: 'received'
					}
					radius='5px'
					title={
						props.UserTask.status === 'available'
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
