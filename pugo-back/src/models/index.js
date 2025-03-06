// src/models/index.js
const { sequelize } = require('../config/dbConfig')
const User = require('./User')
const Task = require('./Task')
const UserTask = require('./UserTask')

// Настройка ассоциаций
User.associate({ Task, UserTask })
Task.associate({ User, UserTask })

module.exports = {
	sequelize,
	User,
	Task,
	UserTask,
}
