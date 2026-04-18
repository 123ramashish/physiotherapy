import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './api/blogApi';
import { eventApi } from './api/eventApi';

export const store = configureStore({
    reducer: { 
        [blogApi.reducerPath]: blogApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer
    },
    middleware: (getDefault) => getDefault().concat(blogApi.middleware, eventApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;