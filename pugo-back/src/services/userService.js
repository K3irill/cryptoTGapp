const User = require('../models/User')
const generateReferralCode = require('../utils/generateReferralCode')

// Функция создания пользователя с токенами и реферальным кодом
const createUser = async (telegramId, username, firstName, lastName) => {
	console.log('Создаю пользователя:', {
		telegramId,
		username,
		firstName,
		lastName,
	})

	const referralCode = generateReferralCode()

	return await User.create({
		telegramId,
		username,
		firstName,
		lastName,
		tokens: 100,
		referralCode,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
}

// Функция поиска пользователя по Telegram ID
const getUserByTelegramId = async telegramId => {
	console.log(`🔍 Ищу пользователя в БД: telegramId=${telegramId}`)
	const user = await User.findOne({ where: { telegramId } })
	console.log(`🔍 Результат поиска: ${user ? 'Найден' : 'Не найден'}`)
	return user
}

const createUserIfNeeded = async ({
	telegramId,
	username,
	firstName,
	lastName,
}) => {
	const existingUser = await getUserByTelegramId(telegramId)

	if (existingUser) {
		console.log('Пользователь уже существует:', existingUser)

		if (!existingUser.referralCode) {
			console.log('Реферальный код не найден, генерируем новый...')
			const referralCode = generateReferralCode()
			existingUser.referralCode = referralCode
			await existingUser.save()
			console.log('Реферальный код добавлен:', referralCode)
		}

		return existingUser
	}

	console.log('Пользователь не найден, создаем нового...')
	return await createUser(telegramId, username, firstName, lastName)
}

const updateUserTokens = async (telegramId, amount) => {
	const user = await User.findOne({ where: { telegramId } })

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	user.tokens = parseFloat(user.tokens) + amount
	await user.save()

	return user
}

module.exports = {
	createUser,
	getUserByTelegramId,
	createUserIfNeeded,
	updateUserTokens,
}
