// pages/game/miner.tsx
import dynamic from 'next/dynamic'
import React from 'react'

const BifsMinerGame = dynamic(
	() => import('@/games/BifsMinerGame/BifsMinerGame'),
	{
		ssr: false,
	}
)

const MinerGamePage = () => {
	return <BifsMinerGame />
}

export default MinerGamePage
