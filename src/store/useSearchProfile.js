import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useSearchPost = create((set,get)=>({
    isSearching:false,
    searchedUser:null,

    getSearchResult :async (data)=>{
        set({isSearching:true})
        try {
            console.log(data)
            const response = await axiosInstance.get(`/getSearchedUser?query=${data}`);
            console.log(response.data.data)
            set({searchedUser:response.data.data})
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }finally{
            set({isSearching:false})
        }
    }
}))