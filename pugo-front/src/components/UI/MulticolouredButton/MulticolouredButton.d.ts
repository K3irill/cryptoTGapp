import React from 'react'

export interface MulticolouredButtonProps {
	title?: string
	theme?: string
	iconSrc?: string
	onClick?: () => void
	children?: React.Node | Element | string
	onTouchStart?: () => void
	onTouchEnd?: () => void
	onMouseUp?: () => void
	onMouseDown?: () => void
}

export interface MulticolouredButtonStyledProps {
	theme?: string
}
