import React, { useEffect } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import SearchPage from './pages/Search'
import CreatePost from './pages/CreatePost'

import { Loader, Search } from 'lucide-react'
import { Toaster } from "react-hot-toast";

import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
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

      <Routes>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}/>
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
        <Route path='/createpost' element={authUser?<CreatePost/>:<Navigate to='/login'/>}/>
        <Route path='/chat' element={authUser?<Chat/>:<Navigate to='/login'/>}/>
        <Route path='/search' element={authUser?<SearchPage/>:<Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
      <Navbar/>
    </div>
  )
}

export default App