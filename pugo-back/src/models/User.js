const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConfig')

const User = sequelize.define(
	'User',
	{
		telegramId: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		tokens: {
			type: DataTypes.BIGINT,
			defaultValue: 100,
		},
		referralCode: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		walletAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		tableName: 'Users',
	}
)

User.associate = models => {
	User.belongsToMany(models.Task, {
		through: models.UserTask,
		foreignKey: 'userId',
		otherKey: 'taskId',
	})
}

module.exports = User
