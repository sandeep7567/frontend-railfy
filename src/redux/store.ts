import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import taskSlice from './slice/taskSlice';
import historySlice from './slice/historySlice';

export const store = configureStore({
  reducer: {
    // Slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    task: taskSlice,
    history: historySlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.getTask.initiate({}, { forceRefetch: true }));
};

initializeApp();