export const CONTENT = {
	header: {},

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
			top_nav: [
				{ id: '1', title: 'FRENS', src: 'icons/frens.svg', href: '/frens' },
				{ id: '2', title: 'TASKS', src: 'icons/task.svg', href: '/tasks' },
				{ id: '3', title: 'RATING', src: 'icons/rating.svg', href: '/rating' },
				{ id: '4', title: 'MAP', src: 'icons/map.svg', href: '/map' },
			],
		},
	},

	pages: {
		home: {
			top_section: null,
			site_link: 'https://www.static-pugo.com',
			banner: {
				title: 'Listing will be soon, trust us <3',
			},
		},
		bank: {
			top_section: {
				title: 'Bank',
				titleWithBorder: true,
			},
		},
		exchange: {},
		frens: {},
		tasks: {},
		rating: {},
		map: {},
	},
}
