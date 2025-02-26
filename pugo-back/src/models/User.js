// src/models/User.js
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConfig')

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		telegramId: {
			type: DataTypes.BIGINT,
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
			type: DataTypes.INTEGER,
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

module.exports = User
