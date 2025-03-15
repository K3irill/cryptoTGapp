const { User, Task, UserTask } = require('../models')
const { checkSubscription } = require('../utils/checkTelegramSubscription')
const { sequelize } = require('../config/dbConfig')

const createTaskForAllUsers = async (
	icon,
	description,
	reward,
	link,
	chatId = null
) => {
	const task = await Task.create({ icon, description, reward, link, chatId })

	const users = await User.findAll()

	const userTasks = users.map(user => ({
		userId: user.telegramId,
		taskId: task.id,
		status: 'available',
	}))

	await UserTask.bulkCreate(userTasks)

	return task
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

async function checkAndUpdateTaskStatus(userId, taskId, chatId, botToken) {
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
		throw new Error('Пользователь не выполнил задачу')
	}
}

const getUserTasks = async userId => {
	const user = await User.findOne({
		where: { telegramId: userId },
		include: [
			{
				model: Task,
				through: { attributes: ['status'] },
			},
		],
	})

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	return user.Tasks
}

module.exports = {
	createTaskForAllUsers,
	updateUserTaskStatus,
	getUserTasks,
	checkAndUpdateTaskStatus,
}
