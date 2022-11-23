import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.scss";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import { useLocalState } from "../../util/useLocalState";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../../state/actions";

function Dashboard() {
  /* eslint-disable */
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const isLogged = useSelector((state) => state.loggedReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(verifyToken(jwt));
    }

    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-container">
          <div className="dashboard-container__wrapper">
            <div className="dashboard-container__wrapper__title-box">
              <h1>
                {isLogged
                  ? "What would you like to do?"
                  : "Log in or create an account first"}
              </h1>
            </div>
            <div className="dashboard-container__wrapper__button-box">
              <Button
                onClick={() => navigate("/login")}
                text="Log in"
                color="true"
              />
            </div>
            <div className="dashboard-container__wrapper__button-box">
              <Button
                onClick={() => navigate("/register")}
                text="Sign up"
                color="true"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
