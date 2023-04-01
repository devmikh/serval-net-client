import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: {
        id: null,
        email: null,
        created_at: null,
        username: null,
        full_name: null,
        posts_count: 0
    },
    error: ''
};

export const fetchUserById = createAsyncThunk('user/fetchUserById', (id: string) => {
    return axios
        .get(`${process.env.SERVER_URL}/api/users/${id}`)
        .then(response => {
            return response.data.user;
        });
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        increasePostsCount: state => {
            state.data.posts_count += 1
        },
        decreasePostsCount: state => {
            state.data.posts_count -= 1
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
            state.data = initialState.data;
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;
