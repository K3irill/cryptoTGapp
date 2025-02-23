// src/bot.js
const bot = require('./config/telegramConfig')
const { getUserByTelegramId, createUser } = require('./services/userService')
const User = require('./models/User')

// Когда пользователь пишет команду /start
bot.onText(/\/start/, async msg => {
	const chatId = msg.chat.id
	const telegramId = msg.from.id
	const username = msg.from.username || null

	try {
		// Проверяем, существует ли уже пользователь в базе данных
		let user = await getUserByTelegramId(telegramId)

		if (!user) {
			// Если пользователя нет, добавляем его в базу
			user = await createUser(telegramId, username)
			bot.sendMessage(
				chatId,
				`Привет, ${username}! Ты успешно зарегистрирован.`
			)
		} else {
			bot.sendMessage(
				chatId,
				`Привет, ${user.username}! Ты уже зарегистрирован.`
			)
		}
	} catch (error) {
		console.error(error)
		bot.sendMessage(chatId, 'Произошла ошибка при регистрации.')
	}
})
