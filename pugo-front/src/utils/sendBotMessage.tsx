import { Container, Headline, Notify } from '@/styles/styled'

import { REQUEST_LINK } from '../../constant'
import { Toaster, toast } from 'react-hot-toast'
import { UserState } from '@/store/slices/userSlice'

export const sendMessageFromBot = async (message: string, userId: string) => {
	const token = process.env.NEXT_PUBLIC_BOT_TOKEN
	const url = `https://api.telegram.org/bot${token}/sendMessage`

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: userId,
			text: `${message}`,
		}),
	})

	const data = await response.json()

	if (data.ok) {
		console.log('Команда успешно отправлена')
	} else {
		console.error('Ошибка отправки команды:', data.description)
	}
}

export const handleBuyTokens = async (
	stars: number,
	pugos: number,
	user: UserState
) => {
	try {
		const response = await fetch(`${REQUEST_LINK}/api/exchange/buy-tokens`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ stars, pugos, telegramId: user.id }),
		})

		const data = await response.json()

		toast(t => (
			<Notify>
				Бот отправил вам сообщение об оплате, откройте
				<a href='https://t.me/BIFSCryptoBot'>чат с ботом</a>😊
			</Notify>
		))
		window.open('https://t.me/BIFSCryptoBot', '_blank')
	} catch (error) {
		console.error('Error triggering bot action:', error)
		toast.error('Возникла ошибка, попробуйте ещё раз.')
	}
}

export const handleAutomining = async (user: UserState) => {
	try {
		const response = await fetch(`${REQUEST_LINK}/api/exchange/automining`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ telegramId: user.id, days: 7, stars: 777 }),
		})

		const data = await response.json()

		toast(t => (
			<Notify>
				Бот отправил вам сообщение об оплате, откройте
				<a href='https://t.me/BIFSCryptoBot'>чат с ботом</a>😊
			</Notify>
		))
		window.open('https://t.me/BIFSCryptoBot', '_blank')
	} catch (error) {
		console.error('Error triggering bot action:', error)
		toast.error('Возникла ошибка, попробуйте ещё раз.')
	}
}
