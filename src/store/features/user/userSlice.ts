import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    user: {},
    error: ''
};

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return axios
        .get('http://localhost:3030/api/test')
        .then(response => {
            return response.data.user;
        });
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action: any) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = {};
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, state => {
            state.loading = true
        });
        builder.addCase(fetchUser.fulfilled, (state, action: { payload: any }) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUser.rejected, (state, action: any) => {
            state.loading = false;
            state.user = {};
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;