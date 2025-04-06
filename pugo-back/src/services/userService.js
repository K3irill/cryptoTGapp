const { User, Task, UserTask } = require('../models')
const generateReferralCode = require('../utils/generateReferralCode')
const {
	defineUserStatus,
	defineMiningAwardByStatus,
	checkStatusRequirements,
} = require('../utils/utils')

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
		status: 1,
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
	return user ? user : null
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
	const numAmount = Number(amount)
	const numTelegramId = Number(telegramId)
	if (typeof numTelegramId !== 'number' || Number.isNaN(numTelegramId)) {
		throw new Error('Invalid telegramId! Must be a valid number.')
	}

	if (
		typeof numAmount !== 'number' ||
		Number.isNaN(numAmount) ||
		numAmount <= 0
	) {
		throw new Error('Amount must be a valid positive number.')
	}

	try {
		const user = await User.findOne({ where: { telegramId: numTelegramId } })

		if (!user) {
			throw new Error(`User with telegramId ${numTelegramId} not found`)
		}

		const currentTokens = parseFloat(user.tokens)
		if (Number.isNaN(currentTokens)) {
			throw new Error('Invalid current tokens value in database')
		}

		const newTokens = isPlus
			? currentTokens + numAmount
			: currentTokens - numAmount

		if (newTokens < 0) {
			throw new Error('Insufficient tokens for this operation')
		}

		// Обновление и сохранение
		user.tokens = newTokens
		await user.save()

		console.log(
			`🤑 Updated user tokens - TelegramID: ${numTelegramId}, Operation: ${
				isPlus ? '+' : '-'
			}${numAmount}, New balance: ${newTokens}`
		)

		return {
			userId: user.telegramId,
			success: true,
			newBalance: newTokens,
			previousBalance: currentTokens,
			message: 'Balance updated successfully',
		}
	} catch (error) {
		console.error('❌ Error updating user tokens:', error.message)
		throw error
	}
}

const setStatusForUser = async (telegramId, status) => {
	const user = await User.findOne({ where: { telegramId } })

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	if (user.status > status) {
		console.warn(
			`👀Ваш статус ${defineUserStatus(
				user.status
			)} выше чем ${defineUserStatus(status)}. Отмена...`
		)
		return
	}

	if (user.status === status) {
		console.warn(`👀Ваш статус уже ${defineUserStatus(status)}. Отмена...`)
		return
	}

	// if (!checkStatusRequirements(user, status)) {
	// 	throw new Error(
	// 		`Недостаточно токенов для получения статуса ${defineUserStatus(status)}`
	// 	)
	// }

	user.status = status
	await user.save()

	console.log(
		`Статус пользователя ${telegramId} обновлен до ${defineUserStatus(status)}`
	)
	return user
}

const enableMiningForUser = async (telegramId, days) => {
	const user = await User.findOne({ where: { telegramId } })

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	const currentDate = new Date()
	let expiresAt

	if (user.automining && user.autominingExpiresAt > currentDate) {
		expiresAt = new Date(user.autominingExpiresAt)
		expiresAt.setDate(expiresAt.getDate() + days)
	} else {
		expiresAt = new Date()
		expiresAt.setDate(expiresAt.getDate() + days)
	}

	user.automining = true
	user.autominingExpiresAt = expiresAt
	await user.save()

	console.log(`Майнинг для ${telegramId} продлён до ${expiresAt}`)
	return user
}

const checkAndAddPugoDaily = async () => {
	const users = await User.findAll({ where: { automining: true } })

	for (const user of users) {
		if (user.autominingExpiresAt && new Date() < user.autominingExpiresAt) {
			await updateUserTokens(
				Number(user.telegramId),
				defineMiningAwardByStatus(user.status)
			)
		} else {
			user.automining = false
			user.autominingExpiresAt = null
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
	setStatusForUser,
}
