const cron = require('node-cron')
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const { sequelize, User } = require('./models')
const exchangeRoutes = require('./routes/exchange')
// const webhooksRoutes = require('./routes/webhooks')
const walletRoutes = require('./routes/wallet')
const userRoutes = require('./routes/userRotes')
const taskRoutes = require('./routes/taskRoutes')
const telegramRegisterRouter = require('./routes/telegram-register')
const CONTENT = require('./content')
const bot = require('./config/telegramConfig')
const setupBotCommands = require('./botCommands')
const { checkAndAddPugoDaily } = require('./services/userService')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Подключение роутов
app.use('/api/wallet', walletRoutes)
app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/exchange', exchangeRoutes)
// app.use('/api/webhooks/', webhooksRoutes)
app.use(telegramRegisterRouter)

app.get('/api/content', (req, res) => {
	res.json(CONTENT)
})

app.use((err, req, res, next) => {
	console.error('❌ Ошибка:', err.stack)
	res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' })
})
// Запускать задачу каждый день в полночь
cron.schedule('0 0 * * *', async () => {
	const users = await User.findAll({ where: { autominig: true } })

	for (const user of users) {
		await checkAndAddPugoDaily(user.telegramId)
	}
})

const startServer = async () => {
	try {
		await sequelize.sync({ force: true }) //  { force: true }
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
		process.exit(1)
	}
}

startServer()
