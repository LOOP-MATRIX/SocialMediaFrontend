import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useFollowStore = create((set, get) => ({
    isStatusfollow: false,

    followCall: async (relation, id) => {

        if (!relation || !id) return toast.error('relation or id not provided')
        const followStore = get()


        switch (relation) {
            case "Mutual":
            case "Following":
                await followStore.unfollow(id, relation);
                break;
            case "Follows Back":
            case "Follow":
                await followStore.followSomeone(id, relation);
                break;
            case "Requested":
                await followStore.withdraw(id, relation);
                break;
            default:
                toast.error("Unknown relationship status");
        }
    },

    changeRelationship: (af, hr, ifm, hm) => {
        const currentProfile = useAuthStore.getState().othersprofile;
        useAuthStore.setState({
            othersprofile: {
                ...currentProfile,
                relationship: {
                    amIFollowing: af,
                    haveIRequested: hr,
                    isFollowingMe: ifm,
                    hasRequestedMe: hm,
                }
            }
        });
    },

    toggleRequest: (id) => {
        const profile = useAuthStore.getState().myprofile;

        useAuthStore.setState({
            myprofile: {
                ...profile,
                requests: profile.requests.filter((f) => f.user._id !== id)
            }
        });
    },

    toggleFollowSomeOne: () => {
        const profile = useAuthStore.getState().othersprofile;
        const user = useAuthStore.getState().authUser;

        useAuthStore.setState({
            othersprofile: {
                ...profile,
                follower:[
                    ...profile.follower,
                    {
                        _id:crypto.randomUUID(),
                        user:{
                            _id:user._id,
                            username:user.username,
                            name:user.name,
                            pic:user.pic
                        }
                    }
                ]
            }
        });
    },

    toggleUnfollow: () => {
        const profile = useAuthStore.getState().othersprofile;
        const user = useAuthStore.getState().authUser;

        useAuthStore.setState({
            othersprofile: {
                ...profile,
                follower:profile.follower.filter((f) => f.user._id.toString() !== user._id.toString())
            }
        });
    },

    toggleRemoveFollow: (id) => {
        const profile = useAuthStore.getState().myprofile;

        useAuthStore.setState({
            myprofile: {
                ...profile,
                follower:profile.follower.filter((f) => f.user._id.toString() !== id.toString())
            }
        });
    },



    followSomeone: async (id, relation) => {
        set({ isStatusfollow: true })
        try {
            const res = await axiosInstance.get(`/following/${id}`)

            if (res.data.success == true) {
                if (res.data.isPrivate) {
                    if (relation == 'Follows Back') {
                        get().changeRelationship(false, true, true, false);
                    } else if (relation == 'Follow') {
                        get().changeRelationship(false, true, false, false);
                    }
                } else {
                    
                    if (relation == 'Follows Back') {
                        get().toggleFollowSomeOne()
                        get().changeRelationship(true, false, true, false);
                    } else if (relation == 'Follow') {
                        get().toggleFollowSomeOne()
                        get().changeRelationship(true, false, false, false);
                    }
                }
                toast.success(res.data?.message)
            }
        } catch (error) {
            console.log("Error in followSomeone:", error);
            toast.error(error.response.data?.message)
        } finally {
            set({ isStatusfollow: false })
        }
    },

    acceptReq: async (id) => {
        set({ isStatusfollow: true })
        try {
            const res = await axiosInstance.get(`/acceptReq/${id}`)

            res.data.success == true && (
                useAuthStore.getState().getProfile(),
                toast.success(res.data?.message)
            )
        } catch (error) {
            console.log("Error in acceptReq:", error);
            toast.error(error.response.data?.message)
        } finally {
            set({ isStatusfollow: false })
        }
    },

    declineRequest: async (id) => {
        set({ isStatusfollow: true })
        try {
            const res = await axiosInstance.get(`/declineRequest/${id}`)

            res.data.success == true && (
                useAuthStore.getState().getProfile(),
                toast.success(res.data?.message)
            )
        } catch (error) {
            console.log("Error in declineRequest:", error);
            toast.error(error.response.data?.message)
        } finally {
            set({ isStatusfollow: false })
        }
    },

    removeFollower: async (id) => {
        set({ isStatusfollow: true })
        try {
            const res = await axiosInstance.get(`/removeFollower/${id}`)

            res.data.success == true && (
                get().toggleRemoveFollow(id),
                toast.success(res.data?.message)
            )
        } catch (error) {
            console.log("Error in removeFollower:", error);
            toast.error(error.response.data?.message)
        } finally {
            set({ isStatusfollow: false })
        }
    },

    unfollow: async (id, relation) => {
        set({ isStatusfollow: true })
        try {
            const res = await axiosInstance.get(`/unfollow/${id}`)

            if (res.data.success == true) {
                get().toggleUnfollow()
                if (relation == 'Following') {
                    get().changeRelationship(false, false, false, false);
                } else if (relation == 'Mutual') {
                    get().changeRelationship(false, false, true, false);
                }


                toast.success(res.data?.message)
            }
        } catch (error) {
            console.log("Error in unfollow:", error);
            toast.error(error.response.data?.message)
        } finally {
            set({ isStatusfollow: false })
        }
    },

    withdraw: async (id, relation) => {
        set({ isStatusfollow: true })
        try {
            const res = await axiosInstance.get(`/withdraw/${id}`)

            if (res.data.success == true) {
                if (relation == 'Requested') {
                    get().changeRelationship(false, false, false, false);
                }


                toast.success(res.data?.message)
            }
        } catch (error) {
            console.log("Error in unfollow:", error);
            toast.error(error.response.data?.message)
        } finally {
            set({ isStatusfollow: false })
        }
    },
}))