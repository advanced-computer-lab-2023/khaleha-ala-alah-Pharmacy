import { message } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./login.css";
import logoImage from "../Images/logo-home.png"; // Adjust the path accordingly

 const Login = () => {
  const {role} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);


  useEffect(() => {
    if (role) {
      switch (role) {
        case "patient":
          navigate("/patientHome");
          break;
        case "pharmacist":
          navigate("/pharmacistHome");
          break;
        case "admin":
          navigate("/adminHome");
          break;
        case "notVerified":
          navigate("/verifyUser");
          break;
        case "notApproved":
          navigate("/notApproved");
          break;
        default:
          navigate("/");
      }
    }
  }, [role, navigate]);

  useEffect(() => {
    // Use a setTimeout to set formVisible to true after 2 seconds
    const timeout = setTimeout(() => {
      setFormVisible(true);
    },800);
  
    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      message.error("Please fill all the fields");
      return;
    }
    const data = {
      username: username,
      password: password,
    };
    await axios
      .post("http://localhost:4000/users/login", data)
      .then(async (res) => {
        const token = res.data.token;
        const role = res.data.role;
        await localStorage.setItem("token", token);
        message.success("Login Successfull");
        if (role === "patient") {
          window.location.replace("/patientHome");
        } else if (role === "pharmacist") {
          window.location.replace("/pharmacistHome");
        } else if (role === "admin") {
          window.location.replace("/adminHome");
        }
      })
      .catch(async (err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "User not verified yet") {
          await localStorage.setItem("token", err.response.data.token);
          message.error("User not verified yet");
          window.location.replace("/verifyUser");
        } else if (err.response.data.error === "pharmacist not approved yet") {
          await localStorage.setItem("token", err.response.data.token);
          message.error("pharmacist not approved yet");
          window.location.replace("/notApproved");
        } else {
          message.error("Invalid Credentials");
        }
      });
  };
  return ( 
    <div className={`login ${formVisible ? "form-visible" : ""}`}>
      <div className="logo-container">
        <img
          src={logoImage}
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="Username"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*****"
          />
          <button type="submit">Login</button>
        </form>
        <div className="patientRegister">
          <Link to="/patientRegister">Register as a patient</Link>
        </div>
        <div className="doctorRegister">
          <Link to="/PharmacistRegister">Register as a pharmacist</Link>
        </div>
        <div className="forgotPassword">
          <Link to="/forgotPassword">Forgot Password</Link>
        </div>
      </div>
    </div>
);
};



export default Login;