import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'

import { ArrowLeft } from 'lucide-react'

const Liked = ({ like }) => {
    const { changeLikedTab, authUser } = useAuthStore()
    const navigate = useNavigate()
    const navigateLikedTabClose = (id) => {
        if (authUser && id === authUser._id) {
            navigate(`/profile`)
            changeLikedTab()
        } else {
            navigate(`/othersprofile/${id}`)
            changeLikedTab()
        }

    }
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    return (
        <div data-aos="fade-up" className='border border-gray-800 absolute bottom-0 h-[80%] bg-black/95 backdrop-blur-sm w-full rounded-xl'>
            <button onClick={() => changeLikedTab()} className='absolute bg-white/20 p-1 m-2 rounded-full'><ArrowLeft /></button>
                <p className='text-center text-2xl  py-2 text-purple-400 font-bold'>Likes</p>
            <div className=' w-full overflow-y-auto custom-scrollbar'>
                {
                    like.map((f, index) => (
                        <div key={index} onClick={() => navigateLikedTabClose(f.user._id)} className='w-full flex border-b rounded-xl gap-6  items-center border-gray-500 p-2'>
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

export default Liked