//ЭТО НАСТРОЙКА БОТА(команды)
const bot = require('./config/telegramConfig')
const { getUserByTelegramId, createUser } = require('./services/userService')
const User = require('./models/User')

// Когда пользователь пишет команду /start
module.exports = bot => {
	bot.onText(/\/start/, async msg => {
		const chatId = msg.chat.id
		const telegramId = msg.from.id
		const username = msg.from.username || null

		try {
			let user = await getUserByTelegramId(telegramId)

			if (!user) {
				user = await createUser(telegramId, username)
				bot.sendMessage(
					chatId,
					`Привет, ${username}! Ты успешно зарегистрирован. Переходи в приложение: https://t.me/PugoCoinBot/pugo`
				)
			} else {
				bot.sendMessage(
					chatId,
					`Привет, ${user.username}! Ты уже зарегистрирован и можешь переходить в приложение: https://t.me/PugoCoinBot/pugo`
				)
			}
		} catch (error) {
			console.error(error)
			bot.sendMessage(chatId, 'Произошла ошибка при регистрации.')
		}
	})

	// Когда пользователь пишет команду /help
	bot.onText(/\/help/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[{ text: '🚀 Как начать', callback_data: 'how_to_start' }],
					[{ text: '🛠 Техподдержка', callback_data: 'support' }],
					[{ text: '📜 Основные команды', callback_data: 'commands' }],
					[{ text: '🌐 Наши соцсети', callback_data: 'socials' }],
				],
			},
		}

		bot.sendMessage(chatId, 'Выберите, чем вам помочь:', options)
	})

	// Обработчик нажатий на кнопки
	bot.on('callback_query', query => {
		const chatId = query.message.chat.id

		if (query.data === 'how_to_start') {
			bot.sendMessage(
				chatId,
				'✨ **Как начать:**\n' +
					'1️⃣ Напишите команду /start\n' +
					'2️⃣ Автоматически пройдет регистрация\n' +
					'3️⃣ Вы получите **бонус 100 токенов** 🎁\n' +
					'4️⃣ После регистрации нажмите на ссылку: [Запустить мини-приложение](https://t.me/PugoCoinBot/pugo)',
				{ parse_mode: 'Markdown', disable_web_page_preview: true }
			)
		} else if (query.data === 'support') {
			bot.sendMessage(chatId, '📩 Напишите нам на почту: fsafas.@mail.ru')
		} else if (query.data === 'commands') {
			bot.sendMessage(
				chatId,
				'📜 **Основные команды:**\n' +
					'/start - Начать\n' +
					'/help - Помощь\n' +
					'/balance - Проверить баланс\n' +
					'/tasks - Список заданий\n' +
					'/invite - Пригласить друга\n',
				{ parse_mode: 'Markdown' }
			)
		} else if (query.data === 'socials') {
			bot.sendMessage(
				chatId,

				'✨ **Официальные соцсети PUGO:**\n' +
					'\n' +
					'1️⃣ Телеграм канал: https://telegram.com/\n' +
					'2️⃣ Инстаграм:  https://instagram.com/\n' +
					'3️⃣ Youtube: https://youtube.com/\n' +
					'4️⃣ X: https://x.com/\n ',
				{ parse_mode: 'Markdown', disable_web_page_preview: true }
			)
		}

		bot.answerCallbackQuery(query.id)
	})

	// Когда пользователь пишет неизвестные команды или просто любое слово
	bot.on('message', msg => {
		const chatId = msg.chat.id
		const text = msg.text

		if (text.startsWith('/') && !['/start', '/help'].includes(text)) {
			bot.sendMessage(
				chatId,
				'Такой команды нет. Напишите /help, чтобы узнать доступные команды.'
			)
		} else if (!text.startsWith('/')) {
			bot.sendMessage(
				chatId,
				'Похоже, я не могу ответить на ваш запрос. Напишите команду /help, чтобы узнать подробнее.'
			)
		}
	})
}
