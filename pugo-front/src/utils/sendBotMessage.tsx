import { Container, Headline, NotifyContent } from '@/styles/styled'
import { TFunction } from 'next-i18next'
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
	user: UserState,
	t: TFunction
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

		toast(
			<NotifyContent>
				<span>{t('notifications.botPayment.message')}</span>{' '}
				<a
					href='https://t.me/BIFSCryptoBot'
					target='_blank'
					rel='noopener noreferrer'
				>
					{t('notifications.botPayment.botLinkText')}
				</a>
				{t('notifications.botPayment.emoji')}
			</NotifyContent>,
			{
				style: {
					background: `url(grey-paper-texture_1253-25.png),
          linear-gradient(
            178.41deg,
            rgba(47, 75, 110, 1) 1.72%,
            rgba(40, 65, 101, 1) 67.48%
          )`,
					border: '1px solid rgba(255, 255, 255, 0.05)',
					color: 'white',
					zIndex: 2147483647,
				},
			}
		)
		window.open('https://t.me/BIFSCryptoBot', '_blank')
	} catch (error) {
		console.error('Error triggering bot action:', error)
		toast.error(t('notifications.errors.default'))
	}
}

export const handleAutomining = async (user: UserState, t: TFunction) => {
	try {
		const response = await fetch(`${REQUEST_LINK}/api/exchange/automining`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ telegramId: user.id, days: 7, stars: 500 }),
		})

		const data = await response.json()

		toast(
			<NotifyContent>
				<span>{t('notifications.botPayment.message')}</span>{' '}
				<a
					href='https://t.me/BIFSCryptoBot'
					target='_blank'
					rel='noopener noreferrer'
				>
					{t('notifications.botPayment.botLinkText')}
				</a>
				{t('notifications.botPayment.emoji')}
			</NotifyContent>,
			{
				style: {
					background: `url(grey-paper-texture_1253-25.png),
          linear-gradient(
            178.41deg,
            rgba(47, 75, 110, 1) 1.72%,
            rgba(40, 65, 101, 1) 67.48%
          )`,
					border: '1px solid rgba(255, 255, 255, 0.05)',
					color: 'white',
					zIndex: 2147483647,
				},
			}
		)
		window.open('https://t.me/BIFSCryptoBot', '_blank')
	} catch (error) {
		console.error('Error triggering bot action:', error)
		toast.error(t('notifications.errors.default'))
	}
}
