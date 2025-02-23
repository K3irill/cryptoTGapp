// src/models/Task.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')

const Task = sequelize.define('Task', {
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	reward: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
})

module.exports = Task
