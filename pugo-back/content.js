const CONTENT = {
	header: {
		site_link: 'https://www.pugo.com',
	},

	footer: {
		navigation: {
			nav_elements: [
				{ id: '1', title: null, src: 'icons/bank.svg', href: '/bank' },
				{ id: '2', title: 'PUGO', src: null, href: '#' },
				{ id: '3', title: null, src: 'icons/home.svg', href: '/' },
				{ id: '4', title: 'COIN', src: null, href: '#' },
				{
					id: '5',
					title: null,
					src: 'icons/exchange.svg',
					href: '/exchange',
				},
			],
		},
	},

	pages: {
		home: {
			banner: {
				title: 'Listing will be soon, trust us <3',
			},
			navigation: [
				{ id: '1', title: 'FRENS', src: 'icons/frens.svg', href: '/frens' },
				{ id: '2', title: 'TASKS', src: 'icons/task.svg', href: '/tasks' },
				{ id: '3', title: 'RATING', src: 'icons/rating.svg', href: '/rating' },
				{ id: '4', title: 'MAP', src: 'icons/map.svg', href: '/map' },
			],
		},
		bank: {},
		exchange: {},
		frens: {},
		tasks: {},
		rating: {},
		map: {},
	},
}

module.exports = CONTENT
