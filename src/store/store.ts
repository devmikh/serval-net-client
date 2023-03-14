import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer
        }
    });
};

const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export default store;