const express = require('express')
const { exchangeStarsForTokens } = require('../services/exchangeService')
const router = express.Router()

router.post('/exchange', async (req, res) => {
	const { telegramId, stars } = req.body

	if (!telegramId || !stars || stars <= 0) {
		return res
			.status(400)
			.json({ success: false, message: 'Некорректные данные' })
	}

	try {
		const result = await exchangeStarsForTokens(telegramId, stars)
		res.status(200).json({ success: true, user: result })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Ошибка обмена' })
	}
})

module.exports = router
