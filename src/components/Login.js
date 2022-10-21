import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <label>Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <div>{user}</div>
      <div>{password}</div>
    </div>
  );
}

export default Login;
