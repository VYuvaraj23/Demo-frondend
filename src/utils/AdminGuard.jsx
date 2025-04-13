import React from 'react'
import { Navigate } from 'react-router'
function AdminGuard({children}) {
    let token = sessionStorage.getItem('token')
    let role = sessionStorage.getItem('role')
  return <>
  {
    token && role === 'admin' ? children : <Navigate to='/'/>
    }</>
}

export default AdminGuard