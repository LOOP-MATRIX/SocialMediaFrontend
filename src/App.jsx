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
    <div className='w-full h-screen flex justify-center text-white bg-black '>
    {location.pathname === '/' && <Header />}
      <Routes>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}/>
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
        <Route path='/othersprofile/:id' element={authUser?<OtherProfile/>:<Navigate to='/login'/>}/>
        <Route path='/singlepostdetails/:id' element={authUser?<SinglePostDetails/>:<Navigate to='/login'/>}/>
        <Route path='/createpost' element={authUser?<CreatePost/>:<Navigate to='/login'/>}/>
        <Route path='/chat' element={authUser?<Chat/>:<Navigate to='/login'/>}/>
        <Route path='/search' element={authUser?<SearchPage/>:<Navigate to='/login'/>}/>
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