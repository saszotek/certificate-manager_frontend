// TODO:
// validation on form
// handle error messages with status codes

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const reqBody = {
      username: username,
      password: password,
    };

    if (!(password === passwordConfirm)) {
      console.log("passwords doesn't match!");
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
      });
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <h1>Sign up</h1>
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
          <Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            label="Password confirmation"
          />
          <div className="login-container__button-box">
            <Button type="submit" id="submit" text="Sign up" />
            <Button
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
