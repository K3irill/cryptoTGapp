const express = require('express')

const router = express.Router()

router.post('/link', async (req, res) => {
	try {
		const { telegramId, walletAddress } = req.body
		if (!walletAddress) {
			return res
				.status(400)
				.json({ success: false, message: 'Нужен адрес кошелька' })
		}

		const updatedUser = await linkWallet(telegramId, walletAddress)
		res.status(200).json({ success: true, user: updatedUser })
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ success: false, message: 'Ошибка привязки кошелька' })
	}
})

module.exports = router
