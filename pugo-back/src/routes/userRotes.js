// src/routes/userRoutes.js
const express = require('express')
const { getUser, depositBalance } = require('../controllers/userController')
const generateReferralCode = require('../utils/generateReferralCode')
const { User } = require('../models')
const {
	updateUserTokens,
	enableMiningForUser,
	setStatusForUser,
	changeUserLang,
	getUsers,
} = require('../services/userService')
const { defineUserStatus } = require('../utils/utils')
const router = express.Router()

// Получить информацию о пользователе
router.get('/:telegramId', async (req, res) => {
	try {
		const { telegramId } = req.params
		const userInfo = await getUser(telegramId)
		res.status(200).json({ success: true, userInfo })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Ошибка получения информации о пользователе',
		})
	}
})

router.get('/users-list', async (_, res) => {
	try {
		const usersList = await getUsers()
		res.status(200).json({ success: true, usersList })
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ success: false, message: 'Ошибка получения пользователей' })
	}
})

router.post('/lang', async (req, res) => {
	try {
		const { telegramId, lang } = req.body
		const result = changeUserLang(telegramId, lang)
		res.status(200).json({ success: true, result })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Ошибка смены языка' })
	}
})

// Пополнить баланс
router.post('/deposit', depositBalance)

router.post('/update-tokens', async (req, res) => {
	const { telegramId, amount, isPlus } = req.body

	try {
		const user = await updateUserTokens(telegramId, amount, isPlus)
		res.json(user)
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

router.post('/activate-automining', async (req, res) => {
	const { telegramId, days } = req.body

	try {
		const user = await enableMiningForUser(telegramId, days)
		res.json({
			success: true,
			automining: user.automining,
			autominingExpiresAt: user.autominingExpiresAt,
		})
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})
router.post('/set-status', async (req, res) => {
	const { telegramId, status } = req.body

	try {
		const user = await setStatusForUser(telegramId, status)
		res.json({
			success: true,
			statusValue: user.status,
			statusText: defineUserStatus(user.status),
		})
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})
module.exports = router
