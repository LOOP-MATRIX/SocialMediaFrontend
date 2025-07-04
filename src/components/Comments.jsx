import React, { useEffect, useState } from 'react'
import AOS from 'aos'

import { ArrowLeft, Send, EllipsisVertical } from 'lucide-react';

import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { usePostStore } from '../store/usePostStore';

const Comments = ({ comments, postId }) => {
    console.log(comments)
    const { changeCommentTab, authUser } = useAuthStore()
    const { addComment, removeComment } = usePostStore()
    const [comment, setcomment] = useState('')

    const navigate = useNavigate()
    const navigateCommentTabClose = (id) => {
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
        <div data-aos="fade-up" className='border border-gray-800 absolute  bottom-0 h-[80%] z-20 bg-black/95 w-full rounded-xl'>

            <button onClick={() => changeCommentTab()} className='absolute bg-white/20 p-1 m-2 rounded-full'><ArrowLeft /></button>
            <p className='text-center text-2xl  py-2 text-purple-400 font-bold'>comments</p>
            {
                !comments.length == 0 ? (
                    <div className=' w-full h-[70%] overflow-y-auto custom-scrollbar'>
                        {
                            comments.map((f, index) => (
                                <div key={index} className='w-full flex justify-between items-start border-b rounded-xl gap-6  border-gray-500 p-2'>
                                    <div onClick={() => navigateCommentTabClose(f.user._id)}  className='flex gap-4 items-center'>
                                        <img src={f.user.pic} alt={f.user.name} className='w-20 h-20 rounded-full' />
                                        <div className='flex flex-col'>
                                            <p className='text-lg text-blue-400 font-semibold'>@{f.user.username}</p>
                                            <p className=' text-gray-400'>{f.comment}</p>
                                        </div>
                                    </div>
                                    <div className=' right-2'>
                                        <button onClick={() => removeComment(postId, authUser,f._id)}><EllipsisVertical /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex justify-center pt-40">
                        <p className='text-gray-300'>No comments yet!, Be first to comment</p>
                    </div>
                )
            }
            <div className='w-full flex justify-center fixed bottom-12 bg-white/10 pb-2 px-4 pt-4 rounded-t-2xl z-10 gap-4'>
                <input className='border w-full py-2 pl-4 rounded-full' type="text" value={comment} onChange={(e) => setcomment(e.target.value)} />
                <button onClick={() => addComment(postId, authUser, comment)} className='text-blue-400'><Send /></button>
            </div>
        </div>
    )
}

export default Comments