// types.ts

export interface HeaderContent {
	site_link: string
}

export interface NavItem {
	id: string
	title: string | null
	src: string | null
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
	tasks: TasksTypes
	frens: FrensTypes
	rating: object
	map: object
}
export interface TopSectionTypes {
	title: string
	titleWithBorder: boolean
}
export interface ContentData {
	header: HeaderContent
	footer: FooterContent
	pages: PagesTypes
}

export interface HomeTypes {
	top_section: TopSectionTypes | null
	site_link: string
	banner: {
		title: string
	}
}

export interface BankTypes {
	top_section: TopSectionTypes
}

export interface TasksTypes {
	top_section: TopSectionTypes
}
export interface FrensTypes {
	top_section: TopSectionTypes
}
export interface TasksApi {
	id: number
	icon: string
	description: string
	reward: string
	createdAt: Date
	updatedAt: Date
	link: string
	UserTask: {
		status: string
	}
}
// export interface ExchangeTypes {}

// export interface FrensTypes {}
// export interface RatingTypes {}
// export interface MapTypes {}
