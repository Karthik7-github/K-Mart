import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API;

const register = () => {
  const [username, setUsername] = useState("");
  const [mobileno, setMobileno] = useState(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlecart = async () => {
    try {
      const res = await fetch(`${API}/api/user/create-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          Products: [],
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlepayment = async () => {
    try {
      const res = await fetch(`${API}/api/user/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          Payments: [],
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleregister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/user/resgister-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          MobileNo: mobileno,
          Password: password,
        }),
      });

      const data = await res.json();

      if (
        data.Message == "Username Already Exists" ||
        data.Message == "Mobile No Already Exists"
      ) {
        alert(data.Message || "Registration failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      alert("Account Created");
      handlecart();
      handlepayment();
      navigate("/login");
    } catch (err) {
      console.log("Error:", err);
      alert("Server error, try again later");
    }
  };

  return (
    <div className="loginpage1">
      <form onSubmit={handleregister}>
        <div className="loginbox3">
          <div className="loginbox4">
            <h1
              style={{
                marginLeft: "40px",
                marginTop: "20px",
              }}
            >
              Register
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
                value={mobileno}
                placeholder="Enter Mobile No"
                class="input-field"
                type="text"
                onChange={(res) => {
                  setMobileno(res.target.value);
                }}
                required
              />
              <label for="input-field" class="input-label">
                Enter Mobile No
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
          <div className="loginbox5">
            <button type="submit">
              <span>REGISTER</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default register;
