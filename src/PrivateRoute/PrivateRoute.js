import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalState";

export const PrivateRoute = ({ children }) => {
  /* eslint-disable */
  const [jwt, setJwt] = useLocalState("", "jwt");

  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
