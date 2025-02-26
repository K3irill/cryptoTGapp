import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	id: number | null
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
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<Partial<UserState>>) {
			console.log(action.payload)
			return { ...state, ...action.payload }
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
