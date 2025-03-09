import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	id: string | null
	username: string | null
	firstName: string | null
	lastName: string | null
	photoUrl: string | null
	balance: number | null
	tokens: number | null
	referralCode: string | null
	walletAddress: string | null
	createdAt: string | null
	updatedAt: string | null
	referrals: Array<number> | null
}

const initialState: UserState = {
	id: null,
	username: null,
	firstName: null,
	lastName: null,
	photoUrl: null,
	balance: null,
	tokens: null,
	referralCode: null,
	walletAddress: null,
	createdAt: null,
	updatedAt: null,
	referrals: null,
}

const saveStateToLocalStorage = (state: UserState) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('userState', serializedState)
	} catch (error) {
		console.error('Ошибка при сохранении состояния в localStorage:', error)
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<Partial<UserState>>) {
			const newState = { ...state, ...action.payload }
			saveStateToLocalStorage(newState)
			return newState
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
