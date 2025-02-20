import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	id: number | null
	username: string | null
	firstName: string | null
	lastName: string | null
	photoUrl: string | null
}

const initialState: UserState = {
	id: null,
	username: null,
	firstName: null,
	lastName: null,
	photoUrl: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<Partial<UserState>>) {
			return { ...state, ...action.payload }
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
