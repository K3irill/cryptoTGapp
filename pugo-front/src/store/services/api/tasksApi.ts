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
	}),
})

export const {
	useGetUserTasksQuery,
	useCompleteTaskMutation,
	useCompleteTgTaskMutation,
} = taskApi
