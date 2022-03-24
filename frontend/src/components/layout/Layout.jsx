import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Routers from '../Routers'
import './layout.css'
import TopNav from '../topnav/TopNav'

const Layout = () => {
  return (
    <Router>
      <div className='layout'>
        <Sidebar />
        <div className='layout__content'>
          <TopNav />
          <div className="layout__content-main">
            <Routers />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Layout