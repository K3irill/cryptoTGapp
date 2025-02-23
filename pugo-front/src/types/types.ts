// types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HeaderContent {
	site_link: string
}

export interface NavItem {
	id: string
	title: string | null
	src: string
	href: string
}
export interface FooterContent {
	navigation: {
		nav_elements: NavItem[]
		top_nav: NavItem[]
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
