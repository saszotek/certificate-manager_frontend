import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../../util/useLocalState";

function Dashboard() {
  /* eslint-disable */
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "pies",
  //       password: "1234",
  //     };

  //     fetch("api/auth/login", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify(reqBody),
  //     })
  //       .then((response) => Promise.all([response.json(), response.headers]))
  //       .then(([body, headers]) => {
  //         setJwt(headers.get("authorization"));
  //       });
  //   }
  // }, [jwt, setJwt]);

  useEffect(() => {
    console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
    <div>
      <div>DASHboard component</div>
      <div>
        Our JWT token is <div>{jwt}</div>
      </div>
      <Link to="/login">Login pageee</Link>
    </div>
  );
}

export default Dashboard;
