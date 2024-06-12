import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { useState,useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";

const MainLayout = ({  children }) => {

    const [user, setUser] = useState('');

    useEffect(()=>{
        showNavbar();
        userSession();
    },[])

    const userSession = () => {
        const storedUsers = JSON.parse(localStorage.getItem('usuario'));
        console.log(storedUsers)
        setUser(storedUsers.user)
    }

  const showNavbar = ()=> {
    const toggle = document.getElementById('header-toggle');
    const nav = document.getElementById('nav-bar');
    const bodypd = document.getElementById('body-pd');
    const headerpd = document.getElementById('header');
    toggle.onclick = () => {
        nav.classList.toggle("show-a");
        toggle.classList.toggle("bx-x");
        bodypd.classList.toggle("body-pd");
        headerpd.classList.toggle("body-pd");
    }
    const linkColor = document.querySelectorAll(".nav_link");
    linkColor.forEach((l) => l.addEventListener("click", () => {
      linkColor.forEach((j) => j.classList.remove("active"));
      l.classList.add("active");
    }));
  }  


  return (
      <div id="body-pd">
        {/* Header layout */}
        <header className="header" id="header">
          <div className="header_toggle">
            <i className="bx bx-menu" id="header-toggle"></i>
          </div>
          <div className="header_img">
                  <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
                  <span>{ user}</span>
          </div>
        </header>
        {/* ------  */}
        {/* SideBar  */}
        <div className="l-navbar" id="nav-bar">
            <Sidebar></Sidebar>
        </div>
        {/* ------  */}
        {/* Content Aplication  */}
        <div className="content">
            <div className="row">
              <div className="col-sm-12">
                          {
                              children
                          }
              </div>
            </div>
        </div>
        {/* ------  */}
      </div>
  );
};
export default MainLayout;
