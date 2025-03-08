import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { taskApi } from './services/api/tasksApi'

export const store = configureStore({
	reducer: {
		user: userReducer,
		[taskApi.reducerPath]: taskApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(taskApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
