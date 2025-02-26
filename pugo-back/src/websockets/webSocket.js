// const WebSocket = require('ws')
// const User = require('../models/User')

// let wss

// const initializeWebSocket = server => {
// 	wss = new WebSocket.Server({ server })

// 	wss.on('connection', ws => {
// 		console.log('🔗 Клиент подключился к WebSocket')

// 		ws.on('message', message => {
// 			console.log(`📩 Получено сообщение: ${message}`)
// 		})

// 		ws.on('close', () => {
// 			console.log('❌ Клиент отключился')
// 		})
// 	})
// }

// const sendTokenUpdate = (telegramId, tokens) => {
// 	console.log('📡 Отправка обновлений для', telegramId, 'с токенами:', tokens)
// 	wss.clients.forEach(client => {
// 		if (client.readyState === WebSocket.OPEN) {
// 			client.send(JSON.stringify({ telegramId, tokens }))
// 			console.log('✅ Сообщение отправлено:', telegramId, tokens)
// 		}
// 	})
// }

// const sendTokenUpdatesToAllClients = () => {
// 	User.findAll().then(users => {
// 		users.forEach(user => {
// 			wss.clients.forEach(client => {
// 				if (client.readyState === WebSocket.OPEN) {
// 					client.send(
// 						JSON.stringify({ telegramId: user.telegramId, tokens: user.tokens })
// 					)
// 					console.log(
// 						'✅ Сообщение отправлено всем клиентам:',
// 						user.telegramId,
// 						user.tokens
// 					)
// 				}
// 			})
// 		})
// 	})
// }

// setInterval(sendTokenUpdatesToAllClients, 15000)

// module.exports = {
// 	initializeWebSocket,
// 	sendTokenUpdate,
// 	sendTokenUpdatesToAllClients,
// }
