const CONTENT = {
	header: {},

	footer: {
		navigation: {
			nav_elements: [
				{
					id: '1',
					title: null,
					src: 'icons/bank.svg',
					href: '/bank',
					availability: true,
				},
				{ id: '2', title: 'PUGO', src: null, href: '#', availability: true },
				{
					id: '3',
					title: null,
					src: 'icons/home.svg',
					href: '/',
					availability: true,
				},
				{ id: '4', title: 'COIN', src: null, href: '#', availability: true },
				{
					id: '5',
					title: null,
					src: 'icons/exchange.svg',
					href: '/exchange',
					availability: false,
				},
			],
			top_nav: [
				{
					id: '1',
					title: 'FRENS',
					src: 'icons/frens.svg',
					href: '/frens',
					availability: false,
				},
				{
					id: '2',
					title: 'TASKS',
					src: 'icons/task.svg',
					href: '/tasks',
					availability: false,
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
					availability: false,
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
			user_section: {
				amount_coins: 1500,
			},
			activity_section: {
				activity: [
					{
						id: 0,
						date: '02.02.2025',
						amount: 2000,
						active: 'send',
						wallet: 'UZQDc..ssqrv',
					},
					{
						id: 1,
						date: '01.02.2025',
						amount: 12000,
						active: 'receive',
						wallet: 'UZQDc..ssqrv',
					},
					{
						id: 2,
						date: '30.01.2025',
						amount: 9000,
						active: 'receive',
						wallet: 'UZQDc..ssqrv',
					},
					{
						id: 3,
						date: '29.02.2025',
						amount: 15000,
						active: 'receive',
						wallet: 'UZQDc..ssqrv',
					},
				],
			},
		},
		exchange: {},
		frens: {},
		tasks: {},
		rating: {},
		map: {},
	},
}

module.exports = CONTENT
