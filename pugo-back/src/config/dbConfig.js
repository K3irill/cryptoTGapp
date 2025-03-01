// src/config/dbConfig.js
require('dotenv').config()
const { Sequelize } = require('sequelize')

// Инициализация sequelize
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
	}
)

module.exports = { sequelize }

//для миграций  npx sequelize-cli db:migrate --config src/config/dbConfig.js
// // src/config/dbConfig.js
// require('dotenv').config()

// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'postgres',  // Убедись, что диалект указан
//   },
//   test: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'postgres',  // Убедись, что диалект указан
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'postgres',  // Убедись, что диалект указан
//   },
// }
