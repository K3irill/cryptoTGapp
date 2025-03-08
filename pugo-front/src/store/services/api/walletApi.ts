import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PROD_LINK } from '../../../../constant'

export const walletApi = createApi({
	reducerPath: 'walletApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${PROD_LINK}/api/wallet` }),
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

// export const { useGetWalletInfoQuery, useLinkWalletMutation } = walletApi

// //import { useGetWalletInfoQuery } from '@/store/api/walletApi'
// import { useSelector } from 'react-redux'

// const Wallet = () => {
// 	const user = useSelector(state => state.user) // Получаем текущего пользователя
// 	const { data, error, isLoading } = useGetWalletInfoQuery(user.id)

// 	if (isLoading) return <p>Загрузка...</p>
// 	if (error) return <p>Ошибка загрузки данных</p>

// 	return (
// 		<div>
// 			<h2>Баланс</h2>
// 			<p>Токены: {data.walletInfo.tokens}</p>
// 			<p>Звезды: {data.walletInfo.balance}</p>
// 			<p>Кошелек: {data.walletInfo.walletAddress || 'Не привязан'}</p>
// 		</div>
// 	)
// }

// export default Wallet
