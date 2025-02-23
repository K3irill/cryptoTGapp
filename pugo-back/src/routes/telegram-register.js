// src/routes/telegram-register.js
const express = require('express')
const { createUserIfNeeded } = require('../services/userService')
const router = express.Router()

router.post('/telegram-register', async (req, res) => {
	const { telegramId, username, firstName, lastName } = req.body

	try {
		const user = await createUserIfNeeded({
			telegramId,
			username,
			firstName,
			lastName,
		})
		res.status(200).json({ success: true, user })
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Ошибка при регистрации пользователя' })
	}
})

module.exports = router
