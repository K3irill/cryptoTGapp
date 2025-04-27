import {
	TaskItemContainer,
	TaskIcon,
	TaskContent,
	TaskTitle,
	TaskReward,
	TaskStatus,
	TaskButton,
	ProgressBar,
	ProgressFill,
	ProgressText,
} from './styled'
import { FunctionComponent } from 'react'
import { ContentData, TasksApi } from '@/types/types'
import Image from 'next/image'
import {
	useCompleteTaskMutation,
	useCompleteTgTaskMutation,
} from '@/store/services/api/tasksApi'
import Label from '../Label/Label'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Loader from '../Loader/Loader'


interface TaskItemProps {
	props: TasksApi
	userId: string | null
}

const TaskItem: FunctionComponent<TaskItemProps> = ({ props, userId }) => {
	const [completeTask] = useCompleteTaskMutation()
	const [completeTgTask, { isLoading }] = useCompleteTgTaskMutation()
	const router = useRouter()
	const { t, ready } = useTranslation('common')
	if (!ready) return <Loader />
  const content = t('content', { returnObjects: true }) as ContentData
	// const language = router.locale || 'en'

	// const descriptionJson = JSON.parse(props.description)
	// const taskDescription = descriptionJson[language] || descriptionJson.en

	const handleTaskAction = async () => {
		try {
			if (props.UserTask.status !== 'available') return

			// Обработка разных типов задач
			if (props.chatId) {
				// Telegram-задачи
				window.Telegram.WebApp.openLink(props.link)
				await completeTgTask({ userId, taskId: props.id }).unwrap()
			} else if (props.type === 'game_achievement') {
				// Игровые достижения - просто переход
				router.push(props.link)
				return // Не завершаем задачу, она завершится при достижении результата
			} else {
				// Стандартные задачи
				await completeTask({ userId, taskId: props.id }).unwrap()
				window.open(props.link, '_blank')
			}

			// Обновляем страницу только для неигровых задач
			if (props.type !== 'game_achievement') {
				window.location.reload()
			}
		} catch (err) {
			console.error('Ошибка при завершении задачи:', err)
		}
	}

	// Расчет прогресса
	const showProgress = props.targetValue && props.achievementType
	const progress = props.UserTask?.currentProgress || 0
	const target = props.targetValue || 1
	const progressPercent = Math.min(Math.round((progress / target) * 100), 100)

	return (
		<TaskItemContainer
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
		>
			<TaskIcon>
				{props.icon.includes('http') ||
				props.icon.includes('svg') ||
				props.icon.includes('png') ? (
					<Image src={props.icon} width={32} height={32} alt='' />
				) : (
					props.icon
				)}
			</TaskIcon>

			<TaskContent>
				<TaskTitle>{props.description}</TaskTitle>

				{showProgress && (
					<div style={{ width: '100%', marginTop: '8px' }}>
						<ProgressText>
							{progress} / {target} ({progressPercent}%)
						</ProgressText>
						<ProgressBar>
							<ProgressFill width={`${progressPercent}%`} />
						</ProgressBar>
					</div>
				)}
			</TaskContent>

			<TaskStatus>
				<TaskReward>
					<p>{Math.floor(+props.reward)} </p>
					<Label size='14px' title='BIFS' />
				</TaskReward>
				<TaskButton
					onClick={handleTaskAction}
					status={isLoading && props.chatId ? 'pending' : props.UserTask.status}
					disabled={props.UserTask.status !== 'available'}
				>
					{getButtonText()}
				</TaskButton>
			</TaskStatus>
		</TaskItemContainer>
	)

	function getButtonText() {
		if (isLoading && props.chatId)
			return content.pages.tasks.taskItem.button.checking
		if (props.UserTask.status !== 'available') {
			return props.UserTask.status === 'pending'
				? content.pages.tasks.taskItem.button.pending
				: content.pages.tasks.taskItem.button.completed
		}
		return props.type === 'game_achievement'
			? content.pages.tasks.taskItem.button.go
			: content.pages.tasks.taskItem.button.complete
	}
}

export default TaskItem
