import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import currentUserReducer from './features/currentUserSlice';
import postsReducer from './features/postsSlice';
import notificationReducer from './features/notificationSlice';


export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            currentUser: currentUserReducer,
            posts: postsReducer,
            notification: notificationReducer
        }
    });
};

const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;

export const getState = store.getState;

export default store;
