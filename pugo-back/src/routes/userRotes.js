// src/routes/userRoutes.js
const express = require('express')
const { getUser, depositBalance } = require('../controllers/userController')
const generateReferralCode = require('../utils/generateReferralCode')
const { User } = require('../models')
const { updateUserTokens } = require('../services/userService')
const router = express.Router()

// Получить информацию о пользователе
router.get('/:telegramId', async (req, res) => {
	try {
		const { telegramId } = req.params
		const userInfo = await getUser(telegramId)
		res.status(200).json({ success: true, userInfo })
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ success: false, message: 'Ошибка получения кошелька' })
	}
})

// Пополнить баланс
router.post('/deposit', depositBalance)

router.post('/update-tokens', async (req, res) => {
	const { telegramId, amount, isPlus } = req.body

	try {
		const user = await updateUserTokens(telegramId, amount, isPlus)
		res.json({ success: true, tokens: user.tokens })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

module.exports = router
