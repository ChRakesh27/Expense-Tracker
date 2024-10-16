import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const API_URL = "/api/v1";
  // const API_URL = "http://localhost:3001/api/v1/";
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let token;
    try {
      if (isSignIn) {
        token = await axios.get(
          `${API_URL}/users/login?email=${userData.email}&password=${userData.password}`
        );
      } else {
        token = await axios.post(`${API_URL}/users/register`, userData);
      }
      if (token) {
        localStorage.setItem("authToken", JSON.stringify(token.data));
        navigate("/");
      }
    } catch (e) {
      console.log("error", e);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <div className="loading">
          <div className="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="login">
        <div className="form-box">
          <form className="form" onSubmit={onSubmit}>
            <span className="title">{isSignIn ? "Sign In" : "Sign up"}</span>
            <span className="subtitle">
              {isSignIn
                ? "Sign in to your account"
                : "Create a free account with your email."}
            </span>
            <div className="form-container">
              {!isSignIn && (
                <input
                  type="text"
                  className="input"
                  placeholder="User Name"
                  required
                  onChange={(e) => {
                    setUserData((val) => ({
                      ...val,
                      userName: e.target.value,
                    }));
                  }}
                />
              )}
              <input
                type="email"
                className="input"
                placeholder="Email"
                required
                onChange={(e) => {
                  setUserData((val) => ({ ...val, email: e.target.value }));
                }}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                required
                minLength={8}
                onChange={(e) => {
                  setUserData((val) => ({ ...val, password: e.target.value }));
                }}
              />
              <i>Password should be min 8 characters</i>
            </div>
            <button className="btn btn-primary signUp">
              {isSignIn ? "Sign In" : "Sign up"}
            </button>
          </form>
          <div className="form-section">
            <p>
              {!isSignIn ? "Have an account?" : "Create an account?"}
              <u
                onClick={() => {
                  setIsSignIn((val) => !val);
                }}
              >
                {!isSignIn ? "Sign In" : "Sign up"}
              </u>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
