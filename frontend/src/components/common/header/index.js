import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import "./header.css";
import { FRONT_PAGE_PATH } from "../../../constants/paths";
import CustomLink from "../links/custom-link";
import {BsBell} from "react-icons/bs"
import {BiSearchAlt} from "react-icons/bi"

const Header = (props) => {
  return <div className="header">
    <div className="title-icon-container">
      <div className="title-container">Ticket</div>
      <div className="icon-container">
        <BiSearchAlt size="25"/>
        &ensp;
        <BsBell size="25"/>
      </div>
    </div>
    <div className="profile-container">
      <p>Trung</p>
      <img className="profile-avatar" src="https://scontent.fdad8-1.fna.fbcdn.net/v/t1.6435-9/120235410_1238559176485707_6637949935409294661_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lImIJAvoF-kAX9zyJ2w&_nc_ht=scontent.fdad8-1.fna&oh=1d884ac166c6cdd067fc936e7030f209&oe=61A7BAB4" alt="avatar"/>
    </div>
  </div>;
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

Header.defaultProps = {
  isLoggedIn: false,
  logOut: noop,
};

export default Header;
