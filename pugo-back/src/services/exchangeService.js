const User = require('../models/User')

const exchangeRate = 100

const exchangeStarsForTokens = async (telegramId, stars) => {
	const user = await User.findOne({ where: { telegramId } })

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	if (user.balance < stars) {
		throw new Error('Недостаточно звезд для обмена')
	}

	user.balance -= stars
	user.tokens += stars * exchangeRate
	await user.save()

	return user
}

module.exports = { exchangeStarsForTokens }
