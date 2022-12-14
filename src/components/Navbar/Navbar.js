import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../assets/icons/icons";
import "../../styles/navbar.scss";
import { useLocalState } from "../../util/useLocalState";
import ButtonOne from "../Button/ButtonOne";
import { useSelector, useDispatch } from "react-redux";
import {
  validateJwt,
  isLogged,
  statusLogged,
} from "../../redux/slices/validateTokenSlice";

function Navbar() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const isLoggedLocal = useSelector(isLogged);
  const statusLoggedLocal = useSelector(statusLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (statusLoggedLocal === "idle") {
      dispatch(validateJwt(jwt));
    }
  }, [statusLoggedLocal, dispatch, jwt]);

  const handleLogout = () => {
    setJwt("");
    window.location.reload();
    navigate("/home");
  };

  return (
    <>
      {statusLoggedLocal === "loading" || statusLoggedLocal === "idle" ? (
        ""
      ) : (
        <div className="navbar-container">
          <NavLink className="navbar-container__navlink" to="/home">
            <h1>Certy</h1>
          </NavLink>
          <div className="navbar-container__hamburger-menu">
            <FontAwesomeIcon icon={icons.faBars} />
          </div>
          <div className="navbar-container__links-box">
            {isLoggedLocal ? (
              <div className="navbar-container__links-box__list-menu">
                <NavLink
                  className={({ isActive }) =>
                    "navbar-container__navlink" +
                    (isActive ? " navbar-container__navlink-active" : "")
                  }
                  to="/profile"
                >
                  My profile
                </NavLink>
              </div>
            ) : (
              <div className="navbar-container__links-box__list-menu">
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
            )}
            <div className="navbar-container__links-box__button">
              {isLoggedLocal ? (
                <ButtonOne onClick={handleLogout} text="Log out" />
              ) : (
                <ButtonOne
                  onClick={() => navigate("/register")}
                  text="Sign up"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
