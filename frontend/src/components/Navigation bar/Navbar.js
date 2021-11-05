import React, { useState } from "react"; //Rfce
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
function Navbar() {
  return (
    <>
      <nav className="nav-menu active">
        <h4 className="nav-text-Header">XT05B</h4>
        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <div>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
