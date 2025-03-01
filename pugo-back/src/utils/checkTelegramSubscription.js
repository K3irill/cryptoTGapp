const axios = require('axios')
require('dotenv').config()

async function checkSubscription(
	userId,
	chatId,
	botToken = process.env.TELEGRAM_BOT_TOKEN
) {
	const url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${chatId}&user_id=${userId}`

	try {
		const response = await axios.get(url)
		const status = response.data.result.status

		if (
			status === 'member' ||
			status === 'administrator' ||
			status === 'creator'
		) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error('Error checking subscription:', error)
		return false
	}
}

module.exports = {
	checkSubscription,
}
