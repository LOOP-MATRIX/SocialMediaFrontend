import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePostStore = create((set, get) => ({
    posts: [],
    popularPosts: [],
    singlePostDetails: null,
    isPostLoading: false,

    getFollowingPost: async () => {
        set({ isPostLoading: true })
        try {
            const res = await axiosInstance.get('/getFollowingPost')
            set({ posts: res.data.data })
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ post: [] })
        } finally {
            set({ isPostLoading: false })
        }
    },

    getPopularPosts: async () => {
        set({ isPostLoading: true })
        try {
            const res = await axiosInstance.get('/getPopularPost')
            set({ popularPosts: res.data.data })
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ popularPosts: [] })
        } finally {
            set({ isPostLoading: false })
        }
    },

    getSinglePost: async (id) => {
        set({ isPostLoading: true })
        try {
            const res = await axiosInstance.get(`/getSinglePost/${id}`)
            set({ singlePostDetails: res.data.data })
            console.log(get().singlePostDetails)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        } finally {
            set({ isPostLoading: false })
        }
    },

    toggleLike: (postId, userId) => {
        console.log('home post toggle')
        set((state) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === postId) {
                    const hasLiked = post.likes.some(
                        (like) => like.user._id === userId
                    );

                    if (hasLiked) {
                        // Unlike
                        return {
                            ...post,
                            isLiked: false,
                            likes: post.likes.filter((like) => like.user._id !== userId),
                        };
                    } else {
                        // Like
                        return {
                            ...post,
                            isLiked: true,
                            likes: [
                                ...post.likes,
                                {
                                    _id: crypto.randomUUID(), // optional temp ID
                                    user: { _id: userId },
                                    likedAt: new Date().toISOString(),
                                    whichPost: postId,
                                },
                            ],
                        };
                    }
                }
                return post;
            });

            return { posts: updatedPosts };
        });
    },

    toggleSingleLike: (userId) => {
        console.log(userId._id)
        set((state) => {
            const post = state.singlePostDetails;
            if (!post) return {};
            const hasLiked = post.likes.some(
                (like) => like.user._id === userId._id
            );

            let updatedPost;
            if (hasLiked) {
                // Unlike
                updatedPost = {
                    ...post,
                    isLiked: false,
                    likes: post.likes.filter((like) => like.user._id !== userId._id),
                };
            } else {
                // Like
                updatedPost = {
                    ...post,
                    isLiked: true,
                    likes: [
                        ...post.likes,
                        {
                            _id: crypto.randomUUID(), // optional temp ID
                            user: { 
                                _id : userId._id,
                                username:userId.username,
                                name:userId.name,
                                pic:userId.pic
                            },
                            likedAt: new Date().toISOString(),
                            whichPost: post._id,
                        },
                    ],
                };
            }
            return { singlePostDetails: updatedPost };
        });
    },

    addLike: async (id, user, whichPost) => {
        try {
            const res = await axiosInstance.get(`/addLike/${id}`)
            whichPost ? (
                get().toggleLike(id, user)
            ) : (
                get().toggleSingleLike( user)
            )
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        }
    },

    removeLike: async (id, user, whichPost) => {
        console.log(user)
        try {
            const res = await axiosInstance.delete(`/removeLike/${id}`)
            whichPost ? (

                get().toggleLike(id, user)
            ) : (
                get().toggleSingleLike( user)
            )
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        }
    },
}))