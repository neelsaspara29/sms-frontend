import React from "react";
import { Link } from "react-router-dom";

const Cm_header = () => {
  return (
    <div className="cm_header_wrapper">
      <div className="cm_header_wrap">
        <div className="cm_header_block">
          <div className="cm_header_menu">
            <ul className="cm_header_item">
              <li>
                <Link to={"/standard"} className="active">
                  Home
                </Link>
              </li>
              <span>/</span>
              <li>
                <a href="#0">Standard</a>
              </li>
            </ul>
          </div>
          <div className="cm_header_title">
            <h3>Standard</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cm_header;
