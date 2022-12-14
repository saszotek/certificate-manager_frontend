import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.scss";
import ButtonOne from "../Button/ButtonOne";
import { useLocalState } from "../../util/useLocalState";
import { useSelector, useDispatch } from "react-redux";
import {
  validateJwt,
  isLogged,
  statusLogged,
} from "../../redux/slices/validateTokenSlice";
import { fetchPersonDetails } from "../../redux/slices/fetchPersonDetailsSlice";
import Loader from "../Loader/Loader";

function Dashboard() {
  // eslint-disable-next-line
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

  useEffect(() => {
    if (jwt) {
      dispatch(fetchPersonDetails({ jwt: jwt, userId: 1 }));
    }
  }, [dispatch, jwt]);

  return (
    <>
      {statusLoggedLocal === "loading" || statusLoggedLocal === "idle" ? (
        <Loader />
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
                <ButtonOne
                  onClick={() =>
                    navigate("/profile", { state: { subpage: "personal" } })
                  }
                  text="Personal datails"
                  color="true"
                />
              ) : (
                <ButtonOne
                  onClick={() => navigate("/login")}
                  text="Log in"
                  color="true"
                />
              )}
            </div>
            <div className="dashboard-container__wrapper__button-box">
              {isLoggedLocal ? (
                <ButtonOne
                  onClick={() =>
                    navigate("/profile", { state: { subpage: "certificate" } })
                  }
                  text="Certificate"
                  color="true"
                />
              ) : (
                <ButtonOne
                  onClick={() => navigate("/register")}
                  text="Sign up"
                  color="true"
                />
              )}
            </div>
            {isLoggedLocal ? (
              <div className="dashboard-container__wrapper__button-box">
                <ButtonOne
                  onClick={() =>
                    navigate("/profile", { state: { subpage: "payment" } })
                  }
                  text="Payment"
                  color="true"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
