import React, { useState } from "react";
import axios from "axios";
import { useLocalState } from "../../util/useLocalState";
import "../../styles/login.scss";
import Input from "../Input/Input";
import ButtonOne from "../Button/ButtonOne";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line
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
        setIsError(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(`Login failed! Status: ${error.response.status}`);
        if (error.response.status === 401) {
          setIsError(true);
        }
      });
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <h1>Log in</h1>
          {isError && (
            <ErrorMessage message="Username or password was incorrect. Please try again." />
          )}
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
            <ButtonOne type="submit" id="submit" text="Log in" />
            <ButtonOne
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
