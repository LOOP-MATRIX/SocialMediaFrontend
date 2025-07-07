import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useFollowStore } from '../store/useFollowStore'
import AOS from 'aos'
import { useNavigate } from 'react-router-dom'

const Follower = ({ follower, following, userId }) => {
    const { changeFollowTab, authUser } = useAuthStore()
    const { removeFollower } = useFollowStore()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('followers')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

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
        AOS.init({ duration: 500, once: true })

        // Listen to window resize for responsiveness
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div data-aos="fade-up" className='fixed bottom-0 h-[80%] w-full bg-black/90 rounded-xl flex flex-col md:flex-row overflow-y-auto custom-scrollbar '>

            {/* Back Button */}
            <button onClick={changeFollowTab} className='absolute z-10 bg-white/20 p-1 m-2 rounded-full'>
                <ArrowLeft />
            </button>

            {/* Tabs for mobile */}
            {isMobile ? (
                <>
                    <div className="w-full flex justify-center gap-4 mt-10 text-white py-2">
                        <button
                            onClick={() => setActiveTab('followers')}
                            className={`px-4 py-1 rounded ${activeTab === 'followers' ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            Followers
                        </button>
                        <button
                            onClick={() => setActiveTab('following')}
                            className={`px-4 py-1 rounded ${activeTab === 'following' ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            Following
                        </button>
                    </div>
                    {(activeTab === 'followers') && (
                        <div className='w-full md:w-1/2 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-500 mt-4 md:mt-0'>
                            <p className='text-center text-2xl py-2 text-purple-400 font-bold'>Follower</p>
                            {
                                follower.map((f, index) => (
                                    <div key={index} className='flex justify-between items-center gap-4 border-b border-gray-500 p-2'>
                                        <div className='flex gap-4 items-center'>
                                            <img
                                                onClick={() => navigateFollowerTabClose(f.user._id)}
                                                src={f.user.pic}
                                                alt={f.user.name}
                                                className='w-14 h-14 md:w-20 md:h-20 rounded-full object-cover cursor-pointer'
                                            />
                                            <div onClick={() => navigateFollowerTabClose(f.user._id)} className='flex flex-col cursor-pointer'>
                                                <p className='text-blue-400 text-lg md:text-xl font-semibold'>@{f.user.username}</p>
                                                <p className='text-gray-400 text-sm md:text-md'>{f.user.name}</p>
                                            </div>
                                        </div>
                                        {
                                            authUser._id === userId && (
                                                <button
                                                    onClick={() => removeFollower(f.user._id)}
                                                    className='bg-blue-500 text-sm px-2 py-1 rounded-md'
                                                >
                                                    Remove
                                                </button>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )}
                    {(activeTab === 'following') && (
                        <div className='w-full md:w-1/2 overflow-y-auto mt-4 md:mt-0'>
                            <p className='text-center text-2xl py-2 text-purple-400 font-bold'>Following</p>
                            {
                                following.map((f, index) => (
                                    <div key={index} onClick={() => navigateFollowerTabClose(f.user._id)} className='flex items-center gap-4 border-b border-gray-500 p-2 cursor-pointer'>
                                        <img
                                            src={f.user.pic}
                                            alt={f.user.name}
                                            className='w-14 h-14 md:w-20 md:h-20 rounded-full object-cover'
                                        />
                                        <div className='flex flex-col'>
                                            <p className='text-blue-400 text-lg md:text-xl font-semibold'>@{f.user.username}</p>
                                            <p className='text-gray-400 text-sm md:text-md'>{f.user.name}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </>
            ) : (
                <>
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
                </>
            )

            }


        </div>
    )
}

export default Follower
