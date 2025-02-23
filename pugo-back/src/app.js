// src/app.js
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./config/dbConfig') // Правильный импорт sequelize
const bot = require('./bot') // Подключаем бота
const telegramRegisterRouter = require('./routes/telegram-register')
dotenv.config()

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(telegramRegisterRouter)
// Запуск сервера и синхронизация базы данных
sequelize.sync().then(() => {
	app.listen(3000, () => {
		console.log('Server is running on port 3000')
	})
})
