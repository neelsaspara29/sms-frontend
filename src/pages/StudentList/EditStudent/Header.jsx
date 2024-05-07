import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import logo from "../../../Assets/Images/logo.png";
import header_profile from "../../../Assets/Images/header_profile.png";
import bottom_arrow from "../../../Assets/Images/bottom_arrow.png";
import logout_img from "../../../Assets/Images/logout_img.png";

import sidebar_icon from "../../../Assets/Images/sidebar_icon.png";

import { NavLink } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState();
  const toggleClass = () => {
    setActive(!active);
    document.documentElement.classList.toggle("cm_overflow");
  };

  return (
    <div className="header_wrapper">
      <div className={`header_wrap ${active ? "menu_open" : ""}`}>
        <Container>
          <div className="header_block">
            <div className="logo_block">
              <div className="logo_sec">
                <NavLink to="/">
                  <img src={logo} alt="logo" />
                </NavLink>
              </div>
              <div className="menu_block" onClick={toggleClass}>
                <img src={sidebar_icon} />
              </div>
            </div>
            <div className="header_sec">
              <div className="header_profile_block">
                <div className="header_profile">
                  <div className="header_profile_img">
                    <img className="profile_img" src={header_profile} />
                    <p>Profile</p>
                  </div>
                </div>
                <div className="header_logout">
                  <a href="#0">
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
