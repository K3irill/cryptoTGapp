import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TasksApi } from '@/types/types'
import { REQUEST_LINK } from '../../../../constant'

export const userInfoApi = createApi({
	reducerPath: 'userInfoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${REQUEST_LINK}/api`,
	}),
	endpoints: builder => ({
		getUserInfo: builder.query({
			query: telegramId => `user/${telegramId}`,
		}),
	}),
})

export const { useGetUserInfoQuery } = userInfoApi
