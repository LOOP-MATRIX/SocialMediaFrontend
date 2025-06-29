import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const url = import.meta.env.URL;

const followapi = createAsyncThunk('follow/followapi', async ({ name, id }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}/${name}/${id}`)
        return response?.data.message
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const getfollow = createAsyncThunk('follow/getfollow',async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${url}/getfollow`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const Follow = createSlice({
    name: 'follow',
    initialState: {
        msg: '',
        status: 'idle',
        follower: [],
        following: [],
        posts:[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(followapi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(followapi.fulfilled, (state, action) => {
                state.msg = action.payload;
                state.status = 'succeeded';
            })
            .addCase(followapi.rejected, (state, action) => {
                state.msg = action.payload;
                state.status = 'rejected';
            })
            .addCase(getfollow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getfollow.fulfilled, (state, action) => {
                state.msg = action.payload;
                state.follower = action.payload.follower
                state.following = action.payload.following
                state.posts = action.payload.p
                state.status = 'succeeded';
            })
            .addCase(getfollow.rejected, (state, action) => {
                state.msg = action.payload;
                state.status = 'rejected';
            });
    }
})

export default Follow.reducer