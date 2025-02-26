const cors = require('cors')
const express = require('express')
const http = require('http') // ✅ Добавляем http
const dotenv = require('dotenv')
const { sequelize } = require('./config/dbConfig')
const bot = require('./bot')
const exchangeRoutes = require('./routes/exchange')
const walletRoutes = require('./routes/wallet')
const userRoutes = require('./routes/userRotes')
const telegramRegisterRouter = require('./routes/telegram-register')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Подключение роутов
app.use('/api/wallet', walletRoutes)
app.use('/api/user', userRoutes)
app.use('/api', exchangeRoutes)
app.use(telegramRegisterRouter)

const server = http.createServer(app)

const startServer = async () => {
	try {
		await sequelize.sync()

		server.listen(7000, () => {
			console.log('🚀 Server is running on port 7000')
		})
	} catch (error) {
		console.error('❌ Ошибка при запуске сервера:', error)
	}
}

startServer()
