import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import "./header.css";
import { FRONT_PAGE_PATH } from "../../../constants/paths";
import CustomLink from "../links/custom-link";

const Header = (props) => {
  return <div className="header">this is the header</div>;
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
