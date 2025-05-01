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
		link: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		chatId: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		description: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		reward: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM(
				'subscription',
				'game_achievement',
				'referral',
				'financial',
				'daily',
				'social',
				'collection',
				'combo',
				'event',
				'hardcore'
			),
			defaultValue: 'game_achievement',
		},
		achievementType: {
			type: DataTypes.ENUM(
				'open_cases',
				'space_pug_score',
				'referrals_count',
				'deposit_amount',
				'deposit_count',
				'login_streak',
				'social_action',
				'collect_cards',
				'collect_ships',
				'combo',
				'event',
				'hardcore'
			),
			allowNull: true,
		},
		targetValue: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		period: {
			type: DataTypes.ENUM('once', 'daily', 'weekly', 'monthly'),
			defaultValue: 'once',
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
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
