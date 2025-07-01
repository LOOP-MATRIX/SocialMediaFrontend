import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

import ProfilePost from '../components/ProfilePost'
import GetProfile from '../components/GetProfile'

import { Loader, Settings } from 'lucide-react'

const Profile = () => {
  const { getProfile, authUser, myprofile, isLoadingProfile } = useAuthStore()
  

  useEffect(() => {
    if (authUser) {
      getProfile();
    }
  }, [getProfile, authUser]);

  if (isLoadingProfile && !myprofile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-amber-300" />
      </div>
    );
  }

  if (!myprofile) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <p>Failed to fetch</p>
        <button className='px-4 py-1 text-white bg-red-500' onClick={() => getProfile}>Retry</button>
      </div>
    );
  }

  console.log(myprofile)
  return (
    <div className='xl:w-1/2 lg:w-2/3 w-full relative'>
      <GetProfile  profile={myprofile}/>
      <ProfilePost profile={myprofile.posts}/>
    </div>
  )
}

export default Profile