const products = {
	50: { stars: 50, pugo: 3500, description: '3500 BIFS' },
	150: { stars: 150, pugo: 10000, description: '10000 BIFS' },
	500: { stars: 500, pugo: 40000, description: '40000 BIFS' },
	1000: {
		stars: 1000,
		pugo: 100000,
		description: '100000 BIFS',
	},
	2500: {
		stars: 2500,
		pugo: 300000,
		description: '300000 BIFS',
	},
}

const autominingProducts = {
	7: {
		stars: 500,
		days: 7,
		description: '7 дней автомайнинга',
	},
	21: {
		stars: 1300,
		days: 21,
		description: '21 день автомайнинга',
	},
	40: {
		stars: 2000,
		days: 40,
		description: '40 дней автомайнинга',
	},
}

module.exports = {
	autominingProducts,
	products,
}
