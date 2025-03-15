const { User, Task, UserTask } = require('../models')
const generateReferralCode = require('../utils/generateReferralCode')

// Функция создания пользователя с токенами и реферальным кодом
const createUser = async (telegramId, username, firstName, lastName) => {
	const user = await User.create({
		telegramId,
		username,
		firstName,
		lastName,
		tokens: 1,
		referralCode: generateReferralCode(),
		automining: false,
		autominingExpiresAt: null,
		transactions: [],
	})

	// Получаем все существующие задачи
	const tasks = await Task.findAll()

	// Привязываем задачи к пользователю (по умолчанию статус false)
	const userTasks = tasks.map(task => ({
		userId: user.telegramId,
		taskId: task.id,
		status: 'available',
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
const enableMiningForUser = async (telegramId, stars, days) => {
	const user = await User.findOne({ where: { telegramId } })

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	const expiresAt = new Date()
	expiresAt.setDate(expiresAt.getDate() + days) // Добавляем дни к текущей дате

	user.automining = true
	user.autominingExpiresAt = expiresAt
	await user.save()

	return user
}

const checkAndAddPugoDaily = async () => {
	const users = await User.findAll({ where: { autominig: true } })

	for (const user of users) {
		// Проверяем, не истек ли срок автомайнинга
		if (user.autominigExpiresAt && new Date() < user.autominigExpiresAt) {
			// Если срок не истек, добавляем PUGO
			await addPugoToBalance(user.telegramId, 100)
		} else {
			user.autominig = false
			user.autominigExpiresAt = null
			await user.save()

			console.log(
				`Автомайнинг для пользователя ${user.telegramId} отключен, срок истек.`
			)
		}
	}
}
const addTransaction = async (telegramId, stars, description, amount) => {
	const user = await User.findOne({ where: { telegramId } })

	if (!user) {
		throw new Error('User not found')
	}

	const transaction = {
		time: new Date(),
		stars: stars,
		description: description,
		amount: amount,
	}
	user.transactions = [...user.transactions, transaction]
	await user.save()

	return user
}

module.exports = {
	createUser,
	getUserByTelegramId,
	createUserIfNeeded,
	updateUserTokens,
	enableMiningForUser,
	addTransaction,
	checkAndAddPugoDaily,
}
