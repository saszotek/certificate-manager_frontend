import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.scss";
import ButtonOne from "../Button/ButtonOne";
import Input from "../Input/Input";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import * as yup from "yup";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let schema = yup.object().shape({
    username: yup
      .string()
      .email("Email must be a valid email.")
      .required("Email field is required."),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters long.")
      .required("Password field is required."),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reqBody = {
      username: email,
      password: password,
    };

    try {
      await schema.validate(reqBody);
    } catch (error) {
      console.log(error.errors);
      setErrorMessage(error.errors);
      return false;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords should match.");
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
        setErrorMessage("Email is already taken.");
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
            id="email"
            value={email}
            onChange={setEmail}
            label="Email"
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
