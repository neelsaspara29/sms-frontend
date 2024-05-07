import React from "react";
import menu_icon from "../../Assets/Images/menu_icon.png";
import { data } from "./sidebarData";
import { NavLink } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";

const Sidebar = () => {
  const sidebar_close = () => {
    document.body.classList.toggle("sidebar_small");
  };

  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_wrap">
        <div className="sidebar_block">
          <h3 className="navigation_title">
            {" "}
            <span onClick={sidebar_close}>
              <img src={menu_icon} />
            </span>{" "}
            <strong>NAVIGATION</strong>
          </h3>
          <ul className="sidebar_menu">
            {data?.map((nav) => (
              <li>
                <Tooltip
                  title={nav.name}
                  placement="left-start"
                  className="hello"
                >
                  <NavLink
                    to={`/${nav.route}`}
                    onClick={() => {
                      document.documentElement.classList.remove("cm_overflow");
                    }}
                  >
                    {" "}
                    <img src={nav.images} /> <strong>{nav.name}</strong>
                  </NavLink>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
