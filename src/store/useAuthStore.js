import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://pulselink-backend.onrender.com";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    myprofile: null,
    othersprofile: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isLoadingProfile: false,
    isCheckingAuth: false,
    isSetting: false,
    isEdit: false,
    isFollowTab: false,
    isRequestTab: false,
    isLikeTab: false,
    isCommentTab: false,
    onlineUsers: [],
    socket: null,
    inputcss: 'border border-gray-500 hover:border-gray-200 w-full py-2 text-center rounded-md',

    changeSetting: () => set((state) => ({ isSetting: !state.isSetting })),
    changeEdit: () => set((state) => ({ isEdit: !state.isEdit })),
    changeFollowTab: () => set((state) => ({ isFollowTab: !state.isFollowTab })),
    changeLikedTab: () => set((state) => ({ isLikeTab: !state.isLikeTab })),
    changeCommentTab: () => set((state) => ({ isCommentTab: !state.isCommentTab })),
    changeRequestTab: () => set((state) => ({ isRequestTab: !state.isRequestTab })),

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/checkAuth");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/login", data);
            console.log(res.data)
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get("/logout");
            set({ authUser: null });
            set({ isSetting: false })
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    getProfile: async () => {
        set({ isLoadingProfile: true })
        try {
            const res = await axiosInstance.get('/getprofile')
            set({ myprofile: res.data.data })
        } catch (error) {
            set({ myprofile: null })
            console.log("error in getting profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoadingProfile: false })
        }
    },

    getOthersProfile: async (id) => {
        if (!id) return;
        set({ isLoadingProfile: true });
        try {
            const res = await axiosInstance.get(`/getOthersProfile/${id}`);
            set({ othersprofile: res.data.data });
        } catch (error) {
            set({ othersprofile: null });
            console.log("error in getting profile:", error);
            toast.error(error.response?.data?.message || "Failed to load profile");
        } finally {
            set({ isLoadingProfile: false });
        }
    },


    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/updateprofile", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error("Update failed:", err.response?.data?.message);
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    setAccountPrivacy: async (isPrivate) => {
        try {
            if (typeof isPrivate !== "boolean") {
                toast.error("Privacy value must be true or false")
                return
            }

            const res = await axiosInstance.put("/setPrivacy", { isPrivate })

            if (res.data.success) {
                set((state) => ({
                    myprofile: {
                        ...state.myprofile,
                        isPrivate,
                    },
                }));
                toast.success(res.data.message)
            }
        } catch (err) {
            console.error("Error setting privacy:", err)
            toast.error(
                err?.response?.data?.message || "Failed to update privacy settings"
            )
        }
    },

}));
