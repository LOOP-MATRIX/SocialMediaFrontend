import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';

import { Frown } from 'lucide-react'

const ProfilePost = ({ profile }) => {

    const navigate = useNavigate()

    const navigateSinglePostDetails = (id) => {
        navigate(`/singlepostdetails/${id}`)
    }

    return (
        <div className='w-full p-4 '>
            {
                profile.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1  ">
                        {profile.map((post) => (
                            <div key={post.publicId} onClick={() => navigateSinglePostDetails(post._id)} className="aspect-square w-full h-full overflow-hidden flex items-center justify-center bg-black/20 rounded border border-gray-600">
                                <img
                                    src={post.image[0].url}
                                    alt={post.publicId}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div div className=' gap-4 mt-10 text-center w-full h-full flex flex-col justify-center items-center'>
                        <Frown size={100} className='text-gray-300' />
                        <p className='text-4xl'>No Post Yet!</p>
                    </div>
                )



            }
        </div >
    )
}




export default ProfilePost