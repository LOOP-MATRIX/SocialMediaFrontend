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
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        } finally {
            set({ isPostLoading: false })
        }
    },

    toggleLike: (postId, userId) => {
        console.log('home post toggle', userId)
        set((state) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === postId) {
                    const hasLiked = post.likes.some(
                        (like) => like.user._id === userId._id
                    );

                    if (hasLiked) {
                        // Unlike
                        return {
                            ...post,
                            isLiked: false,
                            likes: post.likes.filter((like) => like.user._id !== userId._id),
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
                                    user: { _id: userId._id },
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

    toggleSingleLike: (postId, userId) => {
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
                                _id: userId._id,
                                username: userId.username,
                                name: userId.name,
                                pic: userId.pic
                            },
                            likedAt: new Date().toISOString(),
                            whichPost: postId,
                        },
                    ],
                };
            }
            return { singlePostDetails: updatedPost };
        });
    },

    addCommentToSection: (postId, user, inputcomment,commentId) => {
        set((state) => {
            const post = state.singlePostDetails;
            if (!post) return {};

            let updatedcomments = {
                ...post,
                comments: [
                    ...post.comments,
                    {
                        _id: commentId,
                        user: {
                            _id: user._id,
                            username: user.username,
                            pic: user.pic,
                        },
                        comment: inputcomment,
                        commentAt: new Date().toISOString(),
                        whichPost: postId
                    }
                ]
            }

            return { singlePostDetails: updatedcomments }
        })
    },

    removeCommentToSection : (user,commentId) =>{
        set((state)=>{
            const post = state.singlePostDetails
            if(!post) return {}

            let updatedcomments = {
                ...post,
                comments:post.comments.filter(f=>f._id !== commentId)
            }   

            return {singlePostDetails: updatedcomments}
        })
    },

    addLike: async (id, user, whichPost) => {
        try {
            const res = await axiosInstance.get(`/addLike/${id}`)
            whichPost ? (
                get().toggleLike(id, user)
            ) : (
                get().toggleSingleLike(id, user)
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
                get().toggleSingleLike(id, user)
            )
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        }
    },

    addComment: async (id, user, comment) => {
        console.log(id, comment)
        try {
            const res = await axiosInstance.post(`/addComment/${id}`, { comment })

            get().addCommentToSection(id, user, comment,res.data.commentId)

            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        }
    },

    removeComment: async (id, user, commentId) => {
        try {
            const res = await axiosInstance.delete(`/removeComment/${commentId}`, {data:{id}})

            get().removeCommentToSection( user, commentId)

            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            set({ singlePostDetails: null })
        }
    },

    deletePost: async (postId) => {
        set({ isPostLoading: true })
        try {
            const res = await axiosInstance.delete(`/deletePost/${postId}`)

            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("Error in deletePost:", error)
            toast.error(error?.response?.data?.message || "Failed to delete post")
        } finally {
            set({ isPostLoading: false })
        }
    },
}))