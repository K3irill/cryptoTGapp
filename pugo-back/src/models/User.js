// src/models/User.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')

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
		friends: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			defaultValue: [],
		},
		invitedUsers: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			defaultValue: [],
		},
	},
	{
		timestamps: true,
		tableName: 'Users',
	}
)

module.exports = User
