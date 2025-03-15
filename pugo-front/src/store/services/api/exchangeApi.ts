import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { REQUEST_LINK } from '../../../../constant'

export const exchangeApi = createApi({
	reducerPath: 'exchangeApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${REQUEST_LINK}/api` }),
	endpoints: builder => ({
		exchangeStarsForTokens: builder.mutation({
			query: ({ userId, stars, pugos }) => ({
				url: '/exchange',
				method: 'POST',
				body: { userId, stars, pugos },
			}),
		}),
	}),
})

export const { useExchangeStarsForTokensMutation } = exchangeApi
