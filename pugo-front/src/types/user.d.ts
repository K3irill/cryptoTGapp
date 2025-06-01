export interface IUser {
	telegramId: string
	username: string
	lang: string
	balance: number
	tokens: string
	referralCode: string
	walletAddress: string | null
	referrals: string[]
	automining: boolean
	autominingExpiresAt: string | null
	transactions: Record<string, unknown>[]
	status: number
	caseAmount: string
	spacePugRecord: string
	cards: string[]
	ships: string[]
	createdAt: string
	updatedAt: string
}
