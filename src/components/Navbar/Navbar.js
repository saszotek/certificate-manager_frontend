// TODO:
// handling hamburger menu on mobile

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../assets/icons/icons";
import "../../styles/navbar.scss";
import Button from "../Button/Button";

function Navbar() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="navbar-container">
      <NavLink
        className={({ isActive }) =>
          "navbar-container__navlink" +
          (isActive ? " navbar-container__navlink-active" : "")
        }
        to="/home"
      >
        <h1>Certy</h1>
      </NavLink>
      <div className="navbar-container__hamburger-menu">
        <FontAwesomeIcon icon={icons.faBars} />
      </div>
      <div className="navbar-container__list-menu">
        <NavLink
          className={({ isActive }) =>
            "navbar-container__navlink" +
            (isActive ? " navbar-container__navlink-active" : "")
          }
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "navbar-container__navlink" +
            (isActive ? " navbar-container__navlink-active" : "")
          }
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "navbar-container__navlink" +
            (isActive ? " navbar-container__navlink-active" : "")
          }
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "navbar-container__navlink" +
            (isActive ? " navbar-container__navlink-active" : "")
          }
          to="/login"
        >
          Log in
        </NavLink>
      </div>
      <div className="navbar-container__button">
        <Button onClick={handleSignUp} text="Sign up" />
      </div>
    </div>
  );
}

export default Navbar;
