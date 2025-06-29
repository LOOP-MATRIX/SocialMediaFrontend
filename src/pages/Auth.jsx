import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { changepage } from '../redux/slices/Auth'

const Auth = () => {
  const {page}=useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  return (
    <div>
      <div className='flex'>
        <button className='p-4 bg-blue-400 rounded-lg' onClick={()=>dispatch(changepage())}>{page}</button></div>
      {
        page=='signup'?(<Signup />):(<Login/>)
      }
    </div>
  )
}

export default Auth