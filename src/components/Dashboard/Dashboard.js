import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.scss";
import Button from "../Button/Button";
import { useLocalState } from "../../util/useLocalState";
import { useSelector, useDispatch } from "react-redux";
import {
  validateJwt,
  isLogged,
  statusLogged,
} from "../../redux/slices/validateTokenSlice";

function Dashboard() {
  /* eslint-disable */
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const isLoggedLocal = useSelector(isLogged);
  const statusLoggedLocal = useSelector(statusLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (statusLoggedLocal === "idle") {
      dispatch(validateJwt(jwt));
    }

    setIsLoading(false);
  }, [statusLoggedLocal, dispatch]);

  return (
    <>
      {isLoading &&
      (statusLoggedLocal === "loading" || statusLoggedLocal === "idle") ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-container">
          <div className="dashboard-container__wrapper">
            <div className="dashboard-container__wrapper__title-box">
              <h1>
                {isLoggedLocal
                  ? "What would you like to do?"
                  : "Log in or create an account first"}
              </h1>
            </div>
            <div className="dashboard-container__wrapper__button-box">
              {isLoggedLocal ? (
                <Button
                  onClick={() => navigate("/home")}
                  text="Placeholder 1"
                  color="true"
                />
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  text="Log in"
                  color="true"
                />
              )}
            </div>
            <div className="dashboard-container__wrapper__button-box">
              {isLoggedLocal ? (
                <Button
                  onClick={() => navigate("/home")}
                  text="Placeholder 2"
                  color="true"
                />
              ) : (
                <Button
                  onClick={() => navigate("/register")}
                  text="Sign up"
                  color="true"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
