import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  type = "button",
  path = "",
  buttonText,
  onClick,
  loading,
  iconClass,
}) => {
  if (type === "link") {
    return (
      <Link
        to={path}
        className={`inline-block relative px-5 py-2 text-sm font-medium
          transition duration-150 ease-in-out bg-bb-purple border hover:shadow-md
          border-transparent group hover:bg-purple-600 focus:outline-none leading-5
          text-white`}
      >
        {iconClass ? (
          <i className={`${iconClass} text-2xl pr-1 align-middle`}></i>
        ) : (
          ""
        )}
        {buttonText}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className="relative flex justify-center w-full px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
        ease-in-out bg-bb-purple border border-transparent rounded-md
        group hover:bg-opacity-90 focus:outline-none"
    >
      {iconClass ? <i className={`${iconClass} pr-1`}></i> : ""}
      {loading ? "Loading..." : buttonText}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  path: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  iconClass: PropTypes.string,
};

export default Button;
