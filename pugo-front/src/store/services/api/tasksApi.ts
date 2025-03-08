import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TasksApi } from '@/types/types'

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
		baseUrl: 'http://localhost:7000/api',
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
	}),
})

export const { useGetUserTasksQuery, useCompleteTaskMutation } = taskApi
