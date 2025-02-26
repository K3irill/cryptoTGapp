const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Transaction = sequelize.define(
	'Transaction',
	{
		userId: { type: DataTypes.INTEGER, allowNull: false },
		type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
		amount: { type: DataTypes.INTEGER, allowNull: false },
		description: { type: DataTypes.STRING },
	},
	{ timestamps: true }
)

module.exports = Transaction
