// PharmacistRegister.jsx

import React, { useState } from "react";
import { message } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './PharmacistRegister.css'; // Import your external CSS file if you have one

const PharmacistRegister = () => {
  const { role } = useAuth();
     const closeContract = () => {
    setShowContract(false);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
   const [agreedToContract, setAgreedToContract] = useState(false); 
  const [showContract, setShowContract] = useState(false);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (role) {
      switch (role) {
        case "patient":
          navigate("/patientHome");
          break;
        case "pharmacist":
          navigate("/PharmacistHome");
          break;
        case "admin":
          navigate("/adminHome");
          break;
        default:
          navigate("/");
      }
    }
  }, [role, navigate]);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles([...files]);
  };

  const handleSubmit = async (e) => {
    if (!agreedToContract) {
      message.error("Please agree to the contract before registering.");
      return;
    }
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

    const formData  = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("birthdate", birthdate);
    formData.append("hourlyRate", hourlyRate);
    formData.append("affiliation", affiliation);
    formData.append("speciality", speciality);
    formData.append("educationalBackground", educationalBackground);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    await axios
      .post("http://localhost:4002/users/register", formData, {
        headers: {
          role: "pharmacist",
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
    <div className="register-container">
      <div className="register-form">
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
                <span className="details">Hourly Rate</span>
                <input
                  type="text"
                  name="hourlyRate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Hourly Rate"
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
                <span className="details">Affiliation</span>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  name="affiliation"
                  placeholder="Affiliation"
                />
              </div>
              <div className="input-box">
                <span className="details">Speciality</span>
                <input
                  type="text"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  name="speciality"
                  placeholder="Speciality"
                />
              </div>
              <div className="input-box">
                <span className="details">Educational Background</span>
                <input
                  type="text"
                  value={educationalBackground}
                  onChange={(e) => setEducationalBackground(e.target.value)}
                  name="educationalBackground"
                  placeholder="Educational Background"
                />
              </div>
              {/* upload files */}
              <div className="input-box">
                <span className="details">Upload File(s)</span>
                <input
                  type="file"
                  name="file"
                  accept=".pdf, .jpg, .png" // Specify allowed file types
                  multiple // Allow multiple file selection
                  onChange={handleFileSelect}
                />
            </div>
            </div>
            <div className="button">
              <input type="submit"  />
            </div>
          </form>
          <div className="input-box">
              <label>
              <button onClick={() => setShowContract(!showContract)}>
                View Contract
              </button>
                <input
                  type="checkbox"
                  checked={agreedToContract}
                  onChange={() => {
                    setAgreedToContract(!agreedToContract);
                  }}
                />
                I agree to the terms of the contract
              </label>
              
            </div>

            { showContract && (
              <div className="contract-container">
                <h1 className="contract-title">Employment Contract</h1>
                <pre className="contract-text">
                  {`
                    EMPLOYMENT CONTRACT AGREEMENT

                    THIS EMPLOYMENT CONTRACT (the "Contract") is made and entered into by and between [Hospital Name], a [Type of Entity] ("Employer"), and [Employee Name] ("Employee") collectively referred to as the "Parties."

                    1. POSITION AND RESPONSIBILITIES:
                    1.1 Employee agrees to be employed as a [Position] and will perform the following responsibilities: [List of Responsibilities].
                    1.2 Employee will report directly to [Supervisor's Name] and collaborate with other team members.

                    2. SALARY AND BENEFITS:
                    2.1 Employer agrees to pay Employee a monthly salary of $10,000, payable on the [Payment Schedule].
                    2.2 Employee will be eligible for health benefits, retirement plans, and other benefits as outlined in the employee handbook.

                    3. DURATION OF EMPLOYMENT:
                    3.1 The term of this Contract shall commence on [Start Date] and continue for a period of 12 months, terminating on [End Date].
                    3.2 Either party may terminate this Contract with a notice period of [Notice Period] days for any reason.

                    ...

                    10. ACCEPTANCE:
                    10.1 Employee may accept or reject this Contract by clicking the respective buttons below.
                    10.2 By accepting this Contract, Employee acknowledges understanding and agrees to abide by the terms and conditions outlined herein.
                  `}
                </pre>
                <div className="button-container">
                  <button className="close-button" onClick={closeContract}>
                    close
                  </button>
                  
                </div>
              </div>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default PharmacistRegister;
