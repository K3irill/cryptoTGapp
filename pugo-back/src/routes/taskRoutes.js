const express = require('express')

const {
	getUserTasks,
	updateUserTaskStatus,
	createTaskForAllUsers,
	checkAndUpdateTaskStatus,
} = require('../services/taskService')
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
		await updateUserTaskStatus(userId, taskId)
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
