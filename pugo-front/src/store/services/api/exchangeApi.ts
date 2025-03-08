import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { REQUEST_LINK } from '../../../../constant'

export const exchangeApi = createApi({
	reducerPath: 'exchangeApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${REQUEST_LINK}/api` }),
	endpoints: builder => ({
		exchangeStarsForTokens: builder.mutation({
			query: ({ telegramId, stars }) => ({
				url: '/exchange',
				method: 'POST',
				body: { telegramId, stars },
			}),
		}),
	}),
})

export const { useExchangeStarsForTokensMutation } = exchangeApi

// пример реализации на фронте
// import { useExchangeStarsForTokensMutation } from '@/store/api/exchangeApi'
// import { useSelector } from 'react-redux'
// import { useState } from 'react'

// const ExchangeButton = () => {
// 	const user = useSelector(state => state.user) // Достаем пользователя из Redux
// 	const [stars, setStars] = useState(0)
// 	const [exchangeStarsForTokens, { isLoading, error }] =
// 		useExchangeStarsForTokensMutation()

// 	const handleExchange = async () => {
// 		if (stars <= 0) return

// 		try {
// 			const result = await exchangeStarsForTokens({
// 				telegramId: user.id,
// 				stars,
// 			}).unwrap()

// 			console.log('Обмен успешен', result)
// 		} catch (err) {
// 			console.error('Ошибка обмена:', err)
// 		}
// 	}

// 	return (
// 		<div>
// 			<input
// 				type='number'
// 				value={stars}
// 				onChange={e => setStars(Number(e.target.value))}
// 				placeholder='Введите количество звезд'
// 			/>
// 			<button onClick={handleExchange} disabled={isLoading}>
// 				Обменять звезды на токены
// 			</button>
// 			{error && <p>Ошибка: {error.data?.message || 'Неизвестная ошибка'}</p>}
// 		</div>
// 	)
// }

// export default ExchangeButton
