import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'

import { ArrowLeft } from 'lucide-react'
import { useFollowStore } from '../store/useFollowStore'

const Request = ({ requests }) => {
    const { changeRequestTab, authUser } = useAuthStore()
    const { declineRequest, acceptReq } = useFollowStore()
    const navigate = useNavigate()
    const navigateRequestTabClose = (id) => {
        if (authUser && id === authUser._id) {
            navigate(`/profile`)
            changeLikedTab()
        } else {
            navigate(`/othersprofile/${id}`)
            changeLikedTab()
        }

    }

    useEffect(() => {
        console.log("Requests", requests);
    }, [requests]);

    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    return (
        <div data-aos="fade-up" className='border border-gray-800 absolute bottom-0 h-[80%] bg-black/95 w-full rounded-xl'>
            <button onClick={() => changeRequestTab()} className='absolute bg-white/20 p-1 m-2 rounded-full'><ArrowLeft /></button>
            <p className='text-center text-2xl  py-2 text-purple-400 font-bold'>Requests</p>
            <div className=' w-full overflow-y-auto custom-scrollbar'>
                {
                    requests.map((f, index) => (
                        <div key={index} className='w-full flex justify-between px-8 border-b rounded-xl  border-gray-500 p-2'>
                            <div onClick={() => navigateRequestTabClose(f.user._id)} className='flex gap-4 items-center'>
                                <img src={f.user.pic} alt={f.user.name} className='w-20 h-20 rounded-full' />
                                <div className='flex flex-col'>
                                    <p className='text-lg text-blue-400 font-semibold'>@{f.user.username}</p>
                                    <p className=' text-gray-400'>{f.user.name}</p>
                                </div>

                            </div>
                            <div className='flex justify-center items-center gap-4'>
                                <button className='py-1 px-2 bg-gray-500 rounded-md' onClick={() => declineRequest(f.user._id)}>Decline</button>
                                <button className='py-1 px-2 bg-blue-500 rounded-md' onClick={() => acceptReq(f.user._id)}>Accept</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Request