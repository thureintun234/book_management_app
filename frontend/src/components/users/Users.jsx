import React, { useEffect, useState } from 'react'
import userService from '../../services/user'

import './users.css'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(returnedObject => setUsers(returnedObject))
  }, [])

  return (
    <div>
      <table className='table bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? '🟢' : '🔴'}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users