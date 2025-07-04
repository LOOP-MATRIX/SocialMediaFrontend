import React, { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import ProfilePost from '../components/ProfilePost';
import GetProfile from '../components/GetProfile';
import Follower from '../components/Follower';
import { Loader, LogOut, ImagePlus } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Request from '../components/Request';

const Profile = () => {
  const {
    getProfile,
    logout,
    authUser,
    inputcss,
    myprofile,
    isLoadingProfile,
    isUpdatingProfile,
    isSetting,
    isEdit,
    changeEdit,
    isFollowTab,
    isRequestTab,
    updateProfile,
    setAccountPrivacy
  } = useAuthStore();

  const [formData, setFormData] = useState({
    username: authUser.username,
    name: authUser.name,
    bio: authUser.bio,
  });

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  useEffect(() => {
    if (authUser) getProfile();
  }, [authUser, getProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("name", formData.name);
    form.append("bio", formData.bio);

    if (fileInputRef.current?.files[0]) {
      form.append("pic", fileInputRef.current.files[0]);
    }

    await updateProfile(form);
    getProfile();
    changeEdit();
  };

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
        <button className="px-4 py-1 text-white bg-red-500" onClick={getProfile}>Retry</button>
      </div>
    );
  }

  return (
    <div className="xl:w-1/2 lg:w-2/3 w-full relative overflow-y-auto custom-scrollbar">
      <GetProfile profile={myprofile} />
      <ProfilePost profile={myprofile.posts} />

      {isSetting && (
        <div
          data-aos="fade-right"
          className="absolute inset-y-0 px-2 left-0 w-72 min-h-full bg-black border-r border-l rounded-xl border-l-purple-900 border-r-purple-400 z-50 flex flex-col items-center"
        >
          <button
            onClick={() =>
              setAccountPrivacy(!myprofile.isPrivate)
            }
            className="py-3 border-b text-purple-400 border-b-white w-full flex gap-2 justify-center items-center"
          >
            {myprofile.isPrivate ? "Make Public" : "Make Private"}
          </button>
          <button
            className="py-3 border-b text-red-400 border-b-white w-full flex gap-2 justify-center items-center"
            onClick={logout}
          >
            <LogOut />
            <p>LogOut</p>
          </button>

        </div>
      )}


      {isEdit && (
        <div className="absolute inset-0 w-80 md:w-100 flex flex-col gap-8 h-fit p-4 left-3 top-30 rounded-2xl md:left-50 border border-purple-400 x-60 backdrop-blur-2xl bg-black/70">
          <div className="w-full px-4 flex justify-between items-center">
            <p>UPDATE PROFILE</p>
            <button onClick={changeEdit} className="text-2xl text-red-400 font-bold">x</button>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="w-full flex justify-center">
              <img src={preview} alt="preview" className="h-24 w-24 rounded-full object-cover border border-purple-500" />
            </div>
          )}

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="text-white"
          />

          <input
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            className={inputcss}
          />
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            className={inputcss}
          />
          <input
            type="text"
            placeholder="bio"
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            className={inputcss}
          />
          <button onClick={handleUpdateProfile} className="py-2 bg-blue-400 flex justify-center items-center rounded-lg">{
            isUpdatingProfile ? <Loader className='animate-spin' /> : 'UPDATE'
          }</button>
        </div>
      )}

      {isFollowTab && <Follower follower={myprofile.follower} following={myprofile.following} userId={myprofile._id}/>}
      {isRequestTab && <Request requests={myprofile.requests} />}
    </div>
  );
};

export default Profile;
