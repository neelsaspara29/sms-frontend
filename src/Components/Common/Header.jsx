import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import logout_img from "../../Assets/Images/logout_img.png";

import sidebar_icon from "../../Assets/Images/sidebar_icon.png";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Store/Reducers/Authreducer/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [active, setActive] = useState();
  const dispatch = useDispatch();
  const toggleClass = () => {
    setActive(!active);
    document.documentElement.classList.toggle("cm_overflow");
  };

  const close_sidebar = () => {
    document.documentElement.classList.remove("cm_overflow");
  };

  const handleLogOut = () => {
    dispatch(setLogout());
    toast.success("Logout Success");
  };

  return (
    <div className="header_wrapper">
      <div className="body_layer" onClick={close_sidebar}></div>
      <div className={`header_wrap ${active ? "menu_open" : ""}`}>
        <Container>
          <div className="header_block">
            <div className="logo_block">
              <div className="logo_sec">
                <NavLink to="/">
                  {/* <img src={logo} alt="logo" /> */}
                  <p className="header_text">School Management System</p>
                </NavLink>
              </div>
              <div className="menu_block" onClick={toggleClass}>
                <img src={sidebar_icon} />
              </div>
            </div>
            <div className="header_sec">
              <div className="header_profile_block">
                <div className="header_logout">
                  <a href="#0" onClick={handleLogOut}>
                    <img src={logout_img} />
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
