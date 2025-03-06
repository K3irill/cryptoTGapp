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

// Завершить задачу
router.post('/:userId/tasks/:taskId/complete', async (req, res) => {
	const { userId, taskId } = req.params
	try {
		// Обновляем статус задачи пользователя

		// Находим запись в промежуточной таблице UserTask
		const userTasks = await getUserTasks(userId)
		const userTask = userTasks.find(task => task.id === parseInt(taskId))
		console.log('-----------------------------------------------', userTask)
		// Обновляем токены пользователя
		if (userTask.UserTask.status === 'completed') {
			res.status(400).json({ success: false, error: 'Задача уже выполнена!' })
			return
		}
		await updateUserTaskStatus(userId, taskId)
		await updateUserTokens(userId, +userTask.reward)

		res.json({ success: true, message: 'Задача выполнена' })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

router.post('/:userId/tg-tasks/:taskId/complete', async (req, res) => {
	const { userId, taskId } = req.params
	try {
		await checkAndUpdateTaskStatus(userId, taskId)
		res.json({ success: true, message: 'Задача выполнена' })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})
// Создать новую задачу и добавить её всем пользователям
router.post('/create', async (req, res) => {
	const { icon, description, reward } = req.body

	try {
		const task = await createTaskForAllUsers(icon, description, reward)
		res.json({ success: true, task })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

module.exports = router
