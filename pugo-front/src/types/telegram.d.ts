export {}

declare global {
	interface Window {
		Telegram: {
			WebApp: TelegramWebApp
		}
	}
}

interface TelegramWebApp {
	initData: string
	openLink: (string) => void
	initDataUnsafe: {
		user?: TelegramWebAppUser
	}
	expand: () => void
	close: () => void
}

interface TelegramWebAppUser {
	id: number
	first_name: string
	last_name?: string
	username?: string
	photo_url?: string
}
