import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import fetchService from "../services/fetchService";
import { useLocalState } from "../util/useLocalState";

export const PrivateRoute = ({ children }) => {
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
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <Loader />
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
