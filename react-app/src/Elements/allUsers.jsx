import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import "./allUsers.css";
import userIcon from "../Images/chatUser.png";

const UserList = ({ users, onSelectUser }) => {
  const { role } = useAuth();

  const [selectedUser, setSelectedUser] = useState(null);

  const doctorsAndPatients = role === "pharmacist" ? users : [];
  const pharmacists = role === "patient" ? users : [];

  const hasPatients = doctorsAndPatients.some(
    (user) => user.role === "patient"
  );

  return (
    <div className="user-list">
      {(role === "pharmacist" || role === "doctor") && (
        <>
          <h2>Doctors</h2>
          {doctorsAndPatients
            .filter((user) => user.role === undefined)
            .map((doctor, index) => (
              <div
                key={index}
                className={
                  selectedUser === doctor.userID ? "selectedUser" : "user"
                }
                onClick={() => {
                  onSelectUser(doctor.userID);
                  setSelectedUser(doctor.userID);
                }}
              >
                 <img
                src={userIcon}
                alt="User Icon"
                style={{ 
                  marginTop:"-5px",
                  marginRight: "10px",
                  marginBottom:'-20px',
                  width:'50px',
                  height:'50px'
                }}
              />
                {doctor.name}
              </div>
            ))}
        </>
      )}

      {role === "pharmacist" && hasPatients && (
        <>
          <h2>Patients</h2>
          {doctorsAndPatients
            .filter((user) => user.role === "patient")
            .map((patient, index) => (
              <div
                key={index}
                className={
                  selectedUser === patient.userID ? "selectedUser" : "user"
                }
                onClick={() => {
                  onSelectUser(patient.userID);
                  setSelectedUser(patient.userID);
                }}
              >
                 <img
                src={userIcon}
                alt="User Icon"
                style={{ 
                  marginTop:"-5px",
                  marginRight: "10px",
                  marginBottom:'-20px',
                  width:'50px',
                  height:'50px'
                }}
              />
                {patient.name}
              </div>
            ))}
        </>
      )}

      {role === "patient" && (
        <>
          <h2>Pharmacists</h2>
          {pharmacists.map((pharmacist, index) => (
            <div
              key={index}
              className={
                selectedUser === pharmacist.userID ? "selectedUser" : "user"
              }
              onClick={() => {
                onSelectUser(pharmacist.userID);
                setSelectedUser(pharmacist.userID);
              }}
            >
              <img
                src={userIcon}
                alt="User Icon"
                style={{ 
                  marginTop:"-5px",
                  marginRight: "10px",
                  marginBottom:'-20px',
                  width:'50px',
                  height:'50px'
                }}
              />
              {pharmacist.name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;
