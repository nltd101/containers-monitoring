import React from "react";
import PropTypes from "prop-types";

import "./footer.css";
import { FRONT_PAGE_PATH } from "../../../constants/paths";
import CustomLink from "../links/custom-link";

const Footer = (props) => {
  const { isLoggedIn, logOut } = props;

  return (
    <div className="footer">
      <div className="header"></div>
    </div>
  );
};

Footer.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

Footer.defaultProps = {
  isLoggedIn: false,
};

export default Footer;
