import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Book from '../pages/Book'
import Category from '../pages/Category'
import Dashboard from '../pages/Dashboard'
import User from '../pages/User'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/books' element={<Book />} />
        <Route path='/users' element={<User />} />
        <Route path='/categories' element={<Category />} />
      </Routes>
    </div>
  )
}

export default Routers