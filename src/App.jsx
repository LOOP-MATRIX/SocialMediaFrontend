import React, { useEffect } from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import SearchPage from './pages/Search'
import CreatePost from './pages/CreatePost'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'

import { Loader, Search } from 'lucide-react'
import { Toaster } from "react-hot-toast";

import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'
import OtherProfile from './pages/OtherProfile'
import SinglePostDetails from './pages/SinglePostDetails'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  const location = useLocation();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-amber-300" />
      </div>
    );

  return (
    <div className='w-full h-screen flex justify-center text-white bg-black relative overflow-y-auto custom-scrollbar'>
      <div className="absolute left-[-15%] w-[300px] h-screen bg-orange-400 blur-[160px] opacity-30 animate-pulse"></div>
      <div className="absolute top-[0%] right-[0%] w-[1000px] h-[10%] bg-purple-600 blur-[160px] opacity-90 animate-pulse"></div>
      <div className="absolute right-[0%] w-[100px] h-screen bg-blue-400 blur-[150px] opacity-90 animate-pulse"></div>
      <div className="absolute bottom-[0%] right-[20%] w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[180px] opacity-30 animate-bounce-opacity"></div>
      <div className="absolute top-[30%] left-[15%] w-[300px] h-[300px] bg-pink-400 rounded-full blur-[120px] opacity-30 animate-bounce-opacity"></div>
    {location.pathname === '/' && <Header />}
      <Routes>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/landingpage' element={!authUser?<LandingPage/>:<Navigate to='/'/>}/>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/landingpage'/>}/>
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/landingpage'/>}/>
        <Route path='/othersprofile/:id' element={authUser?<OtherProfile/>:<Navigate to='/landingpage'/>}/>
        <Route path='/singlepostdetails/:id' element={authUser?<SinglePostDetails/>:<Navigate to='/landingpage'/>}/>
        <Route path='/createpost' element={authUser?<CreatePost/>:<Navigate to='/landingpage'/>}/>
        <Route path='/chat' element={authUser?<Chat/>:<Navigate to='/landingpage'/>}/>
        <Route path='/search' element={authUser?<SearchPage/>:<Navigate to='/landingpage'/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      <Toaster/>
      {
        authUser && (
          <Navbar/>
        )
      }
      
    </div>
    
  )
}


export default App