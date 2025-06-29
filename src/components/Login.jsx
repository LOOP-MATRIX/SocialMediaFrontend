import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/slices/Auth'

const Login = () => {

  const { msg, status, page } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formData, setformData] = useState({
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
      email: '',
      password: ''
    })
  }
  return (
    <div>
      <p>{msg}</p>
      <form onSubmit={submitform} >
        <input type="text" placeholder='email' className='border border-black' name='email' onChange={changeformdata} value={formData.email} />
        <input type="text" placeholder='password' className='border border-black' name='password' onChange={changeformdata} value={formData.password} />
        <button type='submit' >{
          status == 'loading' ? 'loading..' : 'send'
        }</button>
      </form>
    </div>
  )
}

export default Login