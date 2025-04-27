/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { COLORS } from '@/styles/colors'
import styled from 'styled-components'
import { statusColors, statusConfig } from '@/assets/constants/statusConfig'
import { motion } from 'framer-motion'
type StatusProps = {
	status: keyof typeof statusConfig
}

export const StatusBadge = styled.div<StatusProps>`
	position: absolute;
	bottom: -5px;
	left: 47%;
	transform: translateX(-50%);
	min-width: 55px;
	height: 20px;
	padding: 0 8px;
	border-radius: 10px;
	background-color: ${props =>
		statusConfig[props.status]?.color || 'transparent'};
	border: 1px solid
		${props => (props.status === 1 ? statusConfig[props.status].color : '#fff')};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => statusConfig[props.status]?.textColor || '#fff'};
	font-size: ${props => ([1, 10].includes(props.status) ? '9px' : '10px')};
	font-weight: bold;
	text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
	white-space: nowrap;
	z-index: 2;
	opacity: ${props => (props.status === 1 ? 0.8 : 1)};

	${props =>
		statusConfig[props.status]?.glow &&
		`
    box-shadow: 0 0 5px ${statusConfig[props.status].glowColor};
    animation: glow-pulse 2s infinite alternate;
  `}

	@keyframes glow-pulse {
		from {
			box-shadow: 0 0 3px ${props => statusConfig[props.status]?.glowColor};
		}
		to {
			box-shadow: 0 0 10px ${props => statusConfig[props.status]?.glowColor},
				0 0 20px ${props => statusConfig[props.status]?.glowColor}80;
		}
	}
`

export const UserAvatarContainer = styled.div<StatusProps>`
	position: relative;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 5px;
	box-shadow: 1px 0px 30px #526efb7b;
	border: 3px solid ${props => statusConfig[props.status]?.color || COLORS.blue};
	transition: all 0.3s ease;

	${props =>
		statusConfig[props.status]?.glow &&
		`
    animation: avatar-glow 2s infinite alternate;
    box-shadow: 
      0 0 10px ${statusConfig[props.status].glowColor},
      1px 0px 30px #526efb7b;
  `}

	@keyframes avatar-glow {
		from {
			box-shadow: 0 0 5px ${props => statusConfig[props.status]?.glowColor},
				1px 0px 20px #526efb7b;
			border-color: ${props => statusConfig[props.status]?.color};
		}
		to {
			box-shadow: 0 0 15px ${props => statusConfig[props.status]?.glowColor},
				1px 0px 40px #526efb7b;
			border-color: ${props => statusConfig[props.status]?.glowColor};
		}
	}
`
export const HeaderStyled = styled.div`
	padding: 10px 18px 10px 18px;
	height: 90px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	z-index: 2px;
`
export const UserBlockStyled = styled.div`
	display: flex;
	align-items: end;
	gap: 15px;
	width: 100%;
`

export const UserAvatarStyled = styled.img`
	width: 100%;
	height: 100%;
`
export const UserNicknameStyled = styled.div`
	p {
		color: ${COLORS.grey};
		font-size: 14x;
	}
	h3 {
		font-size: 20x;
		color: #fff;
	}

	margin: 0;

	padding-bottom: 8px;
`

export const UserAvatarWrap = styled.div`
	position: relative;
`

export const AvatarBacklight = styled.div`
	position: relative;
	width: 69px;
	height: 67px;
	display: flex;
	align-items: center;
	justify-content: center;
	// background: url('./avatar-background.png');
	// background-size: contain;
`

export const Backlight = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	right: 3px;
`

export const OutButton = styled(motion.button)`
	margin-left: 10px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 5px;
	box-shadow: inner 1px 0px 30px #91a2f854;
	border: 2px solid #1e3451;
	flex-shrink: 0;
	background: rgba(18, 32, 49, 0.704);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: relative;
	z-index: 5;
	img {
		width: 35px;
		height: 35px;
	}
`
/* Ellipse 19 */
