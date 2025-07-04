import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

import GetProfile from '../components/GetProfile';
import ProfilePost from '../components/ProfilePost';
import Follower from '../components/Follower'

import { Loader,UserLock  } from 'lucide-react';

const OtherProfile = () => {
  const { isLoadingProfile, getOthersProfile, othersprofile, isFollowTab } = useAuthStore()
  console.log(othersprofile)

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
      {
        othersprofile.isPrivate && !othersprofile.relationship.amIFollowing ? (
          <div className='h-fit mt-10 gap-4 text-center w-full flex flex-col justify-center items-center'>
            <UserLock  size={100} />
            <p className='text-4xl'>This is a Private Account!</p>
            <p className='text-gray-300'>Follow Them To See Their Post</p>
          </div>
        ) : (
          <div className=''>
            {othersprofile && (<ProfilePost profile={othersprofile.posts} />)}
          </div>
        )
      }

      {
        isFollowTab && !othersprofile.isPrivate && (
          <Follower follower={othersprofile.follower} following={othersprofile.following} userId={othersprofile._id} />
        )
      }
    </div>
  )
}




export default OtherProfile