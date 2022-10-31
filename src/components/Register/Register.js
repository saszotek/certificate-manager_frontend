import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendRegisterRequest = () => {
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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Register Page</h1>
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
          <button type="submit" id="submit" onClick={sendRegisterRequest}>
            Send
          </button>
        </form>
      </div>
      <div>{username}</div>
      <div>{password}</div>
    </div>
  );
}

export default Register;
