import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/auth";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Header from "./header";
import Modal from "./modalWindow";

import "./App.sass";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const initModalstate = {
    isOpen: false,
    text: "",
    action: null,
  };

  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [check, setCheck] = useState("");
  const [authUser, setAuthUser] = useState([]);
  const [isModal, setIsModal] = useState(initModalstate);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${authTokens.token}` },
    };
    axios
      .get("http://localhost:3001/api/v1/auth/user", config)
      .then((res) => {
        if (res.status === 200) {
          setAuthUser(res.data);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((e) => {
        setError(true);
      });
  }, [authTokens.token]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens: setTokens,
        authUser,
        error,
        users,
        check,
        setCheck,
        isModal,
        setIsModal,
      }}
    >
      <div className="App">
        <div className="appHeader">
          <div className="headerContainer">
            <ul className="mainMenu">
              <li>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/users">
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/posts">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/services">
                  Services
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="linkBlock">
            <NavLink className="signup" exact to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="signin" exact to="/signin">
              Sign In
            </NavLink>
          </div>
        </div>

        <Modal />

        <Header />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
