import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBarPharmacist";
import Header from "../Elements/HeaderDoctor";
import styles from './pharmEditAcc.module.css';

const PharmEditProfileForm = () => {
  // Define state variables for the doctor's information
  const [email, setEmail] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the doctor's profile
      const response = await fetch('http://localhost:4002/pharmacists/updatePharmacist', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          email,
          hourlyRate,
          affiliation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Handle successful update, e.g., display a success message
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <NavBar/>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleUpdateProfile}>
          <div>
          <label className={styles.labelF}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputFields}
            placeholder="Email"
          />
          
          </div>
       <div>
          <label className={styles.labelF}>Hourly Rate</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className={styles.inputFields}
            placeholder="Hourly rate"
          />
        </div>
        <div>
          <label className={styles.labelF}>Affiliation</label>
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className={styles.inputFields}
            placeholder="Affiliation"
          />
        </div>
        <button type="submit" className={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

export default PharmEditProfileForm;



