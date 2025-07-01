import React, { useEffect } from 'react'
import { usePostStore } from '../store/usePostStore'

import {Loader} from 'lucide-react'
import ProfilePost from '../components/ProfilePost'


const Search = () => {

  const {getPopularPosts,isPostLoading,popularPosts} = usePostStore()

  useEffect(()=>{
    getPopularPosts()
  },[getPopularPosts])

  if(isPostLoading &&  !popularPosts){
      return(
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin text-purple-300" />
        </div>
      )
    }

    if(!popularPosts){
      return(
        <div className="flex items-center justify-center h-screen">
          <p>Failed to fetch popular posts</p>
        </div>
      )
    }

  return (
    <div className='w-1/2 border border-red-500'>
      <ProfilePost profile={popularPosts}/>
    </div>
  )
}

export default Search