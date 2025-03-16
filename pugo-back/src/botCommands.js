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
		const command = msg.web_app_data.data

		if (command === '/automining') {
			bot.sendMessage(chatId, 'You have activated auto-mining!')
		}
	})

	bot.on('web_app_data', async msg => {
		const chatId = msg.chat.id
		const data = JSON.parse(msg.web_app_data.data)

		if (data.text) {
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
	bot.onText(/\/balance/, async msg => {
		const chatId = msg.chat.id
		const telegramId = msg.from.id
		const username = msg.from.username || null

		try {
			let user = await getUserByTelegramId(telegramId)

			if (user.tokens) {
				bot.sendMessage(
					chatId,
					`Hello, ${username}! You have ${user.tokens} PUGO.`
				)
			} else {
				bot.sendMessage(
					chatId,
					`Sorry, ${user.username}! An error occurred when checking the balance`
				)
			}
		} catch (error) {
			console.error(error)
			bot.sendMessage(chatId, 'An error occurred during registration.')
		}
	})
	bot.onText(/\/invite/, async msg => {
		const telegramId = msg.from.id
		const username = msg.from.username || null

		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '🎫My referral code🎫',
							callback_data: 'my_ref_code',
						},
					],
					[{ text: '🫂My referrals🫂', callback_data: 'my_ref_people' }],
				],
			},
		}
		bot.sendMessage(chatId, 'Choose option:', options)
	})
	bot.on('message', msg => {
		const chatId = msg.chat.id
		const text = msg.text.toLowerCase()

		const knownCommands = [
			'/start',
			'/help',
			'/balance',
			'/tasks',
			'/invite',
			'/store',
		]

		if (!knownCommands.includes(text)) {
			bot.sendMessage(chatId, 'Write the /help command to learn more.')
		}
	})
	// When the user writes the /help command
	bot.onText(/\/help/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '🚀How to Start🚀 ',
							callback_data: 'how_to_start',
						},
					],
					[{ text: '💳Store💳', callback_data: 'pay' }],
					[{ text: '📜Basic Commands📜', callback_data: 'commands' }],
					[{ text: '🌐Our Socials🌐', callback_data: 'socials' }],
					[{ text: '🛠Support🛠 ', callback_data: 'support' }],
				],
			},
		}

		bot.sendMessage(chatId, 'Choose how we can help you:', options)
	})
	bot.onText(/\/store/, async msg => {
		const chatId = msg.chat.id

		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: '💳 Go to Store',
							callback_data: 'pay',
						},
					],
				],
			},
		}

		bot.sendMessage(chatId, "Let's go to the store!", options)
	})

	const products = {
		50: { stars: 50, pugo: 2500, description: '2500 PUGO' },
		150: {
			stars: 150,
			pugo: 10000,
			description: '10000 PUGO',
		},
		500: {
			stars: 500,
			pugo: 50000,
			description: '50000 PUGO',
		},
		1000: {
			stars: 1000,
			pugo: 150000,
			description: '150000 PUGO ',
		},
		2500: {
			stars: 2500,
			pugo: 500000,
			description: '500000 PUGO',
		},
	}

	// Mapping of auto-mining products
	const autominingProducts = {
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

					{
						flexible: true,
						photo_url: 'https://i.postimg.cc/bwcSG7gY/10000003.png',
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
					{
						flexible: true,
						photo_url: 'https://i.postimg.cc/hGHtwxYD/Group-1410119707.png',
						photo_width: 400,
						photo_height: 400,
					}
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
			bot.sendMessage(chatId, '📩 Link with our manager: @feel_so_empty')
		} else if (query.data === 'my_ref_code') {
			try {
				let user = await getUserByTelegramId(query.from.id)
				if (user.referralCode) {
					const botUsername = 'PugoCoinBot'
					const referralCode = user.referralCode
					const referralLink = `https://t.me/${botUsername}/pugo?startapp=${referralCode}`
					bot.sendMessage(
						chatId,
						`Your referral code is ${referralCode} and your referral link: ${referralLink} `
					)
				} else {
					bot.sendMessage(
						chatId,
						`Sorry, ${user.username}! An error occurred when checking the referral code`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(chatId, 'An error occurred during making a request.')
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
						`You have ${referrals.length} referrals: ${referralNames}`
					)
				} else {
					bot.sendMessage(
						chatId,
						`Sorry, ${user.username}, you don't have any referrals yet.`
					)
				}
			} catch (error) {
				console.error(error)
				bot.sendMessage(
					chatId,
					'An error occurred while fetching referral data.'
				)
			}
		} else if (query.data === 'commands') {
			bot.sendMessage(
				chatId,
				'📜 **Basic Commands:**\n' +
					'/start - Start\n' +
					'/help - Help\n' +
					'/store - Store\n' +
					'/balance - Check Balance\n' +
					'/tasks - List of Tasks\n' +
					'/invite - Invite a Friend\n',
				{ parse_mode: 'Markdown' }
			)
		} else if (query.data === 'socials') {
			bot.sendMessage(
				chatId,
				'✨ <b>Official PUGO Socials:</b>\n' +
					'\n' +
					'1️⃣ <a href="https://t.me/pugo_official">Telegram Channel</a>\n' +
					'2️⃣ <a href="https://instagram.com/">Instagram</a>\n' +
					'3️⃣ <a href="https://youtube.com/">YouTube</a>\n' +
					'4️⃣ <a href="https://x.com/">X</a>\n',
				{ parse_mode: 'HTML', disable_web_page_preview: true }
			)
			bot.answerCallbackQuery(query.id)
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
