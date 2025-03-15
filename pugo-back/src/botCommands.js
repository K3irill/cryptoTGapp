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

module.exports = bot => {
	bot.on('web_app_data', async msg => {
		const chatId = msg.chat.id
		const command = msg.web_app_data.data // Data sent from the mini-app

		if (command === '/automining') {
			// Logic for the /automining command
			bot.sendMessage(chatId, 'You have activated auto-mining!')
		}
	})

	bot.on('web_app_data', async msg => {
		const chatId = msg.chat.id
		const data = JSON.parse(msg.web_app_data.data) // Data sent from the mini-app

		if (data.text) {
			// Send a response message
			bot.sendMessage(chatId, `The bot received a message: "${data.text}"`)
		}
	})

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
					`Hello, ${username}! You have successfully registered. Go to the app: https://t.me/PugoCoinBot/pugo`
				)
			} else {
				if (user.automining) {
					await checkAndAddPugoDaily(telegramId)
				}
				bot.sendMessage(
					chatId,
					`Hello, ${user.username}! You are already registered and can go to the app: https://t.me/PugoCoinBot/pugo`
				)
			}
		} catch (error) {
			console.error(error)
			bot.sendMessage(chatId, 'An error occurred during registration.')
		}
	})

	// When the user writes the /help command
	bot.onText(/\/help/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[{ text: '🚀 How to Start', callback_data: 'how_to_start' }],
					[{ text: '🛠 Support', callback_data: 'support' }],
					[{ text: '📜 Basic Commands', callback_data: 'commands' }],
					[{ text: '🌐 Our Socials', callback_data: 'socials' }],
					[{ text: '💳 Internal Store', callback_data: 'pay' }],
				],
			},
		}

		bot.sendMessage(chatId, 'Choose how we can help you:', options)
	})

	// bot.on('message', async msg => {
	// 	const chatId = msg.chat.id
	// 	const text = msg.text.toLowerCase()

	// 	const match = text.match(/^\/buy_(\d+)$/)
	// 	if (match) {
	// 		const productKey = match[1]
	// 		const product = products[productKey]

	// 		if (product) {
	// 			bot.sendInvoice(
	// 				chatId,
	// 				`Purchase: ${product.pugo} PUGO`,
	// 				product.description,
	// 				`payload_${product.stars}`,
	// 				'YOUR_PROVIDER_TOKEN',
	// 				'XTR', // Currency XTR
	// 				[
	// 					{
	// 						amount: product.stars,
	// 						label: `Purchase ${product.pugo} PUGO`,
	// 					},
	// 				],
	// 				{ flexible: true }
	// 			)
	// 		} else {
	// 			bot.sendMessage(
	// 				chatId,
	// 				'❌ Product with this number of stars not found.'
	// 			)
	// 		}
	// 	} else if (text.includes('automining')) {
	// 		const matchMining = text.match(/^\/automining_(\d+)$/)
	// 		if (matchMining) {
	// 			const productKey = matchMining[1]
	// 			const product = autominingProducts[productKey]

	// 			if (product) {
	// 				bot.sendInvoice(
	// 					chatId,
	// 					`Purchase: ${product.days} days of auto-mining`,
	// 					product.description,
	// 					`payload_${product.stars}`,
	// 					'YOUR_PROVIDER_TOKEN',
	// 					'XTR',
	// 					[
	// 						{
	// 							amount: product.stars,
	// 							label: `Purchase ${product.days} days`,
	// 						},
	// 					],
	// 					{ flexible: true }
	// 				)
	// 			} else {
	// 				bot.sendMessage(chatId, '❌ Auto-mining product not found.')
	// 			}
	// 		}
	// 	}
	// })

	const products = {
		1: {
			stars: 1,
			pugo: 9999,
			description: '🪙 9999 PUGO for 1 Stars ⭐',
		},
		50: {
			stars: 50,
			pugo: 1000,
			description: '🪙 1000 PUGO for 50 Stars ⭐',
		},
		75: { stars: 75, pugo: 1750, description: '1750 PUGO for 75 Stars ⭐' },
		100: {
			stars: 100,
			pugo: 2500,
			description: '2500 PUGO for 100 Stars ⭐',
		},
		150: {
			stars: 150,
			pugo: 3500,
			description: '3500 PUGO for 150 Stars ⭐',
		},
		250: {
			stars: 250,
			pugo: 7770,
			description: '7770 PUGO for 250 Stars ⭐',
		},
		500: {
			stars: 500,
			pugo: 18000,
			description: '18000 PUGO for 500 Stars ⭐',
		},
		1000: {
			stars: 1000,
			pugo: 45000,
			description: '45000 PUGO for 1000 Stars ⭐',
		},
	}

	// Mapping of auto-mining products
	const autominingProducts = {
		1: {
			stars: 1,
			days: 7,
			description: '7 days auto-mining',
		},
		7: {
			stars: 150,
			days: 7,
			description: '7 days auto-mining',
		},
		21: {
			stars: 300,
			days: 21,
			description: '21 days auto-mining',
		},
		40: {
			stars: 500,
			days: 40,
			description: '40 days auto-mining',
		},
	}

	bot.on('callback_query', async query => {
		const chatId = query.message.chat.id

		if (query.data === 'pay') {
			const options = {
				reply_markup: {
					inline_keyboard: [
						[{ text: '🪙 Tokens', callback_data: 'tokens' }],
						[{ text: '🤑 AutoMining', callback_data: 'automining' }],
					],
				},
			}

			bot.sendMessage(chatId, 'Choose a product to purchase:', options)
		}

		if (query.data.startsWith('buy_')) {
			const productKey = query.data.split('_')[1]
			const product = products[productKey]

			if (product) {
				bot.sendInvoice(
					chatId,
					`Purchase: ${product.pugo} PUGO`,
					product.description,
					`pugos_${product.stars}_${product.pugo}`,
					`${process.env.PROVIDER_TOKEN}`,
					'XTR',

					[
						{
							amount: product.stars,
							label: `Purchase ${product.pugo} PUGO`,
						},
					],
					{ flexible: true }
				)
			}
		}

		if (query.data.startsWith('mining_')) {
			const productKey = query.data.split('_')[1]
			const product = autominingProducts[productKey]

			if (product) {
				bot.sendInvoice(
					chatId,
					`Purchase: ${product.days} days of auto-mining`,
					product.description,
					`automining_${product.stars}_${product.days}`,
					`${process.env.PROVIDER_TOKEN}`,
					'XTR',
					[
						{
							amount: product.stars,
							label: `Purchase ${product.days} days`,
						},
					],
					{ flexible: true }
				)
			}
		}

		if (query.data === 'tokens') {
			const options = {
				reply_markup: {
					inline_keyboard: Object.keys(products).map(productKey => [
						{
							text: `${products[productKey].stars} Stars for ${products[productKey].pugo} PUGO`,
							callback_data: `buy_${productKey}`,
						},
					]),
				},
			}
			bot.sendMessage(
				chatId,
				'Choose the number of tokens to purchase:',
				options
			)
		}

		if (query.data === 'automining') {
			const options = {
				reply_markup: {
					inline_keyboard: Object.keys(autominingProducts).map(productKey => [
						{
							text: `${autominingProducts[productKey].days} days for ${autominingProducts[productKey].stars} Stars`,
							callback_data: `mining_${productKey}`,
						},
					]),
				},
			}
			bot.sendMessage(
				chatId,
				'Choose the number of auto-mining days to purchase:',
				options
			)
		}

		if (query.data === 'how_to_start') {
			bot.sendMessage(
				chatId,
				'✨ **How to Start:**\n' +
					'1️⃣ Write the /start command\n' +
					'2️⃣ Registration will happen automatically\n' +
					'3️⃣ You will receive a **bonus of 100 tokens** 🎁\n' +
					'4️⃣ After registration, click the link: [Launch Mini-App](https://t.me/PugoCoinBot/pugo)',
				{ parse_mode: 'Markdown', disable_web_page_preview: true }
			)
		} else if (query.data === 'support') {
			bot.sendMessage(chatId, '📩 Write to us at: fsafas.@mail.ru')
		} else if (query.data === 'commands') {
			bot.sendMessage(
				chatId,
				'📜 **Basic Commands:**\n' +
					'/start - Start\n' +
					'/help - Help\n' +
					'/balance - Check Balance\n' +
					'/tasks - List of Tasks\n' +
					'/invite - Invite a Friend\n',
				{ parse_mode: 'Markdown' }
			)
		} else if (query.data === 'socials') {
			bot.sendMessage(
				chatId,
				'✨ **Official PUGO Socials:**\n' +
					'\n' +
					'1️⃣ Telegram Channel: https://telegram.com/\n' +
					'2️⃣ Instagram: https://instagram.com/\n' +
					'3️⃣ YouTube: https://youtube.com/\n' +
					'4️⃣ X: https://x.com/\n ',
				{ parse_mode: 'Markdown', disable_web_page_preview: true }
			)
		}

		bot.answerCallbackQuery(query.id)
	})

	bot.on('pre_checkout_query', async query => {
		const { id, currency, total_amount } = query

		if (currency === 'XTR' && total_amount === 1) {
			bot.answerPreCheckoutQuery(id, true)
		} else {
			bot.answerPreCheckoutQuery(id, false, 'Invalid amount or currency')
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
					'Purchased PUGO',
					parseInt(value)
				)

				bot.sendMessage(
					userId,
					`✅ Payment successful! You paid ${total_amount} ${currency}. You've received ${value} PUGO!`
				)
			} else if (type === 'automining') {
				await enableMiningForUser(userId, parseInt(stars), parseInt(value))

				await addTransaction(
					userId,
					parseInt(stars),
					`Activated ${value} days of auto-mining`,
					parseInt(value)
				)

				bot.sendMessage(
					userId,
					`✅ Payment successful! You paid ${total_amount} ${currency}. You’ve activated ${value} days of auto-mining!`
				)
			}
		}
	})
}
