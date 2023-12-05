import React, { useState, useEffect } from "react";
import styles from "./editPackageAdmin.module.css";
import "../Elements/AppointmentCard.css";
import LoadingPage from "./LoadingPageForOverlay.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = "http://localhost:4000";

const EditPackage = ({ onCancel }) => {
  const navigate = useNavigate();
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state for appointments
  const [isLoading, setIsLoading] = useState(true); // Add a loading state for CurrentPatient
  const [currentPatient, setCurrentPatient] = useState([]); // Add a currentPatient state
  const [patientFamilyMembers, setPatientFamilyMember] = useState([]); // Add a patientFamilyMember state
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleCheckout = async (doctor, date) => {
    navigate("/appointmentCheckout", {
      state: { Doctor: doctor, Date: date, selectedOption: selectedOption },
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleAddHealthPackage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/admins/addAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Admin added successfully", response.data);
      onCancel();
      // You can add code to handle success, e.g., redirect to a new page.
    } catch (error) {
      console.error("Error adding admin", error);
      onCancel();
      // You can add code to handle errors, e.g., show an error message to the user.
    }
  };
  return (
    <>
      <div
        className={styles.confirmationBackdrop}
        onClick={handleBackdropClick}
      >
        <div className={styles.confirmationDialog}>
          {loading ? ( // Render a loading message when loading is true
            <div className="testDiv">
              <LoadingPage />
            </div>
          ) : (
            <>
              <label htmlFor="name" className={styles.inputLabel}>
                Username
              </label>

              <input
                className={styles.infoPackages}
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <br />

              <label htmlFor="name" className={styles.inputLabel}>
                Password
              </label>
              <input
                className={styles.infoPackages}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <br />

              <button
                onClick={handleAddHealthPackage}
                className={styles.addPackage}
                style={{ width: "30%" }}
              >
                Add Admin
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPackage;
