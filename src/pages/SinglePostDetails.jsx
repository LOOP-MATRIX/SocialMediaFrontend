import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SinglePost from '../components/SinglePost';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';

import Liked from '../components/Liked';

import { Loader } from 'lucide-react';

const SinglePostDetails = () => {
    const { singlePostDetails, getSinglePost, isPostLoading } = usePostStore();
    console.log(singlePostDetails)
    const { isLikeTab } = useAuthStore()

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getSinglePost(id)
        }
    }, [id])

    if (isPostLoading && !singlePostDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin text-purple-300" />
            </div>
        )
    }

    if (!singlePostDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>No Such Post Available</p>
            </div>
        )
    }

    return (
        <div className='w-full lg:w-2/7 px-2 flex flex-col items-center relative'>
            <SinglePost post={singlePostDetails} isHomePost={false} />
            {
                isLikeTab && (
                    <Liked like={singlePostDetails.likes} />
                )
            }
        </div>
    )
}

export default SinglePostDetails