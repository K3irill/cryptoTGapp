/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { ShipStyled } from '../styled'

const Ship = ({ onMove, position, ref }) => {
	const [tiltClass, setTiltClass] = useState('')

	useEffect(() => {
		const handleKeyDown = e => {
			if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight' ||
				e.key === 'ArrowUp' ||
				e.key === 'ArrowDown'
			) {
				onMove(e.key)

				// Устанавливаем класс для наклона
				if (e.key === 'ArrowLeft') {
					setTiltClass('tilt-left')
				} else if (e.key === 'ArrowRight') {
					setTiltClass('tilt-right')
				} else if (e.key === 'ArrowUp') {
					setTiltClass('tilt-up')
				} else if (e.key === 'ArrowDown') {
					setTiltClass('tilt-down')
				}
			}
		}

		const handleKeyUp = () => {
			setTiltClass('')
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [onMove])

	return (
		<ShipStyled
			ref={ref}
			className={tiltClass}
			style={{ left: position.x, top: position.y }}
		/>
	)
}

export default Ship
