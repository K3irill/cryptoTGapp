// types.ts

export interface HeaderContent {
	site_link: string
}

export interface NavItem {
	id: string
	title: string | null
	src: string
	href: string
	availability: boolean
}
export interface FooterContent {
	navigation: {
		nav_elements: NavItem[]
		top_nav: NavItem[]
	}
}
export interface ActivityItem {
	id: number
	date: Date
	amount: number
	active: string
	wallet: string
}
export interface PagesTypes {
	home: HomeTypes
	bank: BankTypes
	exchange: object
	frens: object
	tasks: object
	rating: object
	map: object
}
export interface ContentData {
	header: HeaderContent
	footer: FooterContent
	pages: PagesTypes
}

export interface HomeTypes {
	top_section: object | null
	site_link: string
	banner: {
		title: string
	}
}

export interface BankTypes {
	top_section: {
		title: string
		titleWithBorder: boolean
	}
	user_section: {
		amount_coins: number
	}
	activity_section: {
		activity: ActivityItem[]
	}
}
// export interface ExchangeTypes {}

// export interface FrensTypes {}
// export interface TasksTypes {}
// export interface RatingTypes {}
// export interface MapTypes {}
