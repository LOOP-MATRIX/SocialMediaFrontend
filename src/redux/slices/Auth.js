import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk('auth/signup', async ( {formData ,page}, { rejectWithValue }) => {
    try {
        console.log(page)
        const response = await axios.post(`http://localhost:5001/api/${page}`, formData)
        console.log(response?.data  )
        return response?.data.message
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const Auth = createSlice({
    name: 'auth',
    initialState: {
        msg: '',
        status: 'idle',
        page:'signup'
    },
    reducers: {
        changepage:(state)=>{
            state.page=='signup'?state.page='login':state.page='signup'
            state.msg=''
            state.status='idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.msg = action.payload;
                state.status = 'succeeded';
            })
            .addCase(signup.rejected, (state, action) => {
                state.msg = action.payload;
                state.status = 'rejected';
            });

    }
})

export const {changepage}=Auth.actions

export default Auth.reducer