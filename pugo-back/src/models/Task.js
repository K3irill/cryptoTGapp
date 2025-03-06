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

Task.associate = models => {
	Task.belongsToMany(models.User, {
		through: models.UserTask,
		foreignKey: 'taskId',
		otherKey: 'userId',
	})
}

module.exports = Task
