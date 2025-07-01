import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

import { Settings, Pencil, Loader } from 'lucide-react'

const GetProfile = ({ profile }) => {
    const { isSetting, changeSetting, isEdit, changeEdit, authUser } = useAuthStore()
    return (
        <div className='w-full flex justify-between border border-gray-400 p-10 rounded-xl'>
            <div className='w-full flex flex-col md:flex-row items-center  justify-evenly'>
                {
                    profile.pic ? (<img src={profile.pic} alt="Profile Picture" className='w-[80%] md:w-[30%] rounded-full' />) : (<Loader />)
                }
                <div className='w-[50%] text-center h-56  flex flex-col  items-center justify-evenly p-4'>
                    <p className='text-4xl font-semibold'>@{profile.username}</p>
                    <p className='text-gray-300 text-lg' >{profile.name}</p>
                    <p className='text-gray-400'>{profile.bio}</p>
                    <div className='flex w-fit md:w-full justify-evenly gap-4 text-blue-500 bg-white/10 rounded-lg p-4'>
                        <div >
                            <p className='text-2xl  font-semibold'>Follower</p>
                            <p className='text-white text-lg'>{profile.follower.length}</p>
                        </div>
                        <div>
                            <p className='text-2xl  font-semibold'>Following</p>
                            <p className='text-white text-lg'>{profile.following.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                authUser && authUser._id == profile._id && (
                    <div className='flex flex-col gap-4'>
                        <button onClick={() => changeSetting()}>
                            <Settings className='hover:text-purple-400 hover:animate-spin' />
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