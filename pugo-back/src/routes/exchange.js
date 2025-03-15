const express = require('express')
const axios = require('axios')
const { getUser } = require('../controllers/userController')

const router = express.Router()

const sendMessage = async (chatId, text) => {
	const token = 'YOUR_BOT_TOKEN' // Replace with your bot token
	const url = `https://api.telegram.org/bot${token}/sendMessage`

	try {
		await axios.post(url, {
			chat_id: chatId,
			text: text,
		})
	} catch (error) {
		console.error('Error sending message:', error.message)
	}
}

const sendInvoice = async (
	chatId,
	title,
	description,
	payload,
	providerToken,
	currency,
	prices
) => {
	const token = process.env.BOT_TOKEN // Replace with your bot token
	const url = `https://api.telegram.org/bot${token}/sendInvoice`

	try {
		await axios.post(url, {
			chat_id: chatId,
			title: title,
			description: description,
			payload: payload,
			provider_token: providerToken,
			currency: currency,
			prices: prices,
		})
	} catch (error) {
		console.error('Error sending invoice:', error.message)
	}
}

router.post('/buy-tokens', async (req, res) => {
	const { stars, pugos, telegramId } = req.body

	try {
		const user = await getUser(telegramId)
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}

		// Send a message
		await sendMessage(
			telegramId,
			`Purchasing ${pugos} PUGO for ${stars} Stars.`
		)

		// Send an invoice
		await sendInvoice(
			telegramId,
			`Purchase: ${pugos} PUGO for Stars`,
			`You are purchasing ${pugos} PUGO`,
			`pugos_${stars}_${pugos}`,
			`${process.env.PROVIDER_TOKEN}`,
			'XTR',
			[{ amount: stars, label: `Purchase ${pugos} PUGO` }]
		)

		return res.json({ success: true })
	} catch (error) {
		console.error('Error triggering bot action:', error)
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error' })
	}
})

router.post('/automining', async (req, res) => {
	const { telegramId, days, stars } = req.body

	try {
		const user = await getUser(telegramId)
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}

		// Send a message
		await sendMessage(telegramId, `Activate Auto-Mining for 7 days.`)

		// Send an invoice
		await sendInvoice(
			telegramId,
			`Purchase: Auto-Mining for 7 days`,
			`You are purchasing Auto-Mining`,
			`automining_${stars}_${days}`,
			`${process.env.PROVIDER_TOKEN}`,
			'XTR',
			[{ amount: stars, label: `Purchase Auto-Mining` }]
		)

		return res.json({ success: true })
	} catch (error) {
		console.error('Error triggering bot action:', error)
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router
