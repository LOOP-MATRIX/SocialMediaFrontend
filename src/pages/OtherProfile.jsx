import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

import GetProfile from '../components/GetProfile';
import ProfilePost from '../components/ProfilePost';
import Follower from '../components/Follower'

import { Loader } from 'lucide-react';

const OtherProfile = () => {
  const { isLoadingProfile, getOthersProfile, othersprofile ,isFollowTab} = useAuthStore()

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getOthersProfile(id);
    }
  }, [id]);

  if (isLoadingProfile && !othersprofile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-amber-300" />
      </div>
    );
  }

  if (!othersprofile) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">User profile not found.</p>
      </div>
    );
  }

  return (
    <div className='xl:w-1/2 lg:w-2/3 w-full relative overflow-y-auto custom-scrollbar'>
      {
        othersprofile && (
          <GetProfile profile={othersprofile} />
        )
      }
      <div className=''>
        {othersprofile && (<ProfilePost profile={othersprofile.posts} />)}
      </div>

      {
        isFollowTab && !othersprofile.isPrivate && (
          <Follower follower={othersprofile.follower} following={othersprofile.following}/>
        )
      }
    </div>
  )
}

export default OtherProfile