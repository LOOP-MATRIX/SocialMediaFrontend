import React, { useEffect} from 'react'
import SinglePost from '../components/SinglePost'

import { usePostStore } from '../store/usePostStore'
import { useAuthStore } from '../store/useAuthStore'

import { Loader } from 'lucide-react'

const Home = () => {
  const { posts, getFollowingPost, isPostLoading } = usePostStore()
  const { authUser} = useAuthStore()

  useEffect(() => {
    getFollowingPost()
  }, [authUser])

  if (isPostLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-purple-300" />
      </div>
    )
  }

  return (
    <div className='text-white lg:w-2/7 w-full p-4 overflow-y-auto custom-scrollbar '>
      {
        posts.map((post,index) => (
            <div key={post._id}>
              <SinglePost post={post} isHomePost={true} />
              <p className='w-full mb-8 text-white'>{post.comment}</p>
            </div>
        ))
      }
    </div>
  )
}

export default Home