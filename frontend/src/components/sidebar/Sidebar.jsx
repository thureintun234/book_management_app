import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/favicon.ico'
import sidebarItems from '../../assets/JsonData/sidebar_routes.json'

import './sidebar.css'

const SidebarItem = (props) => {

  return (
    <div >
      <div>
        <i className={props.icon}></i>
        <span>
          {props.title}
        </span>
      </div>
    </div>
  )
}

const Sidebar = () => {
  let activeItem = sidebarItems.findIndex(item => item.route === window.location.pathname)

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {
        sidebarItems.map((item, index) => {
          return (
            <div className='sidebar__item' key={index}>
              <NavLink className={(navData) => navData.isActive ? `sidebar__item-inner active` : `sidebar__item-inner`} to={item.route} key={index}>
                <SidebarItem
                  title={item.display_name}
                  icon={item.icon}
                  active={index === activeItem}
                />
              </NavLink>
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar