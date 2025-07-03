import React from 'react'
import { useNavigate } from "react-router-dom";

const ProfilePost = ({ profile }) => {

    const navigate = useNavigate()

    const navigateSinglePostDetails = (id) => {
        navigate(`/singlepostdetails/${id}`)
    }

    return (
        <div className='w-full p-4 '>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1  ">
                {
                    profile.map((post) => (
                        <div key={post.publicId} onClick={()=>navigateSinglePostDetails(post._id)} className="aspect-square w-full h-full overflow-hidden flex items-center justify-center bg-black/20 rounded border border-gray-600">
                            <img
                                src={post.image[0].url}
                                alt={post.publicId}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProfilePost