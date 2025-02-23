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

// Функция для создания пользователя, если он не существует
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
			await existingUser.save() // Сохраняем изменения в базе данных
			console.log('Реферальный код добавлен:', referralCode)
		}

		return existingUser
	}

	console.log('Пользователь не найден, создаем нового...')
	return await createUser(telegramId, username, firstName, lastName)
}

// Функция для обновления реферальных кодов у всех пользователей, если их нет
const updateReferralCodesForExistingUsers = async () => {
	const users = await User.findAll()

	for (const user of users) {
		if (!user.referralCode) {
			console.log(
				`Реферальный код для пользователя ${user.telegramId} не найден, генерируем новый...`
			)
			const referralCode = generateReferralCode()
			user.referralCode = referralCode
			await user.save()
			console.log(
				`Реферальный код для пользователя ${user.telegramId}: ${referralCode}`
			)
		}
	}
}

module.exports = {
	createUser,
	getUserByTelegramId,
	createUserIfNeeded,
	updateReferralCodesForExistingUsers,
}
