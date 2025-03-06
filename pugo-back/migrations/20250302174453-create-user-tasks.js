'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('UserTasks', {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			userId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'Users', // Название таблицы (не модели!)
					key: 'telegramId',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			taskId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Tasks', // Название таблицы (не модели!)
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('UserTasks')
	},
}
