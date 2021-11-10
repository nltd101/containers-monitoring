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
      <div className="title-container">{props.label}</div>
      <div className="icon-container">
        <BiSearchAlt size="25"/>
        &ensp;
        <BsBell size="25"/>
      </div>
    </div>
    <div className="profile-container">
      <p>David Le </p>
      <img className="profile-avatar" src="https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/33366469_525022044558964_5286142230615031808_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=BX2TF1Ml1YkAX-Aldnx&_nc_ht=scontent.fdad3-3.fna&oh=a29e775143bc6b5ff112097959524429&oe=61A978A8" alt="avatar"/>
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
