import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: null,
    error: ''
};

export const fetchUserById = createAsyncThunk('user/fetchUserById', (id: string) => {
    return axios
        .get(`http://localhost:3030/api/users/${id}`)
        .then(response => {
            return response.data.user;
        });
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action: any) {
            state.data = action.payload;
        },
        clearUser(state) {
            state.data = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserById.pending, state => {
            state.loading = true
        });
        builder.addCase(fetchUserById.fulfilled, (state, action: { payload: any }) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUserById.rejected, (state, action: any) => {
            state.loading = false;
            state.data = null;
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;