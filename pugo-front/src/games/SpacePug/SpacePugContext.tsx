import React, { createContext } from 'react'

export interface GameSpacePugContextValue {
	shipWidth: number
	setShipWidth: React.Dispatch<React.SetStateAction<number>>
	shipHeight: number
	setShipHeight: React.Dispatch<React.SetStateAction<number>>
}

export const SpacePugGameContext =
	createContext<GameSpacePugContextValue | null>(null)
