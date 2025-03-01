const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConfig')
const User = require('./User')
const Task = require('./Task')

const UserTask = sequelize.define(
	'UserTask',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: User,
				key: 'telegramId',
			},
		},
		taskId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Task,
				key: 'id',
			},
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		timestamps: true,
		tableName: 'UserTasks',
	}
)

// Определяем связи
User.belongsToMany(Task, { through: UserTask, foreignKey: 'userId' })
Task.belongsToMany(User, { through: UserTask, foreignKey: 'taskId' })

module.exports = UserTask
