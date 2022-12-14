import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.scss";
import ButtonOne from "../Button/ButtonOne";
import Input from "../Input/Input";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const reqBody = {
      username: username,
      password: password,
    };

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords should match!");
      return false;
    }

    axios
      .post("api/auth/register", reqBody)
      .then((response) => {
        if (response.status === 201) {
          console.log(`Registration successful ${response.status}`);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(`Registration failed! Status: ${error.response.status}`);
        setErrorMessage("Username is already taken!");
      });
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <h1>Sign up</h1>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <Input
            type="text"
            id="username"
            value={username}
            onChange={setUsername}
            label="Username"
            minLength="4"
          />
          <Input
            type="password"
            id="password"
            value={password}
            onChange={setPassword}
            label="Password"
            minLength="4"
          />
          <Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            label="Password confirmation"
            minLength="4"
          />
          <div className="login-container__button-box">
            <ButtonOne type="submit" id="submit" text="Sign up" />
            <ButtonOne
              type="button"
              id="login"
              text="Log in"
              onClick={() => navigate("/login")}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
