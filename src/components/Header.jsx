import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

import { useNavigate } from 'react-router-dom'

const Header = () => {
    const {authUser} = useAuthStore()
    const navigate = useNavigate()
  return (
    <div className="bg-black border-b  border-white flex justify-between px-8 items-center py-1 text-white fixed top-0 xl:w-1/2 lg:w-2/3 w-full z-50 rounded-b-xl shadow-md">

        <p className='text-3xl py-3 md:py-0 md:text-5xl h-15 font-semibold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>PULSE LINK</p>
        {
            authUser?.pic && (
                <img src={authUser.pic} alt={authUser.username} className='w-10 h-10 md:h-12 md:w-12 rounded-full border' onClick={()=>navigate('/profile')}/>
            )
        }
    </div>
  )
}

export default Header