import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: null,
    error: ''
};

export const fetchPostsByUserId = createAsyncThunk('posts/fetchPostsByUserId', (userId: string) => {
    return axios
        .get(`http://localhost:3030/api/users/${userId}/posts`)
        .then(response => {
            return response.data.posts;
        });
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(fetchPostsByUserId.pending, state => {
            state.loading = true
        });
        builder.addCase(fetchPostsByUserId.fulfilled, (state, action: { payload: any }) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        });
        builder.addCase(fetchPostsByUserId.rejected, (state, action: any) => {
            state.loading = false;
            state.data = null;
            state.error = action.error.message;
        });
    },
});

export default postsSlice.reducer;