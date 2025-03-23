/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import { ContorlsTopBottom, ControlsWrapper } from '../styled'
import MulticolouredButton from '@/components/UI/MulticolouredButton/MulticolouredButton'

const Controls = ({ onMove, onSpeedUp, onSpeedDown }) => {
	return (
		<ControlsWrapper className='controls'>
			<button
				onTouchStart={() => onSpeedUp('ArrowLeft')}
				onTouchEnd={() => onSpeedDown('ArrowLeft')}
				onMouseDown={() => onSpeedUp('ArrowLeft')} // Для компьютеров
				onMouseUp={() => onSpeedDown('ArrowLeft')} // Для компьютеров
				onClick={() => onMove('ArrowLeft')} // Добавляем onClick
			>
				<img
					style={{ width: '25px', height: '25px', transform: 'rotate(270deg)' }}
					src='/icons/arrow-control.svg'
					alt='Left'
				/>
			</button>
			<ContorlsTopBottom>
				<button
					onTouchStart={() => onSpeedUp('ArrowUp')}
					onTouchEnd={() => onSpeedDown('ArrowUp')}
					onMouseDown={() => onSpeedUp('ArrowUp')} // Для компьютеров
					onMouseUp={() => onSpeedDown('ArrowUp')} // Для компьютеров
					onClick={() => onMove('ArrowUp')} // Добавляем onClick
				>
					<img
						style={{ width: '25px', height: '25px' }}
						src='/icons/arrow-control.svg'
						alt='Up'
					/>
				</button>
				<button
					onTouchStart={() => onSpeedUp('ArrowDown')}
					onTouchEnd={() => onSpeedDown('ArrowDown')}
					onMouseDown={() => onSpeedUp('ArrowDown')} // Для компьютеров
					onMouseUp={() => onSpeedDown('ArrowDown')} // Для компьютеров
					onClick={() => onMove('ArrowDown')} // Добавляем onClick
				>
					<img
						style={{
							width: '25px',
							height: '25px',
							transform: 'rotate(180deg)',
						}}
						src='/icons/arrow-control.svg'
						alt='Down'
					/>
				</button>
			</ContorlsTopBottom>
			<button
				onTouchStart={() => onSpeedUp('ArrowRight')}
				onTouchEnd={() => onSpeedDown('ArrowRight')}
				onMouseDown={() => onSpeedUp('ArrowRight')} // Для компьютеров
				onMouseUp={() => onSpeedDown('ArrowRight')} // Для компьютеров
				onClick={() => onMove('ArrowRight')} // Добавляем onClick
			>
				<img
					style={{ width: '25px', height: '25px', transform: 'rotate(90deg)' }}
					src='/icons/arrow-control.svg'
					alt='Right'
				/>
			</button>
		</ControlsWrapper>
	)
}

export default Controls
