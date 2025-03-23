export const CONTENT = {
	header: {},

	footer: {
		navigation: {
			nav_elements: [
				{
					id: '1',
					title: 'Главная',
					src: 'icons/home.svg',
					href: '/',
					availability: true,
				},
				{
					id: '2',
					title: 'Вывод',
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
					title: 'Маркет',
					src: 'icons/store.svg',
					href: '/store',
					availability: true,
				},
				{
					id: '6',
					title: 'Обмен',
					src: 'icons/exchange.svg',
					href: '/exchange',
					availability: true,
				},
			],
			top_nav: [
				{
					id: '1',
					title: 'Друзья',
					src: 'icons/frens.svg',
					href: '/frens',
					availability: true,
				},
				{
					id: '2',
					title: 'Задания',
					src: 'icons/task.svg',
					href: '/tasks',
					availability: true,
				},
				{
					id: '4',
					title: 'Заработать',
					src: 'icons/Bounty.svg',
					href: '/earn',
					availability: true,
				},
				{
					id: '3',
					title: 'Рейтинг',
					src: 'icons/rating.svg',
					href: '/rating',
					availability: false,
				},
				{
					id: '4',
					title: 'Карта',
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
				title: 'Вывод',
				titleWithBorder: false,
			},
		},
		exchange: {
			top_section: {
				title: 'Обмен',
				titleWithBorder: false,
			},
		},
		frens: {
			top_section: {
				title: 'Друзья',
				titleWithBorder: false,
			},
		},
		tasks: {
			top_section: {
				title: 'Задания',
				titleWithBorder: false,
			},
		},
		rating: {
			top_section: {
				title: 'Рейтинг',
				titleWithBorder: false,
			},
		},
		map: {
			top_section: {
				title: 'Карта',
				titleWithBorder: false,
			},
		},
		earn: {
			top_section: {
				title: 'Заработать',
				titleWithBorder: false,
			},
		},
		store: {
			top_section: {
				title: 'Маркет',
				titleWithBorder: false,
			},
		},
	},
}
