const User = require('../models/User')

const linkWallet = async (telegramId, walletAddress) => {
	const user = await User.findOne({ where: { telegramId } })
	if (!user) {
		throw new Error('Пользователь не найден')
	}

	user.walletAddress = walletAddress
	await user.save()
	return user
}

module.exports = { getWalletInfo, linkWallet }
