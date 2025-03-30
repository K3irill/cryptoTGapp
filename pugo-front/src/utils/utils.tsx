/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
// @ts-nocheck
import { statusConfig } from '@/assets/constants/statusConfig'

// Тип для статуса (1-10)
type StatusValue = keyof typeof statusConfig

export const defineUserStatus = (statusValue: number): string => {
	const statusKey = Math.max(1, Math.min(statusValue, 10)) as StatusValue
	return statusConfig[statusKey]?.name || statusConfig[1].name
}

export const defineMiningAwardByStatus = (statusValue: number): number => {
	const statusKey = Math.max(1, Math.min(statusValue, 10)) as StatusValue
	return statusConfig[statusKey]?.miningAward || statusConfig[1].miningAward
}

export const defineReferralAwardByStatus = (statusValue: number): number => {
	const statusKey = Math.max(1, Math.min(statusValue, 10)) as StatusValue
	return statusConfig[statusKey]?.referralAward || statusConfig[1].referralAward
}

export const checkStatusRequirements = (
	user: { tokens: number },
	targetStatus: number
): boolean => {
	const statusKey = Math.max(1, Math.min(targetStatus, 10)) as StatusValue
	const targetConfig = statusConfig[statusKey]

	if (!targetConfig) return false
	return user.tokens >= targetConfig.requirements.minTokens
}
/**
 * Преобразует HEX цвет в HSL
 */
const hexToHsl = (hex: string): [number, number, number] => {
	let r = 0,
		g = 0,
		b = 0

	// 3-значный HEX
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16)
		g = parseInt(hex[2] + hex[2], 16)
		b = parseInt(hex[3] + hex[3], 16)
	}
	// 6-значный HEX
	else if (hex.length === 7) {
		r = parseInt(hex[1] + hex[2], 16)
		g = parseInt(hex[3] + hex[4], 16)
		b = parseInt(hex[5] + hex[6], 16)
	}

	r /= 255
	g /= 255
	b /= 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0,
		s = 0,
		l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h /= 6
	}

	return [h * 360, s * 100, l * 100]
}

/**
 * Преобразует HSL в HEX
 */
const hslToHex = (h: number, s: number, l: number): string => {
	l /= 100
	const a = (s * Math.min(l, 1 - l)) / 100
	const f = (n: number) => {
		const k = (n + h / 30) % 12
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0')
	}
	return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Осветляет цвет на указанное количество процентов (0-1)
 */
export const lightenColor = (color: string, amount: number): string => {
	if (!color.startsWith('#')) return color

	const [h, s, l] = hexToHsl(color)
	const newLightness = Math.min(100, l + amount * 100)
	return hslToHex(h, s, newLightness)
}

/**
 * Затемняет цвет на указанное количество процентов (0-1)
 */
export const darkenColor = (color: string, amount: number): string => {
	if (!color.startsWith('#')) return color

	const [h, s, l] = hexToHsl(color)
	const newLightness = Math.max(0, l - amount * 100)
	return hslToHex(h, s, newLightness)
}

/**
 * Альтернативная реализация через RGB (проще, но менее точная)
 */
export const lightenColorRgb = (color: string, amount: number): string => {
	if (!color.startsWith('#')) return color

	const num = parseInt(color.slice(1), 16)
	const r = Math.min(255, (num >> 16) + 255 * amount)
	const g = Math.min(255, ((num >> 8) & 0x00ff) + 255 * amount)
	const b = Math.min(255, (num & 0x0000ff) + 255 * amount)

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export const darkenColorRgb = (color: string, amount: number): string => {
	if (!color.startsWith('#')) return color

	const num = parseInt(color.slice(1), 16)
	const r = Math.max(0, (num >> 16) - 255 * amount)
	const g = Math.max(0, ((num >> 8) & 0x00ff) - 255 * amount)
	const b = Math.max(0, (num & 0x0000ff) - 255 * amount)

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
