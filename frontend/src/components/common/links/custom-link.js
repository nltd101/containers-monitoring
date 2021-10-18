import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import "./custom-link.css";

const CustomLink = ({ to, className, ...rest }) => {
  const history = useHistory();
  const handleClick = (event) => {
    event.stopPropagation();
    history.push(to);
  };

  return <div className={className} onClick={handleClick} {...rest} />;
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CustomLink;
