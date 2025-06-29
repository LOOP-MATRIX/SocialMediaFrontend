import { configureStore } from "@reduxjs/toolkit";
import Authslice from './slices/Auth'
import FollowSlice from './slices/Follow'

const store = configureStore({
    reducer:{
        auth:Authslice,
        follow:FollowSlice
    }
})

export default store