// src/models/UserTask.js
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConfig')

const UserTask = sequelize.define(
	'UserTask',
	{
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'telegramId',
			},
		},
		taskId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Tasks',
				key: 'id',
			},
		},
		status: {
			type: DataTypes.ENUM('available', 'pending', 'completed'),
			defaultValue: 'available',
		},
	},
	{
		timestamps: true,
		tableName: 'UserTasks',
	}
)

module.exports = UserTask
