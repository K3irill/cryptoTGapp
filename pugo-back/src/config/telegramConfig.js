const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_BOT_TOKEN

if (!token) {
	console.error('Токен бота не предоставлен!')
	process.exit(1) // Завершаем процесс, если токен отсутствует
}

const bot = new TelegramBot(token, { polling: true })

module.exports = bot
