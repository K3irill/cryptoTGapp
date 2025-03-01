const Task = require('../models/Task')
const User = require('../models/User')
const UserTask = require('../models/UserTask')
const { checkSubscription } = require('../utils/checkTelegramSubscription')

const createTaskForAllUsers = async (icon, description, reward) => {
	// Создаём новую задачу в `Tasks`
	const task = await Task.create({ icon, description, reward })

	// Получаем всех пользователей
	const users = await User.findAll()

	// Создаём записи в `UserTasks`
	const userTasks = users.map(user => ({
		userId: user.telegramId,
		taskId: task.id,
		status: false, // Новая задача ещё не выполнена
	}))

	await UserTask.bulkCreate(userTasks)

	return task
}

const updateUserTaskStatus = async (userId, taskId) => {
	const userTask = await UserTask.findOne({
		where: { userId, taskId },
	})

	if (!userTask) {
		throw new Error('Задача не найдена для данного пользователя')
	}

	userTask.status = true
	await userTask.save()

	return userTask
}

async function checkAndUpdateTaskStatus(userId, taskId, chatId, botToken) {
	// Проверяем, выполняет ли пользователь задание
	const taskCompleted = await checkSubscription(userId, chatId, botToken)

	if (taskCompleted) {
		// Находим задачу, связанную с пользователем
		const userTask = await UserTask.findOne({
			where: { userId, taskId },
		})

		if (userTask) {
			// Обновляем статус задачи на "выполнено"
			userTask.status = true
			await userTask.save()
			console.log('Задание выполнено, статус обновлен.')
		} else {
			console.log('Задача не найдена для этого пользователя.')
		}
	} else {
		console.log('Пользователь не выполнил задание.')
	}
}

const getUserTasks = async userId => {
	const userTasks = await UserTask.findAll({
		where: { userId },
		include: [{ model: Task }],
	})

	return userTasks.map(ut => ({
		id: ut.Task.id,
		icon: ut.Task.icon,
		description: ut.Task.description,
		reward: ut.Task.reward,
		status: ut.status,
	}))
}

module.exports = {
	createTaskForAllUsers,
	updateUserTaskStatus,
	getUserTasks,
	checkAndUpdateTaskStatus,
}
