/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'

const Bullet = ({ position }) => {
	return (
		<div
			className='bullet'
			style={{
				position: 'absolute',
				left: position.x,
				top: position.y,
				width: '5px',
				height: '15px',
				backgroundColor: 'yellow',
				borderRadius: '2px',
			}}
		/>
	)
}

export default Bullet
