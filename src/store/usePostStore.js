import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePostStore = create((set,get)=>({
    posts:[],
    popularPosts:[],
    isPostLoading:false,

    getFollowingPost: async ()=>{
        set({isPostLoading:true})
        try {
            const res = await axiosInstance.get('/getFollowingPost')
            set({posts:res.data.data})
            console.log(get().posts)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({post:{}})
        }finally{
            set({isPostLoading:false})
        }
    },

    getPopularPosts: async ()=>{
        set({isPostLoading:true})
        try {
            const res = await axiosInstance.get('/getPopularPost')
            set({popularPosts:res.data.data})
            console.log(get().popularPosts)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({post:{}})
        }finally{
            set({isPostLoading:false})
        }
    }
}))