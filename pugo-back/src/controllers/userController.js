// src/controllers/userController.js
const User = require('../models/User')

// Получить информацию о пользователе
const getUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.user.id) // предполагаем, что id пользователя передается через middleware авторизации
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

// Пополнить баланс
const depositBalance = async (req, res) => {
	try {
		const { amount } = req.body
		const user = await User.findByPk(req.user.id)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		user.balance += amount
		await user.save()
		res.json({ message: 'Balance updated', balance: user.balance })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

module.exports = {
	getUser,
	depositBalance,
}
