import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { taskApi } from './services/api/tasksApi'
import { userInfoApi } from './services/api/userApi'

export const store = configureStore({
	reducer: {
		user: userReducer,
		[taskApi.reducerPath]: taskApi.reducer,
		[userInfoApi.reducerPath]: userInfoApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(taskApi.middleware)
			.concat(userInfoApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
