const express = require('express')

const {
	getUserTasks,
	updateUserTaskStatus,
	createTaskForAllUsers,
	checkAndUpdateTaskStatus,
} = require('../services/taskService')
const { UserTask, Task } = require('../models')
const { updateUserTokens } = require('../services/userService')
const router = express.Router()

// Получить задачи пользователя
router.get('/:userId/tasks', async (req, res) => {
	const { userId } = req.params
	try {
		const tasks = await getUserTasks(userId)

		res.json({ success: true, tasks })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

router.post('/:userId/tasks/:taskId/complete', async (req, res) => {
	const { userId, taskId } = req.params

	try {
		const userTasks = await getUserTasks(userId)
		const userTask = userTasks.find(task => task.id === parseInt(taskId))

		if (!userTask) {
			return res
				.status(404)
				.json({ success: false, error: 'Задача не найдена' })
		}

		if (userTask.UserTask.status === 'completed') {
			return res
				.status(400)
				.json({ success: false, error: 'Задача уже выполнена!' })
		}

		await updateUserTaskStatus(userId, taskId, 'pending')

		setTimeout(async () => {
			try {
				await updateUserTaskStatus(userId, taskId, 'completed')

				await updateUserTokens(userId, +userTask.reward)

				console.log(
					`Задача ${taskId} завершена, награда начислена пользователю ${userId}`
				)
			} catch (error) {
				console.error('Ошибка при завершении задачи:', error.message)
			}
		}, 600000)

		res.json({
			success: true,
			message: 'Задача будет завершена через 10 минут',
		})
	} catch (error) {
		console.error('Ошибка:', error.message)
		res.status(400).json({ success: false, error: error.message })
	}
})

router.post('/:userId/tg-tasks/:taskId/complete', async (req, res) => {
	const { userId, taskId } = req.params

	try {
		const userTasks = await getUserTasks(userId)
		const userTask = userTasks.find(task => task.id === parseInt(taskId))
		if (!userTask) {
			return res
				.status(404)
				.json({ success: false, error: 'Задача не найдена' })
		}
		const chatId = userTask.chatId
		if (!chatId) {
			return res
				.status(400)
				.json({ success: false, error: 'chatId не найден в задаче' })
		}

		if (userTask.UserTask.status === 'completed') {
			res.status(400).json({ success: false, error: 'Задача уже выполнена!' })
			return
		}

		await checkAndUpdateTaskStatus(userId, taskId, chatId)
		await updateUserTokens(userId, +userTask.reward)

		res.json({ success: true, message: 'Задача выполнена' })
	} catch (error) {
		await updateUserTaskStatus(userId, taskId, 'available')
		res.status(400).json({ success: false, error: error.message })
	}
})

// Создать новую задачу и добавить её всем пользователям
router.post('/create', async (req, res) => {
	const { icon, description, reward, link, chatId } = req.body

	try {
		const task = await createTaskForAllUsers(
			icon,
			description,
			reward,
			link,
			chatId
		)
		res.json({ success: true, task })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

module.exports = router
