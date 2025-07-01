import React from 'react'

const ProfilePost = ({ profile }) => {
    return (
        <div className='w-full p-4 '>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1  ">
                {
                    profile.map((post) => (
                        <div key={post.publicId} className="aspect-square w-full h-full overflow-hidden flex items-center justify-center bg-black/20 rounded border border-gray-600">
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