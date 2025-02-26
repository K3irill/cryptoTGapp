'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Users', 'newField', {
			type: Sequelize.STRING,
			allowNull: true,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Users', 'newField')
	},
}
