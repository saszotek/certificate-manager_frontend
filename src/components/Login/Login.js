// TODO:
// redirect to /home after successful log in
// handle error messages with status codes

import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../../util/useLocalState";
import "../../styles/login.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

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

    axios
      .post("api/auth/login", reqBody)
      .then((response) => {
        setJwt(response.headers.get("authorization"));
        console.log(`Login success! Status: ${response.status}`);
        // if (jwt !== "") {
        //   navigate("/home");
        // }
      })
      .catch((error) => {
        console.log(`Login failed! Status: ${error.response.status}`);
      });
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <h1>Log in</h1>
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
            <Button type="submit" id="submit" text="Log in" />
            <Button
              type="button"
              id="register"
              text="Sign up"
              onClick={() => navigate("/register")}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
