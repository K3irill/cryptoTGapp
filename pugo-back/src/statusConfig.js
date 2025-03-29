const statusConfig = {
	0: {
		name: 'COMMON',
		miningAward: 1000,
		referralAward: 50,
		requirements: {
			minTokens: 0,
			// другие требования для статуса
		},
	},
	1: {
		name: 'VIP',
		miningAward: 2000,
		referralAward: 100,
		requirements: {
			minTokens: 5000,
			// другие требования для статуса VIP
		},
	},
	2: {
		name: 'ELITE',
		miningAward: 3000,
		referralAward: 150,
		requirements: {
			minTokens: 15000,
			// другие требования
		},
	},
	3: {
		name: 'BOSS',
		miningAward: 4000,
		referralAward: 200,
		requirements: {
			minTokens: 30000,
			// другие требования
		},
	},
	4: {
		name: 'GOD',
		miningAward: 5000,
		referralAward: 250,
		requirements: {
			minTokens: 50000,
			// другие требования
		},
	},
}

module.exports = statusConfig
