import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalState";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* eslint-disable */
  const [jwt, setJwt] = useLocalState("", "jwt");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendLoginRequest = () => {
    const reqBody = {
      username: username,
      password: password,
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
        setJwt(headers.get("authorization"));
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" id="submit" onClick={sendLoginRequest}>
            Send
          </button>
        </form>
      </div>
      <div>{username}</div>
      <div>{password}</div>
    </div>
  );
}

export default Login;
