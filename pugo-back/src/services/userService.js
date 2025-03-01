const User = require('../models/User')
const generateReferralCode = require('../utils/generateReferralCode')
const Task = require('../models/Task')
const UserTask = require('../models/UserTask')
// Функция создания пользователя с токенами и реферальным кодом
const createUser = async (telegramId, username, firstName, lastName) => {
	const user = await User.create({
		telegramId,
		username,
		firstName,
		lastName,
		tokens: 100,
		referralCode: generateReferralCode(),
	})

	// Получаем все существующие задачи
	const tasks = await Task.findAll()

	// Привязываем задачи к пользователю (по умолчанию статус false)
	const userTasks = tasks.map(task => ({
		userId: user.id,
		taskId: task.id,
		status: false,
	}))

	await UserTask.bulkCreate(userTasks)

	return user
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
