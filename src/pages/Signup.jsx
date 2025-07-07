import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeClosed, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const { isSigningUp, signup, inputcss } = useAuthStore()

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errors, setErrors] = useState({})

  const changeFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name || formData.name.length < 3)
      newErrors.name = 'Name must be at least 3 characters'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email))
      newErrors.email = 'Enter a valid email address'

    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    return newErrors
  }

  const submitForm = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    signup(formData)
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setErrors({})
  }

  return (
    <div className='xl:w-1/2 lg:w-2/3 w-full flex flex-col px-4 justify-center gap-4 items-center'>
      <p className='text-5xl font-semibold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>SignUp</p>

      <form
        className='border-gray-500 transition-all hover:scale-101 ease-in-out duration-300 hover:shadow-lg hover:border-gray-200 hover:shadow-gray-700 w-full md:w-1/2 flex flex-col justify-evenly items-center border-2 rounded-lg p-4 gap-4'
        onSubmit={submitForm}
      >
        <input
          type="text"
          placeholder='Username'
          className={inputcss}
          name='username'
          onChange={changeFormData}
          value={formData.username}
        />

        <input
          type="text"
          placeholder='Name'
          className={inputcss}
          name='name'
          onChange={changeFormData}
          value={formData.name}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="text"
          placeholder='Email'
          className={inputcss}
          name='email'
          onChange={changeFormData}
          value={formData.email}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className='relative w-full'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className={`${inputcss} pr-10`}
            name='password'
            onChange={changeFormData}
            value={formData.password}
          />
          <button
            type="button"
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <div className='relative w-full'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            className={`${inputcss} pr-10`}
            name='confirmPassword'
            onChange={changeFormData}
            value={formData.confirmPassword}
          />
          <button
            type="button"
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeClosed /> : <Eye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        <div className='w-full'>
          <button type='submit' className='w-full flex justify-center bg-blue-600 rounded-md text-lg my-2 py-2'>
            {isSigningUp ? <Loader className="size-6 animate-spin" /> : 'Send'}
          </button>

          <p className='text-center'>
            Already have an Account?{' '}
            <Link to='/login' className="text-blue-600 underline">Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
