/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import styles from './styles.module.scss'
import items from '../items'

interface ItemProps {
	name: string
}

const getRarityStyle = (rarity: string) => {
	const styles = {
		common: {
			textShadow: '0 0 4px #A0A0A0, 0 0 8px #D3D3D3',
			color: '#E0E0E0',
		},
		uncommon: {
			textShadow: '0 0 4px #7CFC00, 0 0 8px #ADFF2F',
			color: '#9ACD32',
			animation: 'glow-green 2s ease-in-out infinite alternate',
		},
		rare: {
			textShadow: '0 0 4px #1E90FF, 0 0 8px #00BFFF',
			color: '#4682B4',
			animation: 'glow-blue 2s ease-in-out infinite alternate',
		},
		epic: {
			textShadow: '0 0 4px #9370DB, 0 0 8px #BA55D3',
			color: '#8A2BE2',
			animation: 'glow-purple 1.5s ease-in-out infinite alternate',
		},
		legendary: {
			textShadow: '0 0 4px #FFD700, 0 0 8px #FFA500, 0 0 12px #FF8C00',
			color: '#FFD700',
			animation: 'glow-gold 1.2s ease-in-out infinite alternate',
		},
		mythic: {
			textShadow: '0 0 4px #FF1493, 0 0 8px #FF69B4, 0 0 12px #DB7093',
			color: '#FF00FF',
			animation: 'glow-pink 1s ease-in-out infinite alternate',
		},
		exotic: {
			textShadow: '0 0 4px #00FA9A, 0 0 8px #3CB371, 0 0 12px #2E8B57',
			color: '#7FFFD4',
			animation: 'glow-aqua 0.8s ease-in-out infinite alternate',
		},
		ultimate: {
			textShadow:
				'0 0 4px #FF4500, 0 0 8px #FF6347, 0 0 12px #FF7F50, 0 0 16px #FFA07A',
			color: '#FF8C00',
			animation: 'pulse-orange 0.7s ease-in-out infinite alternate',
		},
		impossible: {
			textShadow:
				'0 0 4px #9400D3, 0 0 8px #9932CC, 0 0 12px #8A2BE2, 0 0 16px #9370DB',
			color: '#DA70D6',
			animation: 'pulse-violet 0.6s ease-in-out infinite alternate',
		},
		sueta: {
			textShadow: '0 0 4px #000000, 0 0 8px #333333, 0 0 12px #666666',
			color: '#222222',
			animation: 'pulse-dark 0.5s ease-in-out infinite alternate',
		},
	}

	return (
		styles[rarity] || {
			textShadow: '0 0 4px #FFFFFF, 0 0 8px #F8F8FF',
			color: '#FFFFFF',
		}
	)
}

const Item: React.FC<ItemProps> = props => {
	const item = items[props.name] ?? {}
	const rarityStyle = getRarityStyle(item.rarity)

	return (
		<div className={styles.item}>
			<div className={styles.item}>
				<div
					style={{ backgroundImage: `url(${item.image})` }}
					className={styles.img}
				/>
				<span className={styles.price} style={rarityStyle}>
					{item.price}
				</span>
			</div>
		</div>
	)
}

export default Item
