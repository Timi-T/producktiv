import { MdOutlineVideocam } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import './Sidemenu.css'

export const Sidemenu = (props) => {
  const menuItems = [
    {
      path:"/videos",
      name:"videos",
      icon: <MdOutlineVideocam/>
    },
    {
      path:"/courses",
      name:"courses",
      icon: <MdOutlineVideocam/>
    }
  ]

  return (
    <div className="container">
    <div className="sidemenu-container">
      <div className="sidemenu">
        <div className="sidemenu-heading">
          <h1>PRODUCTIV</h1>
          <a onClick={() => props.logOut()} >logout</a>
        </div>
        <div className="menu-items">
          {
          menuItems.map((item, index) => {
            return <NavLink to={item.path} key={index} className="item-link">
              <div className="item-icon">{item.icon}</div>
              <div className="item-text">{item.name}</div>
            </NavLink>
          })
        }

        </div>
      </div>
    </div>
    <main>{props.children}</main>
    </div>
  )
}