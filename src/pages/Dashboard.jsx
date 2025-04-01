import React from 'react'

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("user"))
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-semibold mb-5'>Profile</h1>
      <table className='border border-collapse'>
        <tbody>
          <tr>
            <th>FullName </th>
            <td> {user.fullName}</td>
          </tr>
          <tr>
            <th>Email  </th>
            <td> {user.email}</td>
          </tr>
          <tr>
            <th>Date of Birth  </th>
            <td> {user.dob.split("T")[0]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard