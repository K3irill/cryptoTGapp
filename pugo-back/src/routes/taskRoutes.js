const express = require('express')
const {
	getUserTasks,
	updateUserTaskStatus,
	createTaskForAllUsers,
	checkAndUpdateTaskStatus,
	checkSpacePugAchievements,
	checkCaseAchievements,
	checkReferralAchievements,
	checkFinancialAchievements,
	updateUserTaskProgress,
} = require('../services/taskService')
const { UserTask, Task, User, sequelize } = require('../models')
const { updateUserTokens } = require('../services/userService')
const { getUser } = require('../controllers/userController')
const router = express.Router()

// Получить задачи пользователя
router.get('/:userId/tasks', async (req, res) => {
	try {
		const { userId } = req.params
		const tasks = await getUserTasks(userId)
		res.json({ success: true, tasks })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

// Завершить обычную задачу
router.post('/:userId/tasks/:taskId/complete', async (req, res) => {
	try {
		const { userId, taskId } = req.params
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
				console.log(`Задача ${taskId} завершена, награда начислена`)
			} catch (error) {
				console.error('Ошибка при завершении задачи:', error.message)
			}
		}, 600000)

		res.json({
			success: true,
			message: 'Задача будет завершена через 10 минут',
		})
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

// Завершить Telegram-задачу
router.post('/:userId/tg-tasks/:taskId/complete', async (req, res) => {
	try {
		const { userId, taskId } = req.params
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
			return res
				.status(400)
				.json({ success: false, error: 'Задача уже выполнена!' })
		}

		await checkAndUpdateTaskStatus(userId, taskId, chatId)
		await updateUserTokens(userId, +userTask.reward)

		res.json({ success: true, message: 'Задача выполнена' })
	} catch (error) {
		await updateUserTaskStatus(
			req.params.telegramId,
			req.params.taskId,
			'available'
		)
		res.status(400).json({ success: false, error: error.message })
	}
})

// Создать новую задачу
router.post('/create', async (req, res) => {
	try {
		const {
			icon,
			description,
			reward,
			link,
			chatId,
			type,
			achievementType,
			targetValue,
		} = req.body

		const task = await createTaskForAllUsers(
			icon,
			description,
			reward,
			link,
			chatId,
			type,
			achievementType,
			targetValue
		)

		res.json({ success: true, task })
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

// Открытие кейсов
router.post('/case-opened', async (req, res) => {
	try {
		const { userId, amount } = req.body
		const user = await User.findByPk(userId)

		// Атомарное обновление в БД
		await user.increment('caseAmount', { by: amount })
		const updatedUser = await User.findByPk(userId)

		// Обновляем все связанные задачи
		await checkCaseAchievements(userId, updatedUser.caseAmount)

		const updatedTasks = await getUserTasks(userId)
		res.json({
			success: true,
			caseAmount: updatedUser.caseAmount,
			tasks: updatedTasks,
		})
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
})

// Завершение игры Space Pug
// routes/taskRoutes.js

router.post('/space-pug-completed', async (req, res) => {
	try {
		const { userId, score } = req.body

		// 1. Проверяем, что счет валидный
		if (typeof score !== 'number' || score < 0) {
			return res.status(400).json({
				success: false,
				error: 'Invalid score value',
			})
		}

		// 2. Проверяем достижения
		const achievements = await checkSpacePugAchievements(userId, score)

		// 3. Обновляем общий рекорд (если текущий счет больше)
		const user = await User.findByPk(userId)
		if (score > user.spacePugRecord) {
			user.spacePugRecord = score
			await user.save()
		}

		res.json({
			success: true,
			currentScore: score,
			personalRecord: user.spacePugRecord,
			achievements,
			tasks: await getUserTasks(userId),
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message,
		})
	}
})

module.exports = router
