import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const reqBody = {
      username: username,
      password: password,
    };

    fetch("api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    });
  };

  return (
    <div className="login-container">
      <h1>Register Page</h1>
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
          <Button type="submit" id="submit" text="Sign up" />
          <Button
            type="button"
            id="login"
            text="Sign in"
            onClick={() => navigate("/login")}
          />
        </div>
      </form>
    </div>
  );
}

export default Register;
