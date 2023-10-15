import React, { useState } from "react";
import { message } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./patientRegister.css";

export const DoctorRegister = () => {
  const { role } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedhour, setSelectedhour] = useState("");
  const [fixedSlots, setFixedSlots] = useState([]);
  const navigate = useNavigate();


  const handleAddSlot = () => {
    if (!selectedDay || !selectedhour) {
      message.error("Please select a day and hour for the slot");
      return;
    }
    const newSlot = { day: selectedDay, hour: selectedhour };
    setFixedSlots([...fixedSlots, newSlot]);
    setSelectedDay("");
    setSelectedhour("");
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = [...fixedSlots];
    updatedSlots.splice(index, 1);
    setFixedSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !birthdate ||
      !hourlyRate ||
      !affiliation ||
      !speciality ||
      !educationalBackground ||
      fixedSlots.length === 0
    ) {
      message.error("Please fill all the fields and add at least one slot");
      return;
    }
    const data = {
      username: username,
      password: password,
      email: email,
      name: name,
      birthdate: birthdate,
      hourlyRate: hourlyRate,
      affiliation: affiliation,
      speciality: speciality,
      educationalBackground: educationalBackground,
      fixedSlots: fixedSlots,
    };
    await axios
      .post("http://localhost:4000/users/register", data, {
        headers: {
          role: "doctor",
        },
      })
      .then(async (res) => {
        const token = res.data.token;
        await localStorage.setItem("token", token);
        message.success("Registration Successful");
        window.location.replace("/verifyUser");
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
                <span className="details">hourly rate</span>
                <input
                  type="text"
                  name="hourlyRate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="hourly rate"
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
                  name="birthdate"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="details">affiliation</span>
                <input
                  type="affiliation"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  name="affiliation"
                  placeholder="affiliation"
                />
              </div>
              <div className="input-box">
                <span className="details">speciality</span>
                <input
                  type="speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  name="speciality"
                  placeholder="speciality"
                />
              </div>
              <div className="input-box">
                <span className="details">educationalBackground</span>
                <input
                  type="educationalBackground"
                  value={educationalBackground}
                  onChange={(e) => setEducationalBackground(e.target.value)}
                  name="educationalBackground"
                  placeholder="educationalBackground"
                />
              </div>
              <div className="input-box">
                <label htmlFor="day" className="details">
                  Select Day
                </label>
                <select
                  id="day"
                  name="day"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="select"
                >
                  <option value="">Select day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  {/* Add more day options as needed */}
                </select>
              </div>
              <div className="input-box">
                <label htmlFor="hour" className="details">
                  Select hour
                </label>
                <select
                  id="hour"
                  name="hour"
                  value={selectedhour}
                  onChange={(e) => setSelectedhour(e.target.value)}
                  className="select"
                >
                  <option value="">Select hour</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  {/* Add more hour options as needed */}
                </select>
              </div>
              <div className="slot-buttons">
                <button
                  type="button"
                  className="add-slot-button"
                  onClick={handleAddSlot}
                >
                  Add Slot
                </button>
              </div>
              <div className="fixed-slots">
                {fixedSlots.map((slot, index) => (
                  <div key={index} className="fixed-slot">
                    <span>{slot.day} - {slot.hour}</span>
                    <button
                      type="button"
                      className="remove-slot-button"
                      onClick={() => handleRemoveSlot(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
        <Link to="/login">Already have an account</Link>
      </div>
    </div>
  );
};