import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './postsSlice';

export const store = configureStore({
    reducer: {
        postsArray: postsReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;