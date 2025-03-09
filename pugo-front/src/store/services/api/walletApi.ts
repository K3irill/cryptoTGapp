import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { REQUEST_LINK } from '../../../../constant'

export const walletApi = createApi({
	reducerPath: 'walletApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${REQUEST_LINK}/api/wallet` }),
	endpoints: builder => ({
		getWalletInfo: builder.query({
			query: telegramId => `/${telegramId}`,
		}),
		linkWallet: builder.mutation({
			query: ({ telegramId, walletAddress }) => ({
				url: '/link',
				method: 'POST',
				body: { telegramId, walletAddress },
			}),
		}),
	}),
})
