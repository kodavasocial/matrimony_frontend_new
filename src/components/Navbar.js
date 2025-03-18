import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "../Utils/LocalStorage";
import { BsFillChatRightDotsFill, BsPersonCircle } from "react-icons/bs"
import { useDispatch } from "react-redux";
import { getAllNotification } from "../Redux/Actions/ProfileActions";
import Notification from "../Pages/Notification";
import Search from "./Search";
import { Api } from "../Utils/ApiUrl";

const Navbar = ({ auth }) => {
  const [unreadMsgs, setUnreadMsgs] = useState('');

  const { pathname } = useLocation()

  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    removeLocalStorage('access_token')
    removeLocalStorage('refresh_token')
    removeLocalStorage('user_id')
    window.location.href = "/login"
  }
  const getUnreadMsgs = async()=>{
    let user_id = localStorage.getItem('user_id');
    if (user_id){
      let options = {
        method: 'GET',
      };
      let response = await fetch(Api.createChatRoom + `?user_id=${user_id}`, options);
      let result = await response.json();
      if (result.status){
        setUnreadMsgs(result.total_msgs);
      }
      else{
        setUnreadMsgs('');
      }
    }
  }
  getUnreadMsgs();


  return (

    <header className="main-header header-style-two" >

      <div className="main-box" >
        <div className="auto-container clearfix" >
          <div className="logo-box" onClick={() => navigate("/")}>
            <div class="logo"><img src="/assets/images/mainlogo.png" /> </div>
          </div>
          <div className="nav-outer clearfix">
            {/* <div className="mobileapp_Icon1">
              <a href="" target="_blank"><img src="images/app-ic.png" /></a>
            </div> */}
            {/* <div className="mobile-nav-toggler"><span className="icon flaticon-menu"></span></div> */}
            <nav className="main-menu navbar-expand-md navbar-light">
              {/* <div className="navbar-header">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="icon flaticon-menu-button"></span>
                </button>
              </div> */}
              <div className="collapse navbar-collapse clearfix" id="navbarSupportedContent">
                <ul className="navigation clearfix">
                  <li className={`${pathname === "/" ? 'current' : ""} dropdown`}><Link to="/">Home</Link></li>
                  <li className={`${pathname === "/about" ? 'current' : ""} dropdown`}><Link to="/about">About</Link>
                  </li>
                  <li className={`${pathname === "/membership" ? 'current' : ""} dropdown`}><Link to="/membership">Membership</Link></li>
                  <li className={`${pathname === "/contact-us" ? 'current' : ""} dropdown`}><Link to="/contact-us">Contact</Link></li>
                  <li className={`${pathname === "/all-notification" ? 'current' : ""} dropdown`}><Link to="/chat"><i class="fa fa-envelope" aria-hidden="true">
                  <div class="badge" id="unread_msgs">{unreadMsgs ? unreadMsgs : ''}</div>
                    </i></Link></li>
                  <li className="dropdown"><Notification /></li>
                  <li className={`${pathname === "/profile" ? 'current' : ""} dropdown`}>
                   
                    <Link to="/profile" style={{ fontSize: '20px' }}><BsPersonCircle /></Link>
                    </li>
                </ul>
              </div>
            </nav>
            <div className="outer-box">
              <Search />
              {!auth ?
                <> <div className="btn-box">
                  <Link to="/login" className="btn btn-primary"><span>Login</span></Link>
                </div>
                  <div className="btn-box">
                    <Link to="/signup" className="btn btn-primary"><span>SignUp</span></Link>
                  </div></> :
                <div className="btn-box" onClick={(e) => handleLogout(e)}>
                  <a href="#" className="btn btn-primary"><span>Logout</span></a>
                </div>}
            </div>
          </div>
        </div>
      </div >
    </header >
  );
};

export default Navbar;
