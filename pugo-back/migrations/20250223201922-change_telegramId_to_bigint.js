'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('Users', 'telegramId', {
			type: Sequelize.BIGINT,
			allowNull: false,
			unique: true,
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('Users', 'telegramId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		})
	},
}
