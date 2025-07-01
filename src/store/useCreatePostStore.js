import toast from "react-hot-toast";
import { create } from "zustand";
import {axiosInstance} from '../lib/axios'

export const useCreatePostStore = create((set, get) => ({
    isPosting: false,
    addPost:null,

    
    createPost: async (data) => {
        set({isPosting:true})
        try {
            const response = await axiosInstance.post('/createPost', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response)

            set({addPost:response.data.data}) // Update Zustand store with new post
            
            toast.success('Post created successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create post');
        } finally {
            set({isPosting:false})
        }
    }
}))