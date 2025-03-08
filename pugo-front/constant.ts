export const IS_DEV = process.env.NEXT_PUBLIC_IS_DEV
export const REQUEST_LINK =
	IS_DEV === 'true'
		? process.env.NEXT_PUBLIC_DEV_PATH
		: process.env.NEXT_PUBLIC_PROD_PATH
