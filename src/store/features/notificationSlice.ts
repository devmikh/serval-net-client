import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Notification {
    id?: number,
    message: string,
    type: string
}

interface NotificationState {
    notifications: Notification[]
}

const initialState: NotificationState = {
    notifications: []
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push({
                id: state.notifications.length,
                message: action.payload.message,
                type: action.payload.type
            });
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
        }
    },
    
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;