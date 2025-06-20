// types.ts
export interface HeaderContent {
	site_link: string
	banner: {
		title: string
	}
}

export interface NavItem {
	id: string
	title: string
	src: string
	href: string
}
export interface FooterContent {
	navigation: {
		nav_elements: NavItem[]
	}
}

export interface ContentData {
	header: HeaderContent
	footer: FooterContent
	pages: any
}
// home: object
// 		bank: object
// 		exchange: object
// 		frens: object
// 		tasks: object
// 		rating: object
// 		map: object
