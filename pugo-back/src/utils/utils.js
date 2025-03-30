const statusConfig = require('../statusConfig')

const validateStatus = statusValue => {
	const statusNum = Number(statusValue)
	return Math.max(1, Math.min(statusNum, 10))
}

const defineUserStatus = statusValue => {
	const validStatus = validateStatus(statusValue)
	return statusConfig[validStatus]?.name || statusConfig[1].name
}

const defineMiningAwardByStatus = statusValue => {
	const validStatus = validateStatus(statusValue)
	return statusConfig[validStatus]?.miningAward || statusConfig[1].miningAward
}

const defineReferralAwardByStatus = statusValue => {
	const validStatus = validateStatus(statusValue)
	return (
		statusConfig[validStatus]?.referralAward || statusConfig[1].referralAward
	)
}

const checkStatusRequirements = (user, targetStatus) => {
	const validStatus = validateStatus(targetStatus)
	const targetConfig = statusConfig[validStatus]

	if (!targetConfig) return false

	const hasEnoughTokens = user.tokens >= targetConfig.requirements.minTokens

	return hasEnoughTokens
}

module.exports = {
	defineUserStatus,
	defineMiningAwardByStatus,
	defineReferralAwardByStatus,
	checkStatusRequirements,
	statusConfig,
	validateStatus,
}
