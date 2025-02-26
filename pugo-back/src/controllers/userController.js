// src/controllers/userController.js
const User = require('../models/User')

// Получить информацию о пользователе
const getUser = async telegramId => {
	const user = await User.findOne({ where: { telegramId } })
	if (!user) {
		throw new Error('Пользователь не найден')
	}

	return user
}

// Пополнить баланс
const depositBalance = async (req, res) => {
	const { userId, amount } = req.body
	try {
		const user = await User.findByPk(userId)
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

module.exports = { getUser, depositBalance }
