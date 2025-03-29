import React, { FunctionComponent, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { handleAutomining, handleBuyTokens } from '@/utils/sendBotMessage'
import { products } from './exchange.content'
import { Toaster, toast } from 'react-hot-toast'
import { COLORS } from '@/styles/colors'
import { goldenShine } from '@/styles/effects'
import {
	goldenTextGradient,
	blueTextGradient,
	mainBlockBackground,
	purpleBackground,
	blueGradientBackground,
} from '@/styles/mixins'

export const ExchangeContainer = styled(motion.div)`
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
	max-height: calc(100vh - 170px);
	overflow-y: auto;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`

export const OverviewSection = styled(motion.section)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 24px;
	border-radius: 20px;
	background: rgba(18, 18, 30, 0.8);
	backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.08);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	${mainBlockBackground};
`

export const BalanceColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`

export const MiningColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`

export const BalanceInfo = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 12px;
`

export const BalanceTitle = styled.h2`
	font-size: 18px;
	font-weight: 500;
	color: ${COLORS.ice};
	margin: 0;
`

export const BalanceAmount = styled.h3`
	font-size: 42px;
	font-weight: 700;
	margin: 0;
	${blueTextGradient};
	line-height: 1;
`

export const MiningStatus = styled.h3`
	font-size: 18px;
	font-weight: 500;
	color: ${COLORS.ice};
	margin: 0;
	text-align: center;
`

export const MiningTimer = styled(motion.div)`
	font-size: 16px;
	font-weight: 500;
	padding: 12px 16px;
	border-radius: 12px;
	background: rgba(0, 191, 255, 0.1);
	border: 1px solid rgba(0, 191, 255, 0.2);
	color: ${COLORS.ice};
	text-align: center;
`

export const MiningAnimation = styled(motion.div)`
	width: 140px;
	height: 140px;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 0 12px rgba(0, 191, 255, 0.4));
	}
`

export const DollarEquivalent = styled.span`
	font-size: 14px;
	color: ${COLORS.ice};
	opacity: 0.8;
`

export const StarsSection = styled(motion.section)`
	padding: 24px;
	border-radius: 20px;
	background: rgba(18, 18, 30, 0.8);
	backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.08);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	${mainBlockBackground};
`

export const StarsHeader = styled(motion.h2)`
	font-size: 22px;
	font-weight: 600;
	color: ${COLORS.ice};
	margin: 0 0 24px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
`

export const StarsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 16px;
`

export const StarProductCard = styled(motion.div)`
	padding: 20px;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	${mainBlockBackground};
	border: 1px solid rgba(255, 255, 255, 0.05);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
		border-color: rgba(0, 191, 255, 0.3);
	}
`

export const StarProductInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`

export const StarCount = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;

	.count {
		font-size: 28px;
		font-weight: 700;
		${goldenTextGradient};
		line-height: 1;
	}

	.label {
		font-size: 14px;
		color: ${COLORS.ice};
		text-transform: uppercase;
		letter-spacing: 1px;
	}
`

export const TokenCount = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;

	.count {
		font-size: 28px;
		font-weight: 700;
		${blueTextGradient};
		line-height: 1;
	}
`

export const StarProductButton = styled(motion.button)`
	padding: 14px 24px;
	border-radius: 12px;
	font-size: 16px;
	font-weight: 600;
	border: none;
	cursor: pointer;
	width: 100%;
	background: linear-gradient(90deg, #00bfff, #0080ff);
	color: white;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
	${blueGradientBackground};
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0, 191, 255, 0.3);
	}

	&:active {
		transform: translateY(0);
	}

	&::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			to bottom right,
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0)
		);
		transform: rotate(30deg);
		transition: all 0.5s ease;
	}

	&:hover::after {
		left: 100%;
	}
`
