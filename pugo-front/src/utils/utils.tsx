/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { statusConfig } from '@/assets/constants/statusConfig'

export const defineUserStatus = (statusValue: number) => {
	return statusConfig[statusValue]?.name || statusConfig[0].name
}

export const defineMiningAwardByStatus = (statusValue: number) => {
	return statusConfig[statusValue]?.miningAward || statusConfig[0].miningAward
}

export const defineReferralAwardByStatus = (statusValue: number) => {
	return (
		statusConfig[statusValue]?.referralAward || statusConfig[0].referralAward
	)
}

export const checkStatusRequirements = (user, targetStatus) => {
	const targetConfig = statusConfig[targetStatus]
	if (!targetConfig) return false

	return user.tokens >= targetConfig.requirements.minTokens
}
