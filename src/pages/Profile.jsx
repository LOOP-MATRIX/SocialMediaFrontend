import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

import ProfilePost from '../components/ProfilePost'
import GetProfile from '../components/GetProfile'
import Follower from '../components/Follower'

import { Loader, LogOut } from 'lucide-react'

import AOS from 'aos';
import 'aos/dist/aos.css';


const Profile = () => {
  const { getProfile, logout, authUser,inputcss, myprofile, isLoadingProfile, isSetting, isEdit ,changeEdit,isFollowTab } = useAuthStore()

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  useEffect(() => {
    if (authUser) {
      getProfile();
    }
  }, [getProfile, authUser]);

  const [formData,setFormData]=useState({
    username:authUser.username,
    name:authUser.name,
    bio:authUser.bio,
  })

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

  return (
    <div className='xl:w-1/2 lg:w-2/3 w-full relative overflow-y-auto custom-scrollbar'>
      <GetProfile profile={myprofile} />
      <div className=''>
        <ProfilePost profile={myprofile.posts} />
      </div>
      {isSetting && (
        <div
          data-aos="fade-right"
          className='absolute inset-y-0 px-2 left-0 w-72 min-h-full bg-black border-r border-l rounded-xl border-l-purple-900 border-r-purple-400 z-50 flex flex-col items-center'
        >
          <button
            className='py-3 border-b text-red-400 border-b-white w-full flex gap-2 justify-center items-center'
            onClick={logout}
          >
            <LogOut />
            <p>LogOut</p>
          </button>
        </div>
      )}

      {
        isEdit && (
          <div className='absolute inset-0 w-100 flex flex-col gap-8 h-100 p-4 left-3 top-30 rounded-2xl md:left-50 border border-purple-400 x-60 backdrop-blur-2xl bg-black/70'>
            <div className='w-full px-4 flex justify-between items-center'>
              <p>UPDATE PROFILE</p>
              <button onClick={()=>changeEdit()} className='text-2xl text-red-400 font-bold'>x</button>
            </div>
            <input type="text" placeholder='username' value={formData.username} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} name="username" className={inputcss}/>
            <input type="text" placeholder='name' value={formData.name} onChange={(e)=>setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}  className={inputcss}/>
            <input type="text" placeholder='bio' value={formData.bio} onChange={(e)=>setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}  className={inputcss}/>
            <button className='py-2 bg-blue-400 rounded-lg'>UPDATE</button>
          </div>
        )
      }

      {
        isFollowTab && (
          <Follower follower={myprofile.follower} following={myprofile.following}/>
        )
      }

    </div>
  )
}

export default Profile