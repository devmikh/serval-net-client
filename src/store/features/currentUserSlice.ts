import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initialState,
    reducers: {
        setCurrentUser(state, action: any) {
            state.data = action.payload;
        },
        clearCurrentUser(state) {
            state.data = null;
        }
    },
    
});

export default currentUserSlice.reducer;
