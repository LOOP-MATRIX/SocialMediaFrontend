import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Search,
  CircleUserRound ,
  MessageCircle,
  CircleFadingPlus 
} from 'lucide-react'

const linkClasses = ({ isActive }) =>
  `flex flex-col items-center transition-colors duration-200 ${
    isActive ? 'text-purple-400 drop-shadow-xl drop-shadow-purple-300' : 'text-white hover:text-cyan-400'
  }`

const iconSize = 'w-6 h-6'

const Navbar = () => {
  return (
    <nav className="bg-black border-t  border-white flex justify-evenly items-center py-3 text-white fixed bottom-0 left-1/2 -translate-x-1/2 xl:w-1/2 lg:w-2/3 w-full z-50 rounded-t-xl shadow-md">
      <NavLink to="/" className={linkClasses} end>
        <Home className={iconSize} />
      </NavLink>

      <NavLink to="/search" className={linkClasses}>
        <Search className={iconSize} />
      </NavLink>
      <NavLink to="/createpost" className={linkClasses}>
        <CircleFadingPlus className={iconSize} />
      </NavLink>
      <NavLink to="/chat" className={linkClasses}>
        <MessageCircle className={iconSize} />
      </NavLink>

      <NavLink to="/profile" className={linkClasses}>
        <CircleUserRound  className={iconSize} />
      </NavLink>

    </nav>
  )
}

export default Navbar
