import React from 'react'
import { Link } from 'react-router-dom';
export default function SidebarItem({ link, icon, text , active }) {
    return (
        <Link to={link} className={`nav_link ${active}`}>
           <i className={`${icon } nav_icon`}></i>
           <span className="nav_name">{text}</span>
        </Link>
    )
}
