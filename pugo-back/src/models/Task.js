const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConfig')

const Task = sequelize.define(
	'Task',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		icon: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		reward: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: 'Tasks',
	}
)

module.exports = Task
