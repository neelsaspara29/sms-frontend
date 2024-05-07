import React from "react";

import menu_icon from "../../../Assets/Images/menu_icon.png";
import bottom_arrow from "../../../Assets/Images/bottom_arrow.png";

const Sidebar = () => {
  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_wrap">
        <div className="sidebar_block">
          <h3 className="navigation_title">
            {" "}
            <span>
              <img src={menu_icon} />
            </span>{" "}
            NAVIGATION
          </h3>
          <ul className="sidebar_menu">
            {/* <li><a href="#0">Dashboard <span><img src={bottom_arrow} /></span> </a></li> */}
            <li>
              <a href="#0">Student </a>
            </li>
            <li>
              <a href="#0">Standard </a>
            </li>
            <li>
              <a href="#0">Enquiry </a>
            </li>
            <li>
              <a href="#0">Fees </a>
            </li>
            <li>
              <a href="#0">Group Head </a>
            </li>
            <li>
              <a href="#0">Faculty </a>
            </li>
            <li>
              <a href="#0">Timetable </a>
            </li>
            <li>
              <a href="#0">Exam </a>
            </li>
            <li>
              <a href="#0">Result </a>
            </li>
            <li>
              <a href="#0">Notification </a>
            </li>
            <li>
              <a href="#0">Canteen </a>
            </li>
            <li>
              <a href="#0">Transportation (Bus) </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
