const express = require('express')
const router = express.Router()

router.post('/payment-webhook', (req, res) => {
	const { successful_payment, chat_id } = req.body

	if (successful_payment) {
		console.log('Payment successful:', successful_payment)

		res.status(200).send('Payment success')
	} else {
		console.log('Payment failed:', req.body)
		res.status(400).send('Payment failed')
	}
})
module.exports = router
