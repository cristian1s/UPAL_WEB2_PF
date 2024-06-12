import React from 'react'
import SidebarItem from './SidebarItem';

export default function Sidebar() {
    const cerrarSession = () => {
        localStorage.removeItem('session');
        localStorage.removeItem('usuario');
    }
    const navItems = [
        {
            link:'/dashboard',
            icon:'bx bx-grid-alt',
            text:'Dashboard',
            active:'active'
        },
        {
            link:'/users',
            icon:'bx bx-user',
            text:'Users',
            active:''
        },
        {
            link:'/clientes',
            icon:'bx bxs-user-detail',
            text:'Clients',
            active:''
        },
        {
            link:'/productos',
            icon:'bx bx-laptop',
            text:'Products',
            active:''
        },
        {
            link:'/ventas',
            icon:'bx bx-cart-add',
            text:'Ventas',
            active:''
        }
    ];
  return (
    <nav className="nav">
        <div>
            <a href="#" className="nav_logo">
                <i className="bx bxs-cart nav_logo-icon"></i>
                <span className="nav_logo-name">BBBVentas</span>
            </a>
            <div className="nav_list">
                {
                    navItems.map(item => {
                        return (
                            <SidebarItem key={item.text} link={item.link} icon={item.icon} text={item.text} active={item.active} ></SidebarItem>
                        )
                    })
                }
            </div>
          </div>
          <a href="/login" className="nav_link" onClick={cerrarSession}>
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
        </a>
    </nav>
  ) 
}
