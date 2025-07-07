import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Settings, Pencil, Inbox, Loader } from 'lucide-react'
import { useFollowStore } from '../store/useFollowStore'
import { useNavigate } from 'react-router-dom'

const GetProfile = ({ profile }) => {
    const { changeSetting, changeFollowTab, changeEdit, authUser, changeRequestTab } = useAuthStore()
    const { followCall } = useFollowStore()
    const [status, setstatus] = useState('')
    const navigate = useNavigate()
    console.log(profile)

    function getFollowStatus(relationship) {
        const { amIFollowing, isFollowingMe, haveIRequested, hasRequestedMe } = relationship || {};

        if (amIFollowing && isFollowingMe) return "Mutual"
        if (amIFollowing) return "Following"
        if (isFollowingMe) return "Follows Back"
        if (haveIRequested) return "Requested"
        if (hasRequestedMe) return "Requested You"

        return "Follow"
    }

    const controlFollowCall = (status, profileId) => {
        if (status === 'Requested You') {
            navigate('/profile')
            changeRequestTab()
        } else {
            followCall(status, profileId)
        }
    }

    useEffect(() => {
        if (authUser && profile._id !== authUser._id) {
            setstatus(getFollowStatus(profile.relationship))
        }
    }, [profile, authUser])

    return (
        <div className='w-full flex justify-between bg-white/10 border border-gray-800 p-4 md:p-10 rounded-xl'>
            <div className='w-full flex flex-col md:flex-row items-center  justify-evenly'>
                {
                    profile.pic ? (
                        <img src={profile.pic} alt="Profile Picture" className="border border-gray-600 rounded-full object-cover w-40 h-40 md:w-56 md:h-56" />
                    ) : (
                        <Loader />
                    )
                }
                <div className='w-full md:w-[60%] text-center h-56 flex flex-col gap-4 items-center justify-center p-4'>
                    <div>
                        <p className='text-4xl font-semibold'>@{profile.username}</p>
                        <p className='text-gray-300 text-lg w-full'>{profile.name}</p>
                        <p className='text-gray-400'>{profile.bio}</p>
                    </div>
                    <div className='flex w-fit justify-evenly gap-4 text-blue-500 bg-white/10 rounded-lg px-8 py-4' onClick={() => changeFollowTab()}>
                        <div>
                            <p className='text-2xl font-semibold'>Follower</p>
                            <p className='text-white text-lg'>{authUser._id == profile._id ? profile.follower.length : profile.isPrivate ? profile.follower : profile.follower.length}</p>
                        </div>
                        <div>
                            <p className='text-2xl font-semibold'>Following</p>
                            <p className='text-white text-lg'>{authUser._id == profile._id ? profile.following.length : profile.isPrivate ? profile.following : profile.following.length}</p>
                        </div>
                    </div>
                    {
                        authUser && authUser._id !== profile._id && (
                            <button onClick={() => controlFollowCall(status, profile._id)} className='w-fit font-semibold py-2 px-16 bg-blue-500 rounded-lg'>
                                {status}
                            </button>
                        )
                    }
                </div>
            </div>
            {
                authUser && authUser._id === profile._id && (
                    <div className='flex flex-col gap-4'>
                        <button onClick={() => changeSetting()}>
                            <Settings className='hover:text-purple-400 hover:animate-spin' />
                        </button>
                        <button onClick={() => changeRequestTab()}>
                            <Inbox className='hover:text-purple-400' />
                        </button>
                        <button onClick={() => changeEdit()}>
                            <Pencil className='hover:text-purple-400' />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default GetProfile
