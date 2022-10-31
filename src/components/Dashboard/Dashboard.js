import React from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../../util/useLocalState";

function Dashboard() {
  /* eslint-disable */
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div>
      <div>DASHboard component</div>
      <div>
        Our JWT token is <div>{jwt}</div>
      </div>
      <Link to="/login">Login pageee</Link>
      <Link to="/register">Login pageee</Link>
    </div>
  );
}

export default Dashboard;
