import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/slices/Auth'

const Signup = () => {
  const { msg, status, page } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

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
    dispatch(signup({ formData, page }))
    setformData({
      username: '',
      name: '',
      email: '',
      password: ''
    })
  }
  return (
    <div><form className='flex flex-col gap-8' onSubmit={submitform}>
      <p>{status}</p>
      <p>{msg}</p>
      <input type="text" placeholder='username' className='border border-black' name='username' onChange={changeformdata} value={formData.username} />
      <input type="text" placeholder='name' className='border border-black' name='name' onChange={changeformdata} value={formData.name} />
      <input type="text" placeholder='email' className='border border-black' name='email' onChange={changeformdata} value={formData.email} />
      <input type="text" placeholder='password' className='border border-black' name='password' onChange={changeformdata} value={formData.password} />
      <button type='submit' >{
        status == 'loading' ? 'loading..' : 'send'
      }</button>
    </form></div>
  )
}

export default Signup