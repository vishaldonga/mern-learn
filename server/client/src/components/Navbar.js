import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <div className="header">
          <div className="button">
            <NavLink to="/about">About Me</NavLink>
          </div>
          <div className="button">
            <NavLink to="/signout">Sign Out</NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="button">
            <NavLink to="/about">About Me</NavLink>
          </div>
          <div className="button">
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
          <div className="button">
            <NavLink to="/signin">Sign In</NavLink>
          </div>
        </div>
      );
    }
  };
  return <RenderMenu />;
};

export default Navbar;
