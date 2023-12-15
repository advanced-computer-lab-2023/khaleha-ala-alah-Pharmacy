import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBar";
import Header from "../Elements/Header";
import styles from './patientUserProfile.module.css';

const PatientUserProfileForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    mobileNumber: '',
    package: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/patients/1234`,{
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data.data.user); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <div>
      <Header />
      <NavBar />
      <div className={styles.inputContainer}>
        <label className={styles.label}>Username: {userData.username}</label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Name: {userData.name}</label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Email: {userData.email}</label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Birth Date: {userData.dateOfBirth}</label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Gender: {userData.gender}</label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Mobile Number: {userData.mobileNumber}</label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Package: {userData.packageName}</label>
      </div>
    </div>
  );
};

export default PatientUserProfileForm;



