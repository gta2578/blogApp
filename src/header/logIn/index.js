import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

import "./style.sass";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/v1/auth", {
        email: userName,
        password: password,
      })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="card">
      <form className="formSignin" onSubmit={postLogin}>
        <input
          className="inputSignin"
          type="username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="email"
          required={true}
        />
        <input
          className="inputSignin"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
          required={true}
        />
        <button className="buttonSignin">Sign In</button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
      {isError && <div>The username or password provided were incorrect!</div>}
    </div>
  );
}

export default Login;
