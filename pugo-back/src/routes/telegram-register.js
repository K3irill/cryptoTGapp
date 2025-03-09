// src/routes/telegram-register.js
const express = require('express')
const {
	createUserIfNeeded,
	updateUserTokens,
} = require('../services/userService')
const generateReferralCode = require('../utils/generateReferralCode')
const { User } = require('../models')
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

router.post('/ref/:referralCode', async (req, res) => {
	const { referralCode } = req.params
	const { telegramId, username, firstName, lastName } = req.body

	try {
		const referrer = await User.findOne({ where: { referralCode } })

		if (!referrer) {
			return res
				.status(404)
				.json({ success: false, error: 'Реферальный код не найден' })
		}

		const existingUser = await User.findOne({ where: { telegramId } })

		if (existingUser) {
			return res
				.status(400)
				.json({ success: false, error: 'Пользователь уже существует' })
		}

		const newUser = await User.create({
			telegramId,
			username,
			firstName,
			lastName,
			tokens: 100,
			referralCode: generateReferralCode(),
		})
		console.log('Before updating referrals:', referrer.referrals)
		referrer.referrals = [...referrer.referrals, newUser.telegramId]

		await referrer.save()
		console.log('After updating referrals:', referrer.referrals)

		const tokensToAdd = 50
		await updateUserTokens(referrer.telegramId, tokensToAdd)
		await updateUserTokens(newUser.telegramId, tokensToAdd)

		res.json({
			success: true,
			message: 'Пользователь успешно зарегистрирован, токены начислены',
			referrer: referrer.telegramId,
			referrerReferrals: referrer.referrals,
			newUser: newUser.telegramId,
		})
	} catch (error) {
		console.error('Ошибка при обработке реферальной ссылки:', error)
		res.status(500).json({ success: false, error: 'Ошибка сервера' })
	}
})
module.exports = router
