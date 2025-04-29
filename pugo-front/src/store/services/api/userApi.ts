import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TasksApi } from '@/types/types'
import { REQUEST_LINK } from '../../../../constant'

interface MiningActivationResponse {
	success: boolean
	data?: {
		daysAdded: number
		expiresAt: string
	}
	error?: string
}



export const userInfoApi = createApi({
	reducerPath: 'userInfoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${REQUEST_LINK}/api/`,
	}),
	endpoints: builder => ({
		getUserInfo: builder.query({
			query: telegramId => `user/${telegramId}`,
		}),

		updateTokens: builder.mutation<
			{
				success: boolean
				data?: {
					userId: number
					newBalance: number
					previousBalance: number
				}
				error?: string
			},
			{
				telegramId: number
				amount: number
				isPlus?: boolean
			}
		>({
			query: ({ telegramId, amount, isPlus = true }) => ({
				url: 'user/update-tokens',
				method: 'POST',
				body: { telegramId, amount, isPlus },
			}),
		}),

		activateMining: builder.mutation<
			MiningActivationResponse,
			{
				telegramId: number
				days: number
			}
		>({
			query: ({ telegramId, days }) => ({
				url: 'user/activate-automining',
				method: 'POST',
				body: { telegramId, days },
			}),
		}),
		setUserStatus: builder.mutation<
			MiningActivationResponse,
			{
				telegramId: number
				status: number
			}
		>({
			query: ({ telegramId, status }) => ({
				url: 'user/set-status',
				method: 'POST',
				body: { telegramId, status },
			}),
		}),
    changeLang: builder.mutation<
			MiningActivationResponse,
			{
				telegramId: number
				lang: string
			}
		>({
			query: ({ telegramId, lang }) => ({
				url: 'user/lang',
				method: 'POST',
				body: { telegramId, lang },
			}),
		}),
	}),
})

export const {
	useGetUserInfoQuery,
	useUpdateTokensMutation,
	useActivateMiningMutation,
	useSetUserStatusMutation,
  useChangeLangMutation
} = userInfoApi
