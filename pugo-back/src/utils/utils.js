const statusConfig = require('../statusConfig')

const defineUserStatus = statusValue => {
	return statusConfig[statusValue]?.name || statusConfig[0].name
}

const defineMiningAwardByStatus = statusValue => {
	return statusConfig[statusValue]?.miningAward || statusConfig[0].miningAward
}

const defineReferralAwardByStatus = statusValue => {
	return (
		statusConfig[statusValue]?.referralAward || statusConfig[0].referralAward
	)
}

const checkStatusRequirements = (user, targetStatus) => {
	const targetConfig = statusConfig[targetStatus]
	if (!targetConfig) return false

	return user.tokens >= targetConfig.requirements.minTokens
	// можно добавить другие проверки
}

module.exports = {
	defineUserStatus,
	defineMiningAwardByStatus,
	defineReferralAwardByStatus,
	checkStatusRequirements,
	statusConfig,
}
