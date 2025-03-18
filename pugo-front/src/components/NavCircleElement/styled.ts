import styled from 'styled-components'
import { COLORS } from '@/styles/colors'
interface NavElementStyledProps {
	width?: string
	height?: string
	background?: string
	disabled?: boolean
	position?: 'top' | 'bottom'
	isActive?: boolean
	isTopNav?: boolean
}

export const NavElement = styled.a<NavElementStyledProps>`
	width: ${p => p.width || '52px'};
	height: ${p => p.height || '52px'};
	background: rgba(222, 222, 222, 0.1);

	${p => p.background === 'transparent' && `background: transparent`};
	${props =>
		props.isActive &&
		!props.isTopNav &&
		`img {filter: invert(300%) brightness(200%) drop-shadow(0 0 10px white)};`}

	${props =>
		props.isActive && props.isTopNav && `border: 2px solid ${COLORS.blue};`}

	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: transform 0.3s ease;
	cursor: pointer;
	position: relative;

	${p =>
		p.position === 'top'
			? 'top: 8px;'
			: p.position === 'bottom'
			? 'bottom: 8px;'
			: ''}

	${p =>
		!p.disabled
			? `
   
    pointer-events: none;
    cursor: not-allowed;
    filter: brightness(0.2)`
			: `	&:active {
		transform: scale(0.7);
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			transform: scale(1.2);
		}
	}`}
`
