const { User, Task, UserTask } = require('../models')
const { checkSubscription } = require('../utils/checkTelegramSubscription')
const { sequelize } = require('../config/dbConfig')
const { Op } = require('sequelize')
const { updateUserTokens } = require('./userService')
const createTaskForAllUsers = async (
	icon,
	description,
	reward,
	link,
	chatId = null,
	type = 'default',
	achievementType = null,
	targetValue = null,
	period = 'once'
) => {
	const task = await Task.create({
		icon,
		description,
		reward,
		link,
		chatId,
		type,
		achievementType,
		targetValue,
		period,
	})

	const users = await User.findAll()

	const userTasks = users.map(user => ({
		userId: user.telegramId,
		taskId: task.id,
		status: 'available',
		currentProgress: 0,
	}))

	await UserTask.bulkCreate(userTasks)

	return task
}

const updateUserTaskProgress = async (userId, taskId, currentValue) => {
	try {
		const [userTask, created] = await UserTask.findOrCreate({
			where: { userId, taskId },
			defaults: {
				status: 'available',
				currentProgress: 0,
			},
		})

		const task = await Task.findByPk(taskId)
		if (!task) throw new Error('Task not found')

		let rewardGiven = false

		userTask.currentProgress = currentValue

		if (userTask.status !== 'completed' && currentValue >= task.targetValue) {
			userTask.status = 'completed'
			userTask.completedAt = new Date()

			await updateUserTokens(userId, Number(task.reward))
			rewardGiven = true

			console.log(
				`🎁 Награда начислена - UserID: ${userId}, TaskID: ${taskId}, Reward: ${task.reward}`
			)
		}

		await userTask.save()

		return {
			userTask,
			rewardGiven,
			rewardAmount: rewardGiven ? Number(task.reward) : 0,
		}
	} catch (error) {
		console.error('Error in updateUserTaskProgress:', error)
		throw error
	}
}

// Проверка достижений в Space Pug
const checkSpacePugAchievements = async (userId, currentScore) => {
	try {
		// Получаем все задачи типа space_pug_score
		const tasks = await Task.findAll({
			where: {
				type: 'game_achievement',
				achievementType: 'space_pug_score',
			},
		})

		const results = []
		for (const task of tasks) {
			console.log(`🆘🆘🆘🆘🆘🆘${currentScore} >= ${task.targetValue}`)
			// Проверяем, достигнут ли рекорд в одной игре
			if (currentScore >= task.targetValue) {
				const result = await updateUserTaskProgress(
					userId,
					task.id,
					currentScore // Прогресс = текущий рекорд
				)

				results.push({
					taskId: task.id,
					targetScore: task.targetValue,
					rewardGiven: result.rewardGiven,
					rewardAmount: result.rewardAmount,
				})
			}
		}

		return results
	} catch (error) {
		console.error('Error in checkSpacePugAchievements:', error)
		throw error
	}
}
// services/taskService.js
const checkCaseAchievements = async (userId, casesOpened) => {
	try {
		// Находим ВСЕ задачи на открытие кейсов (не фильтруем по targetValue)
		const tasks = await Task.findAll({
			where: {
				type: 'game_achievement',
				achievementType: 'open_cases',
			},
		})

		// Обновляем прогресс для всех задач
		for (const task of tasks) {
			await updateUserTaskProgress(userId, task.id, casesOpened)
		}
	} catch (error) {
		console.error('Error in checkCaseAchievements:', error)
		throw error
	}
}

// Проверка реферальных достижений
const checkReferralAchievements = async userId => {
	const user = await User.findByPk(userId, {
		include: [{ model: Task, where: { achievementType: 'referrals_count' } }],
	})

	if (!user) return

	const referralCount = user.referrals.length

	for (const task of user.Tasks) {
		await updateUserTaskProgress(userId, task.id, referralCount)
	}
}
const updateUserTaskStatus = async (userId, taskId, status = 'completed') => {
	const userTask = await UserTask.findOne({
		where: { userId, taskId },
	})

	if (!userTask) {
		throw new Error('Задача не найдена для данного пользователя')
	}

	userTask.status = status
	await userTask.save()

	return userTask
}

// Проверка финансовых достижений
const checkFinancialAchievements = async (userId, amount) => {
	// Для задач на сумму депозита
	const amountTasks = await Task.findAll({
		where: {
			type: 'financial',
			achievementType: 'deposit_amount',
			targetValue: { [Op.lte]: amount },
		},
	})

	for (const task of amountTasks) {
		await updateUserTaskProgress(userId, task.id, amount)
	}

	// Для задач на количество депозитов
	const user = await User.findByPk(userId)
	const depositCount = user.transactions.filter(
		t => t.type === 'deposit'
	).length

	const countTasks = await Task.findAll({
		where: {
			type: 'financial',
			achievementType: 'deposit_count',
			targetValue: { [Op.lte]: depositCount },
		},
	})

	for (const task of countTasks) {
		await updateUserTaskProgress(userId, task.id, depositCount)
	}
}

// Проверка подписки (существующая функция)
async function checkAndUpdateTaskStatus(userId, taskId, chatId, botToken) {
	await updateUserTaskStatus(userId, taskId, 'pending')
	const taskCompleted = await checkSubscription(userId, chatId, botToken)

	if (taskCompleted) {
		const userTask = await UserTask.findOne({
			where: { userId, taskId },
		})

		if (!userTask) {
			throw new Error('Задача не найдена для данного пользователя')
		}

		userTask.status = 'completed'
		await userTask.save()

		return userTask
	} else {
		await updateUserTaskStatus(userId, taskId, 'available')
		throw new Error('Пользователь не выполнил задачу')
	}
}

// Получение задач пользователя (расширенная версия)
const getUserTasks = async userId => {
	const user = await User.findOne({
		where: { telegramId: userId },
		include: [
			{
				model: Task,
				through: {
					attributes: ['status', 'currentProgress', 'completedAt'],
				},
			},
		],
	})

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	// Добавляем информацию о прогрессе
	const tasksWithProgress = user.Tasks.map(task => {
		const userTask = task.UserTask
		return {
			...task.toJSON(),
			progress: userTask.currentProgress,
			isCompleted: userTask.status === 'completed',
			completedAt: userTask.completedAt,
		}
	})

	return tasksWithProgress
}

// Сброс периодических задач
const resetPeriodicTasks = async () => {
	// Ежедневные задачи
	await UserTask.update(
		{ status: 'available', currentProgress: 0 },
		{
			where: { status: 'completed' },
			include: [
				{
					model: Task,
					where: { period: 'daily' },
				},
			],
		}
	)

	// Еженедельные задачи (по понедельникам)
	if (new Date().getDay() === 1) {
		await UserTask.update(
			{ status: 'available', currentProgress: 0 },
			{
				where: { status: 'completed' },
				include: [
					{
						model: Task,
						where: { period: 'weekly' },
					},
				],
			}
		)
	}

	// Ежемесячные задачи (в первый день месяца)
	if (new Date().getDate() === 1) {
		await UserTask.update(
			{ status: 'available', currentProgress: 0 },
			{
				where: { status: 'completed' },
				include: [
					{
						model: Task,
						where: { period: 'monthly' },
					},
				],
			}
		)
	}
}

module.exports = {
	createTaskForAllUsers,
	updateUserTaskStatus,
	getUserTasks,
	checkAndUpdateTaskStatus,
	checkSpacePugAchievements,
	checkCaseAchievements,
	checkReferralAchievements,
	checkFinancialAchievements,
	resetPeriodicTasks,
	updateUserTaskProgress,
	updateUserTaskStatus,
	getUserTasks,
}
