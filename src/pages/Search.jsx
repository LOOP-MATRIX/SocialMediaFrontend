import React, { useEffect, useState } from 'react'
import { usePostStore } from '../store/usePostStore'

import { Loader, SearchCheck } from 'lucide-react'
import ProfilePost from '../components/ProfilePost'
import { useAuthStore } from '../store/useAuthStore'
import { useSearchPost } from '../store/useSearchProfile'


const Search = () => {

  const { getPopularPosts, isPostLoading, popularPosts } = usePostStore()

  const { isSearching, searchedUser, getSearchResult } = useSearchPost();

  const [search, setsearch] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedTerm) {
      console.log("API call with:", debouncedTerm);
      getSearchResult(debouncedTerm)
    }
  }, [debouncedTerm]);

  useEffect(() => {
    getPopularPosts()
  }, [getPopularPosts])

  if (isPostLoading && !popularPosts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-purple-300" />
      </div>
    )
  }

  if (!popularPosts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Failed to fetch popular posts</p>
      </div>
    )
  }


  return (
    <div className='xl:w-1/2 lg:w-2/3 w-full pt-4 overflow-y-auto custom-scrollbar'>
      <div className='px-4 sticky top-0 z-10'>
        <SearchCheck className='absolute top-[10px] left-[30px]' />
        <input
          type="text"
          onChange={(e) => setsearch(e.target.value)}
          onFocus={() => setShowSearchBox(true)}
          onBlur={() => setShowSearchBox(false)}
          className='pl-12 py-2 bg-black/50 rounded-3xl border text-blue-400 border-gray-300 w-full'
          placeholder='Search by @id or name'
        />

        {showSearchBox && (
          <div className='sticky h-fit border p-1 rounded-md border-gray-800 my-1 bg-black/80'>
            {searchedUser ? (
              searchedUser.map((user) => (
                <div key={user._id} className='w-full flex border-b rounded-xl gap-6  items-center border-gray-500 p-2'>
                  <img src={user.pic} alt={user.name} className='w-20 h-20 rounded-full' />
                  <div className='flex flex-col'>
                    <p className='text-xl text-blue-400 font-semibold'>@{user.username}</p>
                    <p className='text-md text-gray-400'>{user.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No User Found</p>
            )}
          </div>
        )}
      </div>
      <ProfilePost profile={popularPosts} />
    </div>
  )
}

export default Search