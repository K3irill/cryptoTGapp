// src/routes/userRoutes.js
const express = require('express')
const { getUser, depositBalance } = require('../controllers/userController')
const router = express.Router()

// Получить информацию о пользователе
router.get('/', getUser)

// Пополнить баланс
router.post('/deposit', depositBalance)

module.exports = router
