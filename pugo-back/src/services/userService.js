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

const updateUserTokens = async (telegramId, amount, isPlus = true) => {
	if (typeof telegramId !== 'number' || Number.isNaN(telegramId)) {
		throw new Error('Invalid telegramId! Must be a valid number.')
	}

	if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
		throw new Error('Amount must be a valid positive number.')
	}

	try {
		const user = await User.findOne({ where: { telegramId } })

		if (!user) {
			throw new Error(`User with telegramId ${telegramId} not found`)
		}

		const currentTokens = parseFloat(user.tokens)
		if (Number.isNaN(currentTokens)) {
			throw new Error('Invalid current tokens value in database')
		}

		const newTokens = isPlus ? currentTokens + amount : currentTokens - amount

		if (newTokens < 0) {
			throw new Error('Insufficient tokens for this operation')
		}

		// Обновление и сохранение
		user.tokens = newTokens
		await user.save()

		console.log(
			`🤑 Updated user tokens - TelegramID: ${telegramId}, Operation: ${
				isPlus ? '+' : '-'
			}${amount}, New balance: ${newTokens}`
		)

		return {
			user: user,
			success: true,
			newBalance: newTokens,
			previousBalance: currentTokens,
			message: 'Balance updated successfully',
		}
	} catch (error) {
		console.error('❌ Error updating user tokens:', error.message)
		throw error // Пробрасываем ошибку для обработки на уровне выше
	}
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
		if (user.autominigExpiresAt && new Date() < user.autominigExpiresAt) {
			await updateUserTokens(user.telegramId, 1000)
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
