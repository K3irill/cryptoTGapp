const CONTENT = {
	header: {},

	footer: {
		navigation: {
			nav_elements: [
				{
					id: '1',
					title: null,
					src: 'icons/bank.png',
					href: '/bank',
					availability: true,
				},
				{ id: '2', title: 'PUGO', src: null, href: '#', availability: true },
				{
					id: '3',
					title: null,
					src: 'icons/home.png',
					href: '/',
					availability: true,
				},
				{ id: '4', title: 'COIN', src: null, href: '#', availability: true },
				{
					id: '5',
					title: null,
					src: 'icons/exchange.png',
					href: '/exchange',
					availability: true,
				},
			],
			top_nav: [
				{
					id: '1',
					title: 'FRENS',
					src: 'icons/frens.svg',
					href: '/frens',
					availability: true,
				},
				{
					id: '2',
					title: 'TASKS',
					src: 'icons/task.svg',
					href: '/tasks',
					availability: true,
				},
				{
					id: '3',
					title: 'RATING',
					src: 'icons/rating.svg',
					href: '/rating',
					availability: false,
				},
				{
					id: '4',
					title: 'MAP',
					src: 'icons/map.svg',
					href: '/map',
					availability: true,
				},
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
		exchange: {
			top_section: {
				title: 'Exchange',
				titleWithBorder: true,
			},
		},
		frens: {
			top_section: {
				title: 'Friends',
				titleWithBorder: false,
			},
		},
		tasks: {
			top_section: {
				title: 'Tasks',
				titleWithBorder: false,
			},
		},
		rating: {
			top_section: {
				title: 'Rating',
				titleWithBorder: false,
			},
		},
		map: {
			top_section: {
				title: 'Map',
				titleWithBorder: false,
			},
		},
	},
}

module.exports = CONTENT
