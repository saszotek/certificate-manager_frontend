import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const reqBody = {
    username: "pies",
    password: "1234",
  };

  fetch("api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(reqBody),
  })
    .then((response) => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      const authValue = headers.get("authorization");
      console.log(authValue);
      console.log(body);
    });

  return (
    <div>
      <div>Homeee</div>
      <Link to="/login">Login pageee</Link>
    </div>
  );
}

export default Home;
