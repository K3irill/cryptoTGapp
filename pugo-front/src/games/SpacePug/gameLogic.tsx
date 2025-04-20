// hooks/gameReducer.ts
export interface GameState {
	score: number
	lives: number
}

export type GameAction =
	| { type: 'INCREASE_SCORE'; payload?: number }
	| { type: 'DECREASE_SCORE'; payload?: number }
	| { type: 'INCREASE_LIVES'; payload?: number }
	| { type: 'DECREASE_LIVES'; payload?: number }
	| { type: 'GAME_OVER' }
	| { type: 'RESET' }

export const initialGameState: GameState = {
	score: 0,
	lives: 10,
}

export function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case 'INCREASE_SCORE':
			return {
				...state,
				score: Math.round(state.score + (action.payload ?? 50)),
			}
		case 'DECREASE_SCORE':
			return {
				...state,
				score: Math.round(state.score - (action.payload ?? 100)),
			}
		case 'INCREASE_LIVES':
			return {
				...state,
				lives: Math.round(state.lives + (action.payload ?? 2)),
			}
		case 'DECREASE_LIVES':
			return {
				...state,
				lives: Math.round(state.lives - (action.payload ?? 1)),
			}
		case 'GAME_OVER':
			return {
				...state,
				lives: 0,
			}
		case 'RESET':
			return initialGameState
		default:
			return state
	}
}
