import React from 'react';
import { ImBooks, ImBook, ImFolderPlus, ImExit } from "react-icons/im";
import { NavLink } from 'react-router-dom'
import './Sidemenu.css';
import { AppContext } from '../App/AppContext';


export const Sidemenu = (props) => {
  const data = React.useContext(AppContext)
  const menuItems = [
    {
      path:"/videos",
      name:"All Courses",
      icon: <ImBook/>
    },
    {
      path:"/courses",
      name:"My Courses",
      icon: <ImBooks/>
    },
    {
      path:"/add-course",
      name:"Add Course",
      icon: <ImFolderPlus/>
    }
  ]

  return (
    <div className="container">
    <div className="sidemenu-container">
      <div className="sidemenu-box">
        <div className="sidemenu">
          <div className="sidemenu-heading">
            <h1>PRODUCTIV </h1>
            <div className="user-details">
              <p style={{color: "white"}}>Welcome, {data.user.username}!</p>
              {/* <a onClick={() => props.logOut()}>logout</a> */}
            </div>
          </div>
          <div className="menu-items">
            {
            menuItems.map((item, index) => {
              return <NavLink to={item.path} key={index} className="item-link">
                <div className="item-icon">{item.icon}</div>
                <div className="item-text"><p>{item.name}</p></div>
              </NavLink>
            })
          }

          </div>
          <div className="logout">
          <div className="logout-icon"><ImExit/></div>
          <a  onClick={() => props.logOut()}>Logout</a>
          </div>
        </div>
      </div>
    </div>
    <main>{props.children}</main>
    </div>
  )
}