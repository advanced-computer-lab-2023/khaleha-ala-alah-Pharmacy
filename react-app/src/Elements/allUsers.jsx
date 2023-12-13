import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import "./allUsers.css";
import userIcon from "../Images/chatUser.png";
import { Pagination } from "antd";
import ToggleSwitch from "../Components/toggleSwitch";
import Separator from "../Components/separator";

const UserList = ({ users, onSelectUser, toView }) => {
  const { role } = useAuth();

  const [selectedUser, setSelectedUser] = useState(null);

  const doctorsAndPatients = role === "pharmacist" ? users : [];
  const pharmacists = role === "patient" ? users : [];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7); // You can set this to any number you prefer
  const [Displayed, setDisplayed] = useState(toView);
  const isToggleOn = Displayed === "doctors"; // If displayed is "doctors", toggle is on

  const hasPatients = doctorsAndPatients.some(
    (user) => user.role === "patient"
  );

  const handleToggle = () => {
    setDisplayed(Displayed === "patients" ? "doctors" : "patients");
  };

  return (
    <div className="user-list">
      {((role === "pharmacist" && Displayed === "doctors") ||
        role === "doctor") && (
        <>
          <h2>Doctors</h2>
          {/* {doctorsAndPatients
            .filter((user) => user.role === undefined)
            .map((doctor, index) => ( */}
          {doctorsAndPatients
            .filter((user) => user.role === undefined)
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
                    marginTop: "-5px",
                    marginRight: "10px",
                    marginBottom: "-20px",
                    width: "50px",
                    height: "50px",
                  }}
                />
                {doctor.name}
              </div>
            ))}
          <div className="containerPagination">
            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={doctorsAndPatients.length}
              pageSize={itemsPerPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      {role === "pharmacist" && hasPatients && Displayed === "patients" && (
        <>
          <h2>Patients</h2>
          {/* {doctorsAndPatients
            .filter((user) => user.role === "patient")
            .map((patient, index) => ( */}
          {doctorsAndPatients
            .filter((user) => user.role === "patient")
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
                    marginTop: "-5px",
                    marginRight: "10px",
                    marginBottom: "-20px",
                    width: "50px",
                    height: "50px",
                  }}
                />
                {patient.name}
              </div>
            ))}
          <div className="containerPagination">
            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={doctorsAndPatients.length}
              pageSize={itemsPerPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      {role === "patient" && (
        <>
          <h2>Pharmacists</h2>
          {pharmacists
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((pharmacist, index) => (
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
                    marginTop: "-5px",
                    marginRight: "10px",
                    marginBottom: "-20px",
                    width: "50px",
                    height: "50px",
                  }}
                />
                {pharmacist.name}
              </div>
            ))}
          <div className="containerPaginationPatients">
            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={pharmacists.length}
              pageSize={itemsPerPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      {role === "pharmacist" && (
        <div className="containerSwitch">
          <div className="separatorContainer"></div>
          <span> Patients </span>
          {role === "pharmacist" && (
            <ToggleSwitch isOn={isToggleOn} handleToggle={handleToggle} />
          )}
          <span> Doctors</span>
        </div>
      )}
    </div>
  );
};

export default UserList;
