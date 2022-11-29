import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import { useLocalState } from "../util/useLocalState";

const LoggedRoute = ({ children }) => {
  /* eslint-disable */
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    fetchService(`/api/auth/validate?token=${jwt}`, "get", jwt).then(
      (isValid) => {
        setIsValid(isValid);
        setIsLoading(false);
      }
    );
  } else {
    return children;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    <Navigate to={"/home"} />
  ) : (
    children
  );
};

export default LoggedRoute;
