import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          Password: password,
        }),
      });

      const data = await res.json();

      if (data.Message == "User Not Exists") {
        alert(data.Message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.User));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/mainpage");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("Error:", err);
      alert("Server error, try again later");
    }
  };

  return (
    <div className="loginpage">
      <form onSubmit={handlelogin}>
        <div className="loginbox">
          <div className="loginbox1">
            <h1
              style={{ marginLeft: "40px", color: "orange", marginTop: "20px" }}
            >
              Login
            </h1>
            <div class="input-container">
              <input
                value={username}
                placeholder="Enter Username"
                class="input-field"
                type="text"
                onChange={(res) => {
                  setUsername(res.target.value);
                }}
                required
              />
              <label for="input-field" class="input-label">
                Enter Username
              </label>
              <span class="input-highlight"></span>
            </div>
            <div class="input-container">
              <input
                value={password}
                placeholder="Enter Password"
                class="input-field"
                type="password"
                onChange={(res) => {
                  setPassword(res.target.value);
                }}
                required
              />
              <label for="input-field" class="input-label">
                Enter Password
              </label>
              <span class="input-highlight"></span>
            </div>
          </div>
          <div className="loginbox2">
            <button type="submit">
              <span>ENTER</span>
            </button>
            <h3>
              Don't have an account <Link to="/register">Register</Link>
            </h3>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
