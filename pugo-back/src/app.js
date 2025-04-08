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
const {
	checkAndAddPugoDaily,
	enableMiningForUser,
} = require('./services/userService')

dotenv.config()

const app = express()


const corsOptions = {
  origin: ['https://api.bifscoin-api.ru', 'https://app.bifscoin-api.ru', 'https://bifscoin-api.ru'], 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}

// Middleware
app.use(cors(corsOptions))
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

cron.schedule('0 0 * * *', async () => {
	console.log('👀Запуск ежедневной проверки автомайнинга...')
	try {
		await checkAndAddPugoDaily()
		console.log('✅Ежедневная проверка автомайнинга завершена')
	} catch (error) {
		console.error('☠️Ошибка при проверке автомайнинга:', error)
	}
})
const startServer = async () => {
	try {
		await sequelize.sync() //  { force: true }
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
