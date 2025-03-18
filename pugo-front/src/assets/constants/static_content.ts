export const CONTENT = {
	header: {},

	footer: {
		navigation: {
			nav_elements: [
				{
					id: '1',
					title: 'Home',
					src: 'icons/home.svg',
					href: '/',
					availability: true,
				},
				{
					id: '2',
					title: 'Withdraw',
					src: 'icons/bank.svg',
					href: '/bank',
					availability: false,
				},

				{
					id: '4',
					title: null,
					isButton: true,
					src: 'icons/open.png',
					href: '#',
					availability: true,
				},
				{
					id: '5',
					title: 'Store',
					src: 'icons/store.svg',
					href: '/store',
					availability: false,
				},
				{
					id: '6',
					title: 'Exchange',
					src: 'icons/exchange.svg',
					href: '/exchange',
					availability: true,
				},
			],
			top_nav: [
				{
					id: '1',
					title: 'Frens',
					src: 'icons/frens.svg',
					href: '/frens',
					availability: true,
				},
				{
					id: '2',
					title: 'Tasks',
					src: 'icons/task.svg',
					href: '/tasks',
					availability: true,
				},
				{
					id: '4',
					title: 'Earn',
					src: 'icons/Bounty.svg',
					href: '/earn',
					availability: false,
				},
				{
					id: '3',
					title: 'Rating',
					src: 'icons/rating.svg',
					href: '/rating',
					availability: false,
				},
				{
					id: '4',
					title: 'Map',
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
				titleWithBorder: false,
			},
		},
		exchange: {
			top_section: {
				title: 'Exchange',
				titleWithBorder: false,
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
		earn: {
			top_section: {
				title: 'Earn',
				titleWithBorder: false,
			},
		},
	},
}
