const bot = require('./config/telegramConfig')
const {
	getUserByTelegramId,
	createUser,
	updateUserTokens,
	enableMiningForUser,
	checkAndAddPugoDaily,
	addTransaction,
} = require('./services/userService')
const User = require('./models/User')
const { getUserTasks } = require('./services/taskService')
const { defineMiningAwardByStatus } = require('./utils/utils')
const YOUR_CHAT_IDES = [
	process.env.MY_CHATID,
	process.env.BRO_CHATID,
	process.env.SECOND_ACC_CHATID,
]
// Глобальный объект для хранения отчетов
const userReports = {}
module.exports = bot => {
	bot.on('web_app_data', async msg => {
		const chatId = msg.chat.id
		const command = msg.web_app_data.data

		if (command === '/automining') {
			bot.sendMessage(chatId, 'Вы активировали автомайнинг!')
		}
	})

	bot.on('web_app_data', async msg => {
		const chatId = msg.chat.id
		const data = JSON.parse(msg.web_app_data.data)

		if (data.text) {
			bot.sendMessage(chatId, `Бот получил сообщение: "${data.text}"`)
		}
	})

	bot.onText(/\/start/, async msg => {
		const chatId = msg.chat.id
		const telegramId = msg.from.id
		const username = msg.from.username || null

		try {
			let user = await getUserByTelegramId(telegramId)


   

			const welcomeMessageNewUser = `
✨ <b>Добро пожаловать в BIFS!</b> ✨

Мы рады приветствовать вас в нашем приложении, где вы можете:
- 🪙 Зарабатывать токены, выполняя задания.
- 🎮 Играть в увлекательные игры.
- 🤝 Приглашать друзей и получать бонусы.
- 🛠 Использовать токены для улучшений и эксклюзивных возможностей.

Нажмите "Начать", чтобы продолжить, или "Больше информации", чтобы узнать подробности.
        `

			const welcomeMessageRegisteredUser = `
🌟 <b>С возвращением, ${username}!</b> 🌟

Мы рады снова видеть вас в BIFS! Продолжайте зарабатывать токены, играть и приглашать друзей, чтобы получить ещё больше бонусов.

${user && user.tokens ? `Ваш текущий баланс: ${user.tokens} токенов.` : ''}

Нажмите "Начать", чтобы продолжить, или "Больше информации", чтобы узнать подробности.
        `

			// Кнопки
			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '📚 Больше информации',
								callback_data: 'more_info',
							},
							{
								text: '🚀 Начать',
								url: 'https://t.me/BIFSCryptoBot/bifs',
							},
						],
					],
				},
			}

      if (!user) {
        // Регистрация нового пользователя
        user = await createUser(telegramId, username)
        bot.sendMessage(chatId, welcomeMessageNewUser, {
          parse_mode: 'HTML',
          reply_markup: options.reply_markup,
        })
      } else {
        // Приветствие зарегистрированного пользователя
        if (user.automining) {
          await checkAndAddPugoDaily(telegramId)
        }
        bot.sendMessage(chatId, welcomeMessageRegisteredUser, {
          parse_mode: 'HTML',
          reply_markup: options.reply_markup,
        })
      }
		} catch (error) {
			console.error(error)
			bot.sendMessage(
				chatId,
				'Произошла ошибка при регистрации. Используйте /help'
			)
		}
	})
	bot.onText(/\/balance/, async msg => {
		const chatId = msg.chat.id
		const telegramId = msg.from.id
		const username = msg.from.username || null

		try {
			let user = await getUserByTelegramId(telegramId)

			if (user.tokens) {
				bot.sendMessage(chatId, `${username}! У вас ${user.tokens} BIFS.`)
			} else {
				bot.sendMessage(
					chatId,
					`Извините, ${user.username}! Произошла ошибка при проверке баланса`
				)
			}
		} catch (error) {
			console.error(error)
			bot.sendMessage(chatId, 'Произошла ошибка при регистрации.')
		}
	})
	bot.onText(/\/mining/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '⌚Остатки автомайнинга⌚',
							callback_data: 'rest_mining',
						},
					],
					[{ text: '🫰Приобрести🫰', callback_data: 'automining' }],
				],
			},
		}
		bot.sendMessage(chatId, 'Выберите опцию:', options)
	})
	bot.onText(/\/invite/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '🎫Мой реферальный код🎫',
							callback_data: 'my_ref_code',
						},
					],
					[{ text: '🫂Мои рефералы🫂', callback_data: 'my_ref_people' }],
				],
			},
		}
		bot.sendMessage(chatId, 'Выберите опцию:', options)
	})
	bot.onText(/\/support/, async msg => {
		const chatId = msg.chat.id
		const user = msg.from

		try {
			// Формируем информативное сообщение
			const supportMessage = `
🛠 <b>Центр поддержки</b> 🛠

Привет${user?.first_name ? `, ${user.first_name}` : ''}! 

Если у вас возникли вопросы, проблемы или нужна помощь, 
наша служба поддержки готова помочь!

📌 <b>Способы связи:</b>
👉 Менеджер поддержки: @bifs_manager
👉 Официальный чат: https://t.me/BIFSCryptoBot
👉 Email: bifs.helper@gmail.com

⏱ <b>Часы работы:</b>
Пн-Пт: 9:00-22:00 (МСК)
Сб-Вс: ответы в течение 24 часов

📋 <b>Для быстрой помощи укажите:</b>
1. Ваш ID: <code>${user?.id || 'неизвестен'}</code>
2. Суть проблемы
3. Скриншоты (если есть)
        `

			// Отправка сообщения с поддержкой
			await bot.sendMessage(chatId, supportMessage, {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '📨 Написать в поддержку',
								url: 'https://t.me/bifs_manager',
							},
							{
								text: '❌ Закрыть',
								callback_data: 'delete_message',
							},
						],
					],
				},
			})

			// Логируем обращение
			console.log(`Пользователь ${user?.id} запросил поддержку`)
		} catch (error) {
			console.error('Ошибка в команде /support:', error)

			// Отправка простого сообщения в случае ошибки
			await bot.sendMessage(
				chatId,
				'⚠️ Произошла ошибка. Пожалуйста, напишите напрямую @bifs_manager'
			)
		}
	})

	bot.on('callback_query', async query => {
		if (query.data === 'delete_message') {
			try {
				await bot.deleteMessage(query.message.chat.id, query.message.message_id)
			} catch (error) {
				console.error('Ошибка при удалении сообщения:', error)
			}
		}
	})
	bot.on('message', async msg => {
		const chatId = msg.chat.id
		const telegramId = msg.from.id
		const username = msg.from.username || 'Не указан'
		const text = msg.text || msg.caption || '' // Текст сообщения или подпись к фото
		const document = msg.document
		const photo = msg.photo

		// Список известных команд
		const knownCommands = [
			'/start',
			'/help',
			'/balance',
			'/tasks',
			'/invite',
			'/store',
			'/mining',
		]

		// Проверяем, начинается ли сообщение с "bif-отчет"
		if (text.toLowerCase().startsWith('bif-отчет')) {
			// Убираем ключевое слово "bif-отчет" из текста отчета
			const reportText = text.replace(/^bif-отчет\s*/i, '').trim()

			// Составляем базовый отчет
			let fullReportText = `Отчет от пользователя:
Username: ${username}
Telegram ID: ${telegramId}
Chat ID: ${chatId}
Дата: ${new Date().toLocaleString()}
Текст отчета: ${reportText || 'Без текста'}`

			// Функция для проверки размера файла
			const checkFileSize = async fileId => {
				const file = await bot.getFile(fileId)
				return file.file_size <= 15 * 1024 * 1024 // 2 МБ в байтах
			}

			// Если есть документ, проверяем его размер
			let documentLink = ''
			if (document) {
				const fileId = document.file_id
				const isValidSize = await checkFileSize(fileId)

				if (isValidSize) {
					const fileLink = await bot.getFileLink(fileId)
					documentLink = `Ссылка на документ: ${fileLink}`
				} else {
					bot.sendMessage(
						chatId,
						'Документ слишком большой. Пожалуйста, отправьте файл размером до 2 МБ.'
					)
					return // Прерываем обработку, если размер слишком большой
				}
			}

			// Если есть фото, проверяем его размер
			let photoLink = ''
			if (photo) {
				const fileId = photo[photo.length - 1].file_id // Последнее фото (самое большое)
				const isValidSize = await checkFileSize(fileId)

				if (isValidSize) {
					const fileLink = await bot.getFileLink(fileId)
					photoLink = `Ссылка на фото: ${fileLink}`
				} else {
					bot.sendMessage(
						chatId,
						'Фото слишком большое. Пожалуйста, отправьте изображение размером до 2 МБ.'
					)
					return // Прерываем обработку, если размер слишком большой
				}
			}

			// Добавляем ссылки на документ и фото в отчет
			if (documentLink || photoLink) {
				fullReportText += `\n\n${documentLink}\n\n${photoLink}`
			}

			// Отправляем отчет всем пользователям из списка YOUR_CHAT_IDES
			YOUR_CHAT_IDES.forEach(chatId => {
				bot
					.sendMessage(chatId, fullReportText)
					.then(() => {
						console.log(`Отчет отправлен пользователю с chatId: ${chatId}`)
					})
					.catch(error => {
						console.error(
							`Ошибка при отправке отчета пользователю с chatId: ${chatId}`,
							error
						)
					})
			})

			// Уведомляем пользователя
			bot.sendMessage(chatId, 'Ваш отчет успешно отправлен! Спасибо!')
		}
		// Если сообщение не начинается с "bif-отчет" и не является известной командой
		else if (!knownCommands.includes(text.toLowerCase())) {
			bot.sendMessage(chatId, 'Напишите команду /help, чтобы узнать больше.')
		}
	})
	// Когда пользователь пишет команду /help
	bot.onText(/\/help/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '📚 Основная информация ',
							callback_data: 'more_info',
						},
					],
					[
						{
							text: '🛠 Поддержка 🛠',
							callback_data: 'support',
						},
					],
				],
			},
		}

		bot.sendMessage(chatId, 'Выберите, как мы можем вам помочь:', options)
	})
	bot.onText(/\/store/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '💳 Перейти в магазин',
							callback_data: 'pay',
						},
					],
				],
			},
		}

		bot.sendMessage(chatId, 'Давайте перейдем в магазин!', options)
	})

	const products = {
		50: { stars: 50, pugo: 150, description: '150 BIFS' },
		150: { stars: 150, pugo: 500, description: '500 BIFS' },
		500: { stars: 500, pugo: 2000, description: '2000 BIFS' },
		1000: {
			stars: 1000,
			pugo: 5000,
			description: '5000 BIFS',
		},
		2500: {
			stars: 2500,
			pugo: 15000,
			description: '15000 BIFS',
		},
	}

	// Продукты для автомайнинга
	const autominingProducts = {
		7: {
			stars: 777,
			days: 7,
			description: '7 дней автомайнинга',
		},
		21: {
			stars: 1500,
			days: 21,
			description: '21 день автомайнинга',
		},
		40: {
			stars: 2222,
			days: 40,
			description: '40 дней автомайнинга',
		},
	}

	bot.on('callback_query', async query => {
		const chatId = query.message.chat.id
		if (query.data === 'attach_report') {
			bot.sendMessage(
				chatId,
				'Пожалуйста, отправьте текст отчета и прикрепите документ (если есть). ОБЯЗАТЕЛЬНО текст отчета начинайте со слова:  bif-отчет:'
			)
		}

		if (query.data === 'pay') {
			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{ text: '🪙 Токены', callback_data: 'tokens' },
							{ text: '🤑 Автомайнинг', callback_data: 'automining' },
						],
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			const welcomeImageUrl =
				'https://i.postimg.cc/qv7mZsN5/a8e6e245-3e60-4a46-8325-30b14cc50bf7.jpg' // URL изображения

			const messageText = `
  ✨ <b>Магазин:</b> ✨
  
  📌 <b>Здесь вы можете приобретать ограниченное количество токенов, различные товары и услуги которые будут добавляться.</b>
      `

			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		}

		if (query.data.startsWith('buy_')) {
			const productKey = query.data.split('_')[1]
			const product = products[productKey]

			if (product) {
				bot.sendInvoice(
					chatId,
					`Покупка: ${product.pugo} PUGO`,
					product.description,
					`pugos_${product.stars}_${product.pugo}`,
					`${process.env.PROVIDER_TOKEN}`,
					'XTR',

					[
						{
							amount: product.stars,
							label: `Купить ${product.pugo} PUGO`,
						},
					],

					{
						flexible: true,
						photo_url:
							'https://i.postimg.cc/KcBsK7k6/f4e44cae-b3d4-4dde-bbf1-67330296d6b8-1.png',
						photo_width: 400,
						photo_height: 400,
					}
				)
			}
		}

		if (query.data.startsWith('mining_')) {
			const productKey = query.data.split('_')[1]
			const product = autominingProducts[productKey]

			if (product) {
				bot.sendInvoice(
					chatId,
					`Покупка: ${product.days} дней автомайнинга`,
					product.description,
					`automining_${product.stars}_${product.days}`,
					`${process.env.PROVIDER_TOKEN}`,
					'XTR',
					[
						{
							amount: product.stars,
							label: `Купить ${product.days} дней`,
						},
					],
					{
						flexible: true,
						photo_url:
							'https://i.postimg.cc/ZR3jdZR8/49978d67-848d-406a-83c5-335292717f6c.jpg',
						photo_width: 400,
						photo_height: 400,
					}
				)
			}
		}

		if (query.data === 'tokens') {
			// Создаем кнопки для продуктов
			const productButtons = Object.keys(products).map(productKey => [
				{
					text: `${products[productKey].pugo} BIFS за ${products[productKey].stars} Stars`,
					callback_data: `buy_${productKey}`,
				},
			])

			// Добавляем кнопку "Вернуться" в отдельный ряд
			const returnButton = [
				{
					text: '🔙 Вернуться',
					callback_data: 'more_info',
				},
			]

			// Объединяем кнопки продуктов и кнопку "Вернуться"
			const options = {
				reply_markup: {
					inline_keyboard: [...productButtons, returnButton],
				},
			}

			// Отправляем сообщение с кнопками
			bot.sendMessage(
				chatId,
				'Выберите количество токенов для покупки:',
				options
			)
		}

		if (query.data === 'automining') {
			const options = {
				reply_markup: {
					inline_keyboard: Object.keys(autominingProducts).map(productKey => [
						{
							text: `${autominingProducts[productKey].days} дней за ${autominingProducts[productKey].stars} Stars`,
							callback_data: `mining_${productKey}`,
						},
					]),
				},
			}
			bot.sendMessage(
				chatId,
				'Выберите количество дней автомайнинга для покупки:',
				options
			)
		}
		if (query.data === 'mining') {
			const chatId = query.message.chat.id
			const user = query.from
			const messageId = query.message.message_id

			try {
				// Получаем информацию о пользователе из базы данных
				const userData = await getUserByTelegramId(user.id)

				// Формируем текст сообщения с информацией о майнинге
				const miningStatus = userData?.automining
					? `⛏ <b>Ваш автомайнинг активен</b>\n\n` +
					  `💰 Доход: ${defineMiningAwardByStatus(userData.status)} BIFS/день\n` +
					  `⏳ Осталось: ${formatRemainingTime(
							userData.autominingExpiresAt
					  )}\n\n` +
					  `Вы можете продлить период майнинга или проверить статистику.`
					: `🔋 <b>Автомайнинг не активирован</b>\n\n` +
					  `Активируйте автомайнинг для пассивного заработка от 1000 BIFS ежедневно!\n\n`

				const options = {
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: userData?.automining
										? '💎 Продлить майнинг'
										: '🫰 Активировать майнинг',
									callback_data: 'automining',
								},
							],
							[
								{
									text: '❓ Как работает майнинг',
									callback_data: 'mining_info',
								},
							],
							[
								{
									text: '🔙 Вернуться',
									callback_data: 'more_info',
								},
							],
						],
					},
					parse_mode: 'HTML',
				}

				// Отправляем новое сообщение с меню
				await bot.sendMessage(
					chatId,
					`🔷 <b>Меню автомайнинга</b> 🔷\n\n${miningStatus}\n\nВыберите действие:`,
					options
				)

				// Логирование действия
				console.log(
					`[Mining Menu] User ${user.id} (${
						user.username || 'no username'
					}) opened mining menu`
				)
			} catch (error) {
				console.error('[Mining Menu Error]', error)

				await bot.sendMessage(
					chatId,
					'⚠️ Произошла ошибка при загрузке меню. Пожалуйста, попробуйте позже.',
					{
						reply_to_message_id: messageId,
						disable_notification: true,
					}
				)
			}
		} else if (query.data === 'mining_info') {
			const infoText = `
  ℹ️ <b>Как работает автомайнинг?</b>
  
  ⏰ <b>Время начислений:</b>
  Начисления происходят 1 раз в сутки в <b>00:00 по московскому времени</b>
  
  💸 <b>Процесс работы:</b>
  1. Активируете майнинг на время(за Телеграм Stars или выбиваете в кейсах)
  2. Каждый день в полночь получаете 1000 BIFS
  3. Через время майнинг автоматически прекращается
  
  📈 <b>Пример расчёта:</b>
  • Активация: 700 Stars
  • Доход за 7 дней: 7000 BIFS (1000×7)
  
  🔁 <b>Продление:</b>
  Можно продлевать неограниченное количество раз
  Каждое продление добавляет купленное кол-во дней майнинга
  
  ⚠️ <b>Важно:</b>
  Если не продлить вовремя - майнинг прекращается
  Накопленные BIFS остаются на вашем балансе
  `

			await bot.editMessageText(infoText, {
				chat_id: query.message.chat.id,
				message_id: query.message.message_id,
				parse_mode: 'HTML',
				reply_markup: {
					inline_keyboard: [
						[{ text: '🫰 Активировать майнинг', callback_data: 'automining' }],
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'mining',
							},
						],
					],
				},
			})
		}

		// Вспомогательная функция для форматирования времени
		function formatRemainingTime(expiryDate) {
			if (!expiryDate) return 'неизвестно'

			const now = new Date()
			const expiry = new Date(expiryDate)
			const diff = expiry.getTime() - now.getTime()

			if (diff <= 0) return 'завершен'

			const days = Math.floor(diff / (1000 * 60 * 60 * 24))
			const hours = Math.floor(
				(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			)
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

			return `${days}д ${hours}ч ${minutes}м`
		}

		if (query.data === 'more_info') {
			// Сообщение с кнопками для разделов
			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🚀 Как начать 🚀',
								callback_data: 'how_to_start',
							},
						],
						[
							{
								text: '💳 Магазин',
								callback_data: 'pay',
							},
							{
								text: 'Приглашение друзей 🤝',
								callback_data: 'invite_info',
							},
						],

						[
							{
								text: '⚒️ Задания',
								callback_data: 'tasks',
							},
							{
								text: 'Автомайнинг 💎',
								callback_data: 'mining',
							},
						],

						[
							{
								text: '🤑Заработать🤑',
								callback_data: 'ads_info',
							},
						],
						[
							{
								text: '🚀 Как получить токены',
								callback_data: 'tokens_info',
							},
							{
								text: 'Ценность токенов 💰',
								callback_data: 'value_info',
							},
						],

						[
							{
								text: '🎯 Наши цели',
								callback_data: 'goals_info',
							},
							{
								text: 'О боте BIF 🤖',
								callback_data: 'bot_info',
							},
						],
						[
							{
								text: '📃 Основные команды',
								callback_data: 'commands',
							},
							{
								text: '🆘 Поддержка',
								callback_data: 'support',
							},
						],
						[
							{
								text: '🌐 Социальные сети 🌐',
								callback_data: 'socials',
							},
						],
					],
				},
			}

			// Отправляем сообщение с кнопками
			bot.sendMessage(
				chatId,
				'✨ <b>Выберите раздел, чтобы узнать больше:</b>',
				{ parse_mode: 'HTML', reply_markup: options.reply_markup }
			)
		}

		// Обработка нажатий на кнопки разделов
		else if (query.data === 'tokens_info') {
			const welcomeImageUrl =
				'https://i.postimg.cc/mktYywXY/ecaac154-ca2b-4793-b9d7-9142945b94d6.jpg' // URL изображения

			const messageText = `
  ✨ <b>Как получить токены:</b> ✨
  
  📌 <b>Вы можете получать токены следующими способами:</b>

  1. 🎮 <b>Играя в игры</b> — зарабатывайте токены, проходя уровни и выполняя игровые задания.

  2. 📝 <b>Выполняя задания</b> — выполняйте ежедневные и специальные задания для получения наград.

  3. 🤝 <b>Приглашая друзей</b> — получайте бонусы за каждого приглашённого друга.

  4. 📢 <b>Рекламируя нас</b> — делитесь информацией о проекте и получайте токены за активность.
  
  💡 <b>Каждое действие приносит вам вознаграждение в токенах BIFS!</b>
      `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			// Отправляем сообщение с изображением и текстом
			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'value_info') {
			const welcomeImageUrl =
				'https://i.postimg.cc/9zHhYxmK/f7e51697-4623-4af7-9d26-2bf4fa7b1620.jpg' // URL изображения

			const messageText = `
    ✨ <b>Ценность токенов BIFS:</b> ✨
    
    💎 <b>Токены BIFS — это ваша валюта в мире BIFS!</b>
    
    📌 <b>Что вы можете делать с токенами:</b>
    
    1. 🛠 <b>Покупайте улучшения</b>
       - Улучшайте свои возможности в играх и приложениях.
    
    2. 🚀 <b>Получайте эксклюзивные возможности</b>
       - Открывайте доступ к уникальным функциям и контенту.
    
    3. 💼 <b>Инвестируйте в будущее</b>
       - В будущем токены BIFS можно будет обменивать на реальные активы.
    
    4. 🎁 <b>Получайте бонусы</b>
       - Используйте токены для участия в акциях и получения подарков.
    
    💡 <b>Токены BIFS — это не просто валюта, это ключ к новым возможностям!</b>
        `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			// Отправляем сообщение с изображением и текстом
			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'tasks') {
			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Доступные задания',
								callback_data: 'available_task',
							},
						],
						[
							{
								text: 'Выполненные задания',
								callback_data: 'completed_task',
							},
						],
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}
			const welcomeImageUrl =
				'https://i.postimg.cc/MTs0B4DZ/d43d5b0f-9edf-4f7e-a27d-1277068f5ddd.jpg'

			const messageText = `
    🤝 <b>Выполняйте:</b>
    
    🎉 <b>Здесь вы можете просматривать ваши задания, выполнять их можно в приложении!</b>

    
    😊 <b>Как это работает:</b>
       1. Вы выполняете задание.
       2. Бот или менеджер проверяет его.
       3. Вам начисляют токены!
    `

			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'invite_info') {
			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🎫 Мой реферальный код 🎫',
								callback_data: 'my_ref_code',
							},
						],
						[
							{
								text: '🫂 Мои рефералы 🫂',
								callback_data: 'my_ref_people',
							},
						],
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			const welcomeImageUrl =
				'https://i.postimg.cc/pr2Q5v86/6d794a94-4b25-4d3e-9145-81011089652c.jpg' // URL изображения

			const messageText = `
    🤝 <b>Приглашение друзей:</b>
    
    🎉 <b>Приглашайте друзей и получайте бонусы!</b>
       - За каждого приглашённого друга вы получите дополнительные токены.
       - Ваши друзья тоже получат бонусы за регистрацию.
    
    💡 <b>Как это работает:</b>
       1. Поделитесь своей реферальной ссылкой с друзьями.
       2. После регистрации друга вы получите токены на свой баланс.
       3. Чем больше друзей вы пригласите, тем больше токенов заработаете!
    
    🚀 <b>Начните приглашать друзей прямо сейчас!</b>
    `

			// Отправляем сообщение с изображением и текстом
			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'ads_info') {
			const welcomeImageUrl =
				'https://i.postimg.cc/brBGYfRb/a6d977c2-f469-4c0c-8ea1-d98f704bbb62.jpg'

			const messageText = `
  ✨ <b>Про заработок на Рекламе:</b> ✨
  
  📌 <b>Мы ценим вашу поддержку и готовы вознаграждать вас за продвижение нашего проекта!</b>
  
  🎯 <b>Вот как это работает:</b>
  
  1. 🎮 <b>Создавайте контент</b>
     - Пишите посты, снимайте видео (TikTok, Shorts), делайте мемы или даже расклеивайте листовки.
     - Всё, что привлекает внимание к нашему проекту, приносит вам токены!
  
  2. 📝 <b>Получайте просмотры</b>
     - Чем больше людей увидят ваш контент, тем больше токенов вы получите.
  
  3. 🤝 <b>Отправьте отчёт</b>
     - Перейдите в нашего бота, раздел "Заработать" и нажмите на кнопку "Прикрепить отчёт".
     - Выберите пункт <b>Прикрепить отчет</b>.
  
  4. 📢 <b>Прикрепите:</b>
     - Ссылку на ваш контент.
     - Скриншот с количеством просмотров.
     - Информацию о том, как с вами можно связаться.

     <b>ОБЯЗАТЕЛЬНО</b> текст отчета начинайте со слова:  <b>bif-отчет:</b>
  
  💡 <b>Мы проверим вашу активность и начислим токены. Чем креативнее ваш контент, тем больше вы заработаете!</b>
      `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
							{
								text: '🖇️ Прикрепить отчет',
								callback_data: 'attach_report',
							},
						],
					],
				},
			}

			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'goals_info') {
			const welcomeImageUrl = 'https://i.postimg.cc/05GjV3Kc/3.png' // URL изображения

			const messageText = `
  ✨ <b>Наши цели:</b> ✨
  
  🎯 <b>Мы стремимся стать одним из ведущих проектов в мире криптовалют!</b>
  
  📌 <b>Наши ключевые цели:</b>
  
  1. 🌐 <b>Листинг на крупных биржах</b>
     - Мы планируем выйти на такие платформы, как BLUM, STON.fi DEX, BYBIT и Binance.
  
  2. 🚀 <b>Развитие экосистемы</b>
     - Мы активно работаем над добавлением новых игр, заданий и функций.
  
  3. 🤝 <b>Создание глобального сообщества</b>
     - Мы хотим объединить людей со всего мира вокруг нашего проекта.
  
  4. 💡 <b>Удобство и доступность</b>
     - Мы делаем криптовалюту простой и понятной для каждого.
  
  💡 <b>Мы уверенно движемся к этим целям и приглашаем вас стать частью нашего успеха!</b>
      `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			// Отправляем сообщение с изображением и текстом
			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'bot_info') {
			const welcomeImageUrl =
				'https://i.postimg.cc/J0Zw0bNq/0167d904-9aa7-4d73-aee9-6e7511a1a2c9-1.png' // URL изображения

			const messageText = `
  ✨ <b>О боте BIF:</b> ✨
  
  🤖 <b>Наш Telegram-бот — это ваш помощник в мире BIFS!</b>
  
  📌 <b>Основные функции бота:</b>
  
  1. 🪙 <b>Заработок токенов</b>
     - Выполняйте задания, играйте в игры и получайте токены.
  
  2. 🤝 <b>Приглашение друзей</b>
     - Приглашайте друзей и получайте бонусы за каждого приглашённого.
  
  3. 🛠 <b>Управление аккаунтом</b>
     - Проверяйте баланс, историю транзакций и статус автомайнинга.
  
  4. 📢 <b>Реклама и продвижение</b>
     - Получайте токены за продвижение проекта.
  
  5. 🎮 <b>Игры и задания</b>
     - Участвуйте в играх и выполняйте задания для получения наград.
  
  💡 <b>С ботом BIF вы всегда в курсе событий и можете легко управлять своими активами!</b>
      `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			// Отправляем сообщение с изображением и текстом
			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		}
		if (query.data === 'how_to_start') {
			const welcomeImageUrl =
				'https://i.postimg.cc/YqNKwzq2/c912d4a4-4baa-40ce-aae1-53bc15163b8c.jpg' // Замените на URL вашего изображения

			const messageText = `
  ✨ <b>Как начать:</b> ✨
  
  🚀 <b>1. Напишите команду /start или нажми кнопку ниже</b>
     - Это запустит процесс регистрации.
  
  🎉 <b>2. Регистрация произойдет автоматически</b>
     - Вам не нужно вводить дополнительные данные.
  
  🎁 <b>3. Получите бонус 50 токенов</b>
     - Ваш стартовый бонус уже ждет вас!
  
  📱 <b>4. Перейдите по ссылке:</b>
     - <a href="https://t.me/BIFSCryptoBot/bifs">Запустить мини-приложение</a>
  
  😍 <b>5. Выполняйте активности:</b>
     - Играйте, приглашайте друзей, открывайте кейсы и коллекции, рекламируйте нас, ищите пасхалки! 
      `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
							{
								text: '🚀 Поехали!',
								url: 'https://t.me/BIFSCryptoBot/bifs',
							},
						],
					],
				},
			}

			// Отправляем сообщение с изображением и текстом
			bot.sendPhoto(chatId, welcomeImageUrl, {
				caption: messageText,
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'support') {
			const chatId = query.message.chat.id
			const user = query.from
			const messageId = query.message.message_id

			try {
				// Формируем информативное сообщение
				const supportMessage = `
  🛠 <b>Центр поддержки</b> 🛠
  
  Привет${user?.first_name ? `, ${user.first_name}` : ''}! 
  
  Если у вас возникли вопросы, проблемы или нужна помощь, 
  наша служба поддержки готова помочь!
  
  📌 <b>Способы связи:</b>
  👉 Менеджер поддержки: @bifs_manager
  👉 Официальный чат: https://t.me/BIFSCryptoBot
  👉 Email: bifs.helper@gmail.com
  
  ⏱ <b>Часы работы:</b>
  Пн-Пт: 9:00-22:00 (МСК)
  Сб-Вс: ответы в течение 24 часов
  
  📋 <b>Для быстрой помощи укажите:</b>
  1. Ваш ID: <code>${user?.id || 'неизвестен'}</code>
  2. Суть проблемы
  3. Скриншоты (если есть)
          `

				// Отправка сообщения с поддержкой (редактируем существующее сообщение)
				await bot.editMessageText(supportMessage, {
					chat_id: chatId,
					message_id: messageId,
					parse_mode: 'HTML',
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: '📨 Написать в поддержку',
									url: 'https://t.me/bifs_manager',
								},

								{
									text: '🔙 На главную',
									callback_data: 'more_info',
								},
							],
						],
					},
				})

				// Логируем обращение
				console.log(
					`Пользователь ${user?.id} (${
						user?.username || 'без username'
					}) запросил поддержку`
				)
			} catch (error) {
				console.error('Ошибка в обработке запроса поддержки:', error)

				try {
					// Пытаемся отправить новое сообщение об ошибке
					await bot.sendMessage(
						chatId,
						'⚠️ Произошла ошибка. Пожалуйста, напишите напрямую @bifs_manager\n\n' +
							'Код ошибки: ' +
							(error instanceof Error ? error.message : 'unknown'),
						{
							reply_to_message_id: messageId,
							disable_notification: true,
						}
					)
				} catch (sendError) {
					console.error('Не удалось отправить сообщение об ошибке:', sendError)
				}
			}
		} else if (query.data === 'completed_task') {
			try {
				let user = await getUserByTelegramId(query.from.id)
				if (user) {
					const tasks = await getUserTasks(query.from.id)

					// Фильтруем выполненные задачи
					const completedTasks = tasks.filter(
						task => task.UserTask.status === 'completed'
					)

					if (completedTasks.length > 0) {
						// Формируем красивый список задач
						const tasksList = completedTasks
							.map(
								(task, index) =>
									`${index + 1}. **${task.reward}**: ${
										task.description
									} [Ссылка](${task.link})`
							)
							.join('\n')

						// Создаем клавиатуру с кнопкой "Назад"
						const backButton = {
							text: '🔙 Вернуться',
							callback_data: 'tasks', // Уникальный идентификатор для кнопки "Назад"
						}

						// Отправляем сообщение с Markdown-разметкой и кнопкой "Назад"
						bot.sendMessage(
							chatId,
							`✅ *Ваши выполненные задачи:*\n\n${tasksList}`,
							{
								parse_mode: 'Markdown', // Включаем поддержку Markdown
								reply_markup: {
									inline_keyboard: [[backButton]], // Добавляем кнопку "Назад"
								},
							}
						)
					} else {
						// Если задач нет, отправляем сообщение с кнопкой "Назад"
						const backButton = {
							text: '🔙 Вернуться',
							callback_data: 'tasks',
						}

						bot.sendMessage(chatId, 'У вас нет выполненных задач.', {
							reply_markup: {
								inline_keyboard: [[backButton]], // Добавляем кнопку "Назад"
							},
						})
					}
				} else {
					bot.sendMessage(
						chatId,
						`Извините, ${query.from.username}! Произошла ошибка при проверке реферального кода.`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(chatId, 'Произошла ошибка при выполнении запроса.')
			}
		} else if (query.data === 'available_task') {
			try {
				let user = await getUserByTelegramId(query.from.id)
				if (user) {
					const tasks = await getUserTasks(query.from.id)

					// Фильтруем доступные задачи
					const availableTasks = tasks.filter(
						task => task.UserTask.status === 'available'
					)

					if (availableTasks.length > 0) {
						// Формируем красивый список задач
						const tasksList = availableTasks
							.map(
								(task, index) =>
									`${index + 1}. **${task.reward}**: ${
										task.description
									} [Ссылка](${task.link})`
							)
							.join('\n')

						// Создаем клавиатуру с кнопкой "Назад"
						const backButton = {
							text: '🔙 Вернуться',
							callback_data: 'tasks', // Уникальный идентификатор для кнопки "Назад"
						}

						// Отправляем сообщение с Markdown-разметкой и кнопкой "Назад"
						bot.sendMessage(chatId, `📋 *Доступные задачи:*\n\n${tasksList}`, {
							parse_mode: 'Markdown', // Включаем поддержку Markdown
							reply_markup: {
								inline_keyboard: [[backButton]], // Добавляем кнопку "Назад"
							},
						})
					} else {
						// Если задач нет, отправляем сообщение с кнопкой "Назад"
						const backButton = {
							text: '🔙 Вернуться',
							callback_data: 'tasks',
						}

						bot.sendMessage(chatId, 'У вас нет доступных задач.', {
							reply_markup: {
								inline_keyboard: [[backButton]], // Добавляем кнопку "Назад"
							},
						})
					}
				} else {
					bot.sendMessage(
						chatId,
						`Извините, ${query.from.username}! Произошла ошибка при проверке реферального кода.`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(chatId, 'Произошла ошибка при выполнении запроса.')
			}
		} else if (query.data === 'my_ref_code') {
			try {
				let user = await getUserByTelegramId(query.from.id)
				if (user.referralCode) {
					const botUsername = 'BIFSCryptoBot'
					const referralCode = user.referralCode
					const referralLink = `https://t.me/${botUsername}/bifs?startapp=${referralCode}`
					bot.sendMessage(
						chatId,
						`Ваш реферальный код: ${referralCode}, а ваша реферальная ссылка: ${referralLink}`
					)
				} else {
					bot.sendMessage(
						chatId,
						`Извините, ${user.username}! Произошла ошибка при проверке реферального кода`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(chatId, 'Произошла ошибка при выполнении запроса.')
			}
		} else if (query.data === 'rest_mining') {
			try {
				let user = await getUserByTelegramId(query.from.id)
				if (user && user.autominingExpiresAt) {
					const now = new Date()
					const expiry = new Date(user.autominingExpiresAt)
					const diffTime = expiry.getTime() - now.getTime()

					if (diffTime <= 0) {
						bot.sendMessage(
							chatId,
							`⏳ Ваш автомайнинг завершен. Подключите его снова!`
						)
					} else {
						const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
						const hours = Math.floor(
							(diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
						)
						const minutes = Math.floor(
							(diffTime % (1000 * 60 * 60)) / (1000 * 60)
						)

						// Функция для склонения слов
						const pluralize = (num, words) => {
							const cases = [2, 0, 1, 1, 1, 2]
							return words[
								num % 100 > 4 && num % 100 < 20
									? 2
									: cases[Math.min(num % 10, 5)]
							]
						}

						const daysText = pluralize(days, ['день', 'дня', 'дней'])
						const hoursText = pluralize(hours, ['час', 'часа', 'часов'])
						const minutesText = pluralize(minutes, [
							'минута',
							'минуты',
							'минут',
						])

						const endDate = expiry.toLocaleDateString('ru-RU', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})

						bot.sendMessage(
							chatId,
							`⏳ Осталось времени майнинга:\n\n` +
								`🕒 ${days} ${daysText}, ${hours} ${hoursText}, ${minutes} ${minutesText}\n\n` +
								`📅 Завершится: ${endDate}`
						)
					}
				} else {
					bot.sendMessage(
						chatId,
						`🔍 ${
							user?.username || 'Пользователь'
						}, у вас не подключен автомайнинг!`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(chatId, '⚠️ Произошла ошибка при проверке майнинга.')
			}
		} else if (query.data === 'my_ref_people') {
			try {
				const user = await getUserByTelegramId(query.from.id)

				if (user.referrals && user.referrals.length > 0) {
					let referrals = []
					for (let refId of user.referrals) {
						const refUser = await getUserByTelegramId(refId)
						referrals.push(refUser)
					}

					const referralNames = referrals
						.map(ref => '@' + ref.username)
						.join(', ')
					bot.sendMessage(
						chatId,
						`У вас ${referrals.length} рефералов: ${referralNames}`
					)
				} else {
					bot.sendMessage(
						chatId,
						`Извините, ${user.username}, у вас пока нет рефералов.`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(
					chatId,
					'Произошла ошибка при получении данных о рефералах.'
				)
			}
		} else if (query.data === 'commands') {
			const messageText = `
  📜 <b>Основные команды:</b>
  
  🚀 <b>/start</b> — Начать работу с ботом.
  🛒 <b>/store</b> — Перейти в магазин для покупки токенов и услуг.
  💰 <b>/balance</b> — Проверить текущий баланс токенов.
  📋 <b>/tasks</b> — Просмотреть список доступных заданий.
  🤝 <b>/invite</b> — Пригласить друзей и получить бонусы.
  💎 <b>/mining</b> — Информация о автомайнинге.
  🆘 <b>/support</b> — Обратиться в техподдержку.

  💡 <b>Используйте эти команды, чтобы управлять своим аккаунтом и зарабатывать токены!</b>
      `

			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			// Отправляем сообщение с текстом и кнопкой
			bot.sendMessage(chatId, messageText, {
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
		} else if (query.data === 'socials') {
			const options = {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '1️⃣ Телеграм-канал',
								url: 'https://t.me/BIFScryptoSpace',
							},
							{
								text: '2️⃣ Сайт',
								url: 'https://bifscoin.ru/',
							},
						],
						// [
						// 	{
						// 		text: '3️⃣ YouTube',
						// 		url: 'https://youtube.com/',
						// 	},
						// 	{
						// 		text: '4️⃣ X(Twitter)',
						// 		url: 'https://x.com/',
						// 	},
						// ],
						[
							{
								text: '🔙 Вернуться',
								callback_data: 'more_info',
							},
						],
					],
				},
			}

			bot.sendMessage(chatId, '✨ <b>Официальные соцсети BIFS:</b>', {
				parse_mode: 'HTML',
				reply_markup: options.reply_markup,
			})
			bot.answerCallbackQuery(query.id)
		}

		bot.answerCallbackQuery(query.id)
	})

	bot.on('pre_checkout_query', async query => {
		const { id, currency, total_amount } = query

		if (currency === 'XTR' && total_amount === 1) {
			bot.answerPreCheckoutQuery(id, true)
		} else {
			bot.answerPreCheckoutQuery(id, false, 'Неверная сумма или валюта')
		}
	})

	bot.on('successful_payment', async msg => {
		const userId = msg.chat.id
		const {
			total_amount,
			currency,
			invoice_payload: payload,
		} = msg.successful_payment

		console.log({ total_amount, currency, payload })

		if (payload) {
			const [type, stars, value] = payload.split('_')
			console.log({ type, stars, value })

			if (type === 'pugos') {
				await updateUserTokens(userId, parseInt(value))

				await addTransaction(
					userId,
					parseInt(stars),
					'Куплено BIFS',
					parseInt(value)
				)

				bot.sendMessage(
					userId,
					`✅ Платеж успешен! Вы оплатили ${total_amount} ${currency}. Вы получили ${value} BIFS!`
				)
			} else if (type === 'automining') {
				await enableMiningForUser(userId, parseInt(value))

				await addTransaction(
					userId,
					parseInt(stars),
					`Активировано ${value} дней автомайнинга`,
					parseInt(value)
				)

				bot.sendMessage(
					userId,
					`✅ Платеж успешен! Вы оплатили ${total_amount} ${currency}. Вы активировали ${value} дней автомайнинга!`
				)
			}
		}
	})
}
