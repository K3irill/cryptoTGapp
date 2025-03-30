import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TasksApi } from '@/types/types'
import { REQUEST_LINK } from '../../../../constant'

interface GetUserTasksResponse {
	tasks: TasksApi[]
}

interface CompleteTaskResponse {
	success: boolean
	message: string
}

export const taskApi = createApi({
	reducerPath: 'taskApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${REQUEST_LINK}/api`,
	}),
	endpoints: builder => ({
		getUserTasks: builder.query<GetUserTasksResponse, string>({
			query: userId => `/task/${userId}/tasks`,
		}),

		completeTask: builder.mutation<
			CompleteTaskResponse,
			{ userId: string | null; taskId: number }
		>({
			query: ({ userId, taskId }) => ({
				url: `/task/${userId}/tasks/${taskId}/complete`,
				method: 'POST',
			}),
		}),
		completeTgTask: builder.mutation<
			CompleteTaskResponse,
			{ userId: string | null; taskId: number }
		>({
			query: ({ userId, taskId }) => ({
				url: `/task/${userId}/tg-tasks/${taskId}/complete`,
				method: 'POST',
			}),
		}),
		caseOpened: builder.mutation<
			CompleteTaskResponse,
			{ userId: string | null; amount: number }
		>({
			query: ({ userId, amount }) => ({
				url: `/task/case-opened`,
				method: 'POST',
				body: { userId, amount },
			}),
		}),
		spacePugCompleted: builder.mutation<
			{
				success: boolean
				currentScore: number
				personalRecord: number
				achievements: Array<{
					taskId: number
					targetScore: number
					rewardGiven: boolean
					rewardAmount: number
				}>
				tasks: TasksApi[]
			},
			{ userId: string | null; score: number }
		>({
			query: ({ userId, score }) => ({
				url: '/task/space-pug-completed',
				method: 'POST',
				body: { userId, score },
			}),
		}),
	}),
})

export const {
	useGetUserTasksQuery,
	useCompleteTaskMutation,
	useCompleteTgTaskMutation,
	useCaseOpenedMutation,
	useSpacePugCompletedMutation,
} = taskApi
