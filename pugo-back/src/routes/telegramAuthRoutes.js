const express = require('express')
const { getUserByTelegramId, createUser } = require('../services/userService')
const router = express.Router()

router.post('/telegram-register', async (req, res) => {
	console.log('📩 Получен запрос на регистрацию:', req.body)

	const { telegramId, username, firstName, lastName } = req.body

	if (!telegramId) {
		console.error('❌ Ошибка: telegramId отсутствует!')
		return res
			.status(400)
			.json({ success: false, message: 'Отсутствует telegramId' })
	}

	try {
		console.log(`🔍 Проверяем пользователя с telegramId=${telegramId} в БД...`)
		let user = await getUserByTelegramId(telegramId)

		if (!user) {
			console.log('🆕 Пользователь не найден, создаем...')
			user = await createUser(telegramId, username, firstName, lastName)
			console.log('✅ Пользователь успешно создан:', user)
			return res
				.status(200)
				.json({
					success: true,
					message: `Привет, ${username}! Ты зарегистрирован.`,
				})
		} else {
			console.log('✅ Пользователь уже существует:', user)
			return res
				.status(200)
				.json({
					success: true,
					message: `Привет, ${user.username}! Ты уже зарегистрирован.`,
				})
		}
	} catch (error) {
		console.error('❌ Ошибка при обработке запроса:', error)
		return res
			.status(500)
			.json({ success: false, message: 'Произошла ошибка при регистрации.' })
	}
})

module.exports = router
