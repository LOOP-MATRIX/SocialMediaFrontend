import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom';

const Signup = () => {
  const { isSigningUp, signup,inputcss } = useAuthStore();


  const [formData, setformData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  })

  const changeformdata = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitform = (e) => {
    e.preventDefault()
    signup(formData)
    setformData({
      username: '',
      name: '',
      email: '',
      password: ''
    })
  }
  return (
    <div className='w-full md:w-1/2 flex flex-col px-4 justify-center gap-4 items-center'>
      <p className='text-5xl h-15 font-semibold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>SignUp</p>
      <form className='border-gray-500 transition-all hover:scale-101 ease-in-out duration-300 hover:shadow-lg hover:border-gray-200 hover:shadow-gray-700 w-full md:w-1/2 h-3/5   flex flex-col justify-evenly items-center border-2 rounded-lg p-4' onSubmit={submitform}>
        <input type="text" placeholder='username' className={inputcss} name='username' onChange={changeformdata} value={formData.username} />
        <input type="text" placeholder='name' className={inputcss} name='name' onChange={changeformdata} value={formData.name} />
        <input type="text" placeholder='email' className={inputcss} name='email' onChange={changeformdata} value={formData.email} />
        <input type="text" placeholder='password' className={inputcss} name='password' onChange={changeformdata} value={formData.password} />
        <div className='w-full'>
          <button type='submit' className='w-full flex justify-center bg-blue-600 rounded-md text-lg my-2 py-2'>{
          isSigningUp ? (<Loader className="size-7 animate-spin " />): 'Send'
        }</button>
        <p className='text-center'> 
          Already have an Account? <Link to='/login' className="text-blue-600 underline">Login</Link>
        </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
