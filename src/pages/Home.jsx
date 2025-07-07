import React, { useEffect} from 'react'
import SinglePost from '../components/SinglePost'

import { usePostStore } from '../store/usePostStore'
import { useAuthStore } from '../store/useAuthStore'

import { Loader,Frown  } from 'lucide-react'

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
    <div className='text-white xl:w-2/7 lg:w-3/8 md:w-4/8 w-full px-4 overflow-y-auto custom-scrollbar '>
      {
        posts.length > 0 ? (
          posts.map((post,index) => (
            <div className='mt-20' key={post._id}>
              <SinglePost post={post} isHomePost={true} />
              <p className='w-full mb-8 text-white'>{post.comment}</p>
            </div>
        ))
        ):(
          <div className='h-full gap-4 text-center w-full flex flex-col justify-center items-center'>
            <Frown size={100}/>
            <p className='text-4xl'>No Post Available!</p>
            <p className='text-gray-300'>Follow SomeOne or Wait Until Your Friend Post Something</p>
          </div>
        )
      }
    </div>
  )
}

export default Home