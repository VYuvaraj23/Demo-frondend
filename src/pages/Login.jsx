import axios from 'axios'
import React, { useState } from 'react'
import url from '../utils/url'
import { useNavigate } from 'react-router'

function Login() {
  const [email,setEmail]=useState('')
  const [password, setPassword] = useState('')
sessionStorage.clear()
  const navigate = useNavigate()
  const fetchLogin = async () => {
  try {
    const res = await axios.post(`${url.API}/login`, { email, password })
    sessionStorage.setItem("token",res.data.token)
    sessionStorage.setItem("user", JSON.stringify(res.data.user))
    navigate("/dashboard")
  } catch (error) {

    console.log(error)
  }
}


  const handleSubmit = (e) => {
    e.preventDefault()
    fetchLogin()
  }
  return (
    <div className='bg-gray-200 h-screen flex items-center justify-center '>
      <form onSubmit={handleSubmit} className='flex flex-col bg-white items-center justify-center p-10 rounded-3xl space-y-2'>
        <h1 className='text-5xl font-semibold mb-10'>Login</h1>
        <label htmlFor="email">
          Email
        </label>
        <input type="email" id='email' className='border px-1 rounded' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className='border px-1 rounded' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='px-3 py-1 bg-green-600 text-white rounded-lg mt-5'>Login</button>
      </form>
    </div>
  )}

export default Login