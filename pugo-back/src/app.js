const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const { sequelize } = require('./models')
const exchangeRoutes = require('./routes/exchange')
const walletRoutes = require('./routes/wallet')
const userRoutes = require('./routes/userRotes')
const taskRoutes = require('./routes/taskRoutes')
const telegramRegisterRouter = require('./routes/telegram-register')
const CONTENT = require('./content')
const bot = require('./config/telegramConfig')
const setupBotCommands = require('./botCommands') // Импортируем логику бота

// Загружаем переменные окружения
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Подключение роутов
app.use('/api/wallet', walletRoutes)
app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)
app.use('/api', exchangeRoutes)
app.use(telegramRegisterRouter)

// Маршрут для получения контента
app.get('/api/content', (req, res) => {
	res.json(CONTENT)
})

// Обработка ошибок
app.use((err, req, res, next) => {
	console.error('❌ Ошибка:', err.stack)
	res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' })
})

// Запуск сервера и бота
const startServer = async () => {
	try {
		// Синхронизация моделей с базой данных
		await sequelize.sync() // Уберите { force: true } в продакшене
		await sequelize.authenticate()

		// Запуск сервера
		const PORT = process.env.PORT || 7000
		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`)
		})

		// Настройка команд бота
		setupBotCommands(bot)
		console.log('🤖 Telegram Bot is running...')
	} catch (error) {
		console.error('❌ Ошибка при запуске сервера:', error)
		process.exit(1) // Завершаем процесс с ошибкой
	}
}

startServer()
