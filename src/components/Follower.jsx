import React, { useEffect } from 'react'

import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

import AOS from 'aos'

import { useNavigate } from "react-router-dom";
import { useFollowStore } from '../store/useFollowStore';


const Follower = ({ follower, following, userId }) => {
    const { changeFollowTab, authUser } = useAuthStore()

    const { removeFollower } = useFollowStore()

    const navigate = useNavigate()

    const navigateFollowerTabClose = (id) => {
        if (authUser && id === authUser._id) {
            navigate(`/profile`)
            changeFollowTab()
        } else {
            navigate(`/othersprofile/${id}`)
            changeFollowTab()
        }
    }


    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);
    return (
        <div data-aos="fade-up" className='absolute flex bottom-0 h-[80%] bg-black/90  w-full rounded-xl'>
            <button onClick={() => changeFollowTab()} className='absolute bg-white/20 p-1 m-2 rounded-full'><ArrowLeft /></button>
            <div className='border-r border-gray-500 w-1/2'>
                <p className='text-center text-2xl  py-2 text-purple-400 font-bold'>Follower</p>
                {
                    follower.map((f, index) => (
                        <div key={index} className='w-full flex border-b justify-between rounded-xl gap-6  items-center border-gray-500 p-2'>
                            <div className='flex items-start gap-4'>
                                <img onClick={() => navigateFollowerTabClose(f.user._id)} src={f.user.pic} alt={f.user.name} className='w-20 h-20 rounded-full' />
                                <div onClick={() => navigateFollowerTabClose(f.user._id)} className='flex flex-col'>
                                    <p className='text-xl text-blue-400 font-semibold'>@{f.user.username}</p>
                                    <p className='text-md text-gray-400'>{f.user.name}</p>
                                </div>
                            </div>
                            {
                                authUser._id === userId && (
                                    <button onClick={() => removeFollower(f.user._id)} className=' bg-blue-500 px-1 rounded-sm'>remove</button>
                                )
                            }
                        </div>
                    ))
                }
            </div>
            <div className=' w-1/2'>
                <p className='text-center text-2xl py-2 text-purple-400 font-bold'>Following</p>
                {
                    following.map((f, index) => (
                        <div key={index} onClick={() => navigateFollowerTabClose(f.user._id)} className='w-full flex border-b rounded-xl gap-6  items-center border-gray-500 p-2'>
                            <img src={f.user.pic} alt={f.user.name} className='w-20 h-20 rounded-full' />
                            <div className='flex flex-col'>
                                <p className='text-xl text-blue-400 font-semibold'>@{f.user.username}</p>
                                <p className='text-md text-gray-400'>{f.user.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Follower