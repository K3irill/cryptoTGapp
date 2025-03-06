const { User, Task, UserTask } = require('../models')
const { checkSubscription } = require('../utils/checkTelegramSubscription')
const { sequelize } = require('../config/dbConfig') // Убедись, что путь к файлу правильный

const createTaskForAllUsers = async (icon, description, reward) => {
	// Создаём новую задачу в `Tasks`
	const task = await Task.create({ icon, description, reward })

	// Получаем всех пользователей
	const users = await User.findAll()

	// Создаём записи в `UserTasks` для каждого пользователя
	const userTasks = users.map(user => ({
		userId: user.telegramId,
		taskId: task.id,
		status: 'pending', // Устанавливаем статус по умолчанию
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

	// Обновляем статус на "completed"
	userTask.status = 'completed'
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

		if (!userTask) {
			throw new Error('Задача не найдена для данного пользователя')
		}

		// Обновляем статус задачи
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
				through: { attributes: ['status'] }, // Включаем статус из промежуточной таблицы
			},
		],
	})

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	return user.Tasks // Возвращаем задачи пользователя
}

module.exports = {
	createTaskForAllUsers,
	updateUserTaskStatus,
	getUserTasks,
	checkAndUpdateTaskStatus,
}
