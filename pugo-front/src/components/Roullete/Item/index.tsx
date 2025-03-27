/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import styles from './styles.module.scss'
import items from '../items'

interface ItemProps {
	name: string
}

const getRarityStyle = (rarity: string) => {
	switch (rarity) {
		case 'common':
			return { textShadow: '0 0 5px #b0b0b0' }
		case 'uncommon':
			return { textShadow: '0 0 5px #2ecc71' }
		case 'rare':
			return { textShadow: '0 0 5px #3498db' }
		case 'epic':
			return { textShadow: '0 0 5px #9b59b6' }
		case 'legendary':
			return { textShadow: '0 0 5px #f1c40f, 0 0 10px #f1c40f' }
		case 'mythic':
			return { textShadow: '0 0 5px #e74c3c, 0 0 10px #e74c3c' }
		case 'exotic':
			return {
				textShadow: '0 0 5px #1abc9c, 0 0 10px #1abc9c, 0 0 15px #1abc9c',
			}
		case 'ultimate':
			return {
				textShadow:
					'0 0 5px #e67e22, 0 0 10px #e67e22, 0 0 15px #e67e22, 0 0 20px #e67e22',
				animation: 'pulse 1.5s infinite alternate',
			}
		default:
			return { textShadow: '0 0 5px #ffffff' }
	}
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
