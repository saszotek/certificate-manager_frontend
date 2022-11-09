import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalState";
import "../../styles/login.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* eslint-disable */
  const [jwt, setJwt] = useLocalState("", "jwt");

  const handleSubmit = (event) => {
    event.preventDefault();

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
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={setUsername}
          label="Username"
        />
        <Input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          label="Password"
        />

        <div className="login-container__button-box">
          <Button type="submit" id="submit" text="Sign in" />
          <Button
            type="button"
            id="register"
            text="Sign up"
            onClick={() => navigate("/register")}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
