export enum NavCircleElement {
	LINK = 'link',
	BUTTON = 'button',
}

export interface NavCircleElementProps {
	children: React.ReactNode | string
	path?: string
	htmlTag?: NavCircleElement.LINK | NavCircleElement.BUTTON
}
