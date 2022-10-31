import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import { useLocalState } from "../util/useLocalState";

export const PrivateRoute = ({ children }) => {
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
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
