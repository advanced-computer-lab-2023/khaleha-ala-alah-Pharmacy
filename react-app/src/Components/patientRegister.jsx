import React from "react";
import { message } from "antd";
import { useState } from "react";
import axios from "axios";
import './patientregister.css'

 const PatientRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !dateOfBirth ||
      !gender ||
      !mobileNumber ||
      !emergencyName ||
      !emergencyNumber
    ) {
      message.error("Please fill all the fields");
      return;
    }
    const data = {
      username: username,
      password: password,
      email: email,
      name: name,
      dateOfBirth: dateOfBirth,
      gender: gender,
      mobileNumber: mobileNumber,
      emergencyName: emergencyName,
      emergencyNumber: emergencyNumber,
    };
    await axios
      .post("http://localhost:4000/users/register", data, {
        headers: {
          role: "patient",
        },
      })
      .then(async (res) => {
        const token = res.data.token;
        await localStorage.setItem("token", token);
        message.success("Registration Successful");
      })
      .catch((err) => {
        console.log(err);
        message.error("Registration Failed");
      });
  };

  return (
    <div className="register">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@email.com"
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number"
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="*****"
                />
              </div>
              <div className="input-box">
                <span className="details">Date Of Birth</span>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span htmlFor="gender" className="details">
                  Gender
                </span>
                <select
                  name="gender"
                  id="gender"
                  className="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="title2">Emergency Contact</div>
            <div className="user-details">
              <div className="input-box">
                <span htmlFor="fullnameEC" className="details">
                  Full Name
                </span>
                <input
                  type="text"
                  name="emergencyName"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="input-box">
                <span htmlFor="phoneNrEC" className="details">
                  Phone Number
                </span>
                <input
                  type="text"
                  name="emergencyNumber"
                  value={emergencyNumber}
                  onChange={(e) => setEmergencyNumber(e.target.value)}
                  placeholder="Mobile Number"
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;

