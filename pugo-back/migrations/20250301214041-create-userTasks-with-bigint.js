'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
	up: async queryInterface => {
		await queryInterface.createTable('UserTasks', {
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
			},
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
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		})
	},

	down: async queryInterface => {
		await queryInterface.dropTable('UserTasks')
	},
}
