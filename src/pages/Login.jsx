import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Link} from 'react-router-dom'
import { Loader,Eye,EyeClosed } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const { isLoggingIn, login, inputcss } = useAuthStore()
  const [see , setSee ] = useState(false)

  const [formData, setformData] = useState({
    email: '',
    password: ''
  })

  const changeformdata = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitform = (e) => {
    e.preventDefault()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email) && formData.email !== "") {
        return toast.error('Enter a Valid Email Address')
      }
    login(formData)
    setformData({
      email: '',
      password: ''
    })
  }
  return (
    <div className='xl:w-1/2 lg:w-2/3 w-full flex flex-col justify-center px-4 gap-4 items-center'>
      <p className='text-5xl h-15 font-semibold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>Login</p>
      <form className='border-gray-500 transition-all hover:scale-101 ease-in-out duration-300 hover:shadow-lg hover:border-gray-200 hover:shadow-gray-700 w-full md:w-1/2 h-[40%] md:h-2/5 flex flex-col justify-evenly items-center border-2 rounded-lg p-4' onSubmit={submitform}>
        <input type="text" placeholder='email' className={inputcss} name='email' onChange={changeformdata} value={formData.email} />
        <label htmlFor="password" className='flex w-full relative'>
          <input
            type={see ? "text" : "password"}
            placeholder='password'
            className={inputcss}
            name='password'
            onChange={changeformdata}
            value={formData.password}
          />
          {see ? (
            <Eye className='absolute right-2 top-2 cursor-pointer' onClick={() => setSee(false)} />
          ) : (
            <EyeClosed className='absolute right-2 top-2 cursor-pointer' onClick={() => setSee(true)} />
          )}
        </label>
        <div className='w-full'>
          <button type='submit' className='w-full flex justify-center bg-blue-600 rounded-md text-lg my-2 py-2'>{
            isLoggingIn ? (<Loader className="size-7 animate-spin " />) : 'Send'
          }</button>
          <p className='text-center'>
            Don't have an Account? <Link to='/signup' className="text-blue-600 underline">SignUp</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login