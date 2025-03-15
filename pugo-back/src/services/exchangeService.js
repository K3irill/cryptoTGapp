const User = require('../models/User')
const Transaction = require('../models/Transaction')

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

	const transaction = await Transaction.create({
		userId: user.id,
		type: 'expense',
		amount: stars,
		description: `Обмен ${stars} звезд на ${stars * exchangeRate} токенов`,
		status: 'completed',
	})

	return { user, transaction }
}

module.exports = { exchangeStarsForTokens }
