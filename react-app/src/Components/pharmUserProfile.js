import React, { useState,useEffect } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBarPharmacist";
import Header from "../Elements/HeaderDoctor";
import styles from './pharmUserProfile.module.css';

const PharmUserProfileForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    hourlyRate: '',
    birthDate: '',
    gender: '',
    mobileNumber: '',
    affiliation: '',
    educationalBackground: '',
    speciality: '',
    status: '',
    fixedSlots: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4002/pharmacists/1234', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data.data.Pharmacist);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderUserDetail = (label, value) => (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}: {value}</label>
    </div>
  );

  return (
    <div>
      <Header />
      <NavBar />

      {renderUserDetail('Username', userData.username)}
      {renderUserDetail('Name', userData.name)}
      {renderUserDetail('Email', userData.email)}
      {renderUserDetail('Birth Date', userData.birthdate)}
      {renderUserDetail('Educational Background', userData.educationalBackground)}
      {renderUserDetail('Mobile Number', userData.mobileNumber)}
      {renderUserDetail('Affiliation', userData.affiliation)}
      {renderUserDetail('Hourly Rate', userData.hourlyRate)}
      {renderUserDetail('Speciality', userData.speciality)}
      {renderUserDetail('Status', userData.status)}
    </div>
  );
};

export default PharmUserProfileForm;



