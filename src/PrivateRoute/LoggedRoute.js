import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import fetchService from "../services/fetchService";
import { useLocalState } from "../util/useLocalState";

const LoggedRoute = ({ children }) => {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    fetchService(`/api/auth/validate?token=${jwt}`, "get", jwt).then(
      (response) => {
        if (response.id !== null) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
        setIsLoading(false);
      }
    );
  } else {
    return children;
  }

  return isLoading ? (
    <Loader />
  ) : isValid === true ? (
    <Navigate to={"/home"} />
  ) : (
    children
  );
};

export default LoggedRoute;
