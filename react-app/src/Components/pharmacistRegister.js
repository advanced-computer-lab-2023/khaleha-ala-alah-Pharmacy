import React, { useState } from "react";
import { message } from "antd";
import axios from "axios";


 const PharmacistRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");

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
      !educationalBackground 
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
    };
    await axios
      .post("http://localhost:4000/users/register", data, {
        headers: {
          role: "pharmacist",
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

export default PharmacistRegister;