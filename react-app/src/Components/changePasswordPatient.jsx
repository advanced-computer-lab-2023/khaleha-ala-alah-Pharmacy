// ChangePasswordForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header";

import styles from "./changePassword.module.css"

const PatientChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate new password
      if (newPassword !== confirmPassword) {
        setStatusMessage('New password and confirm password do not match.');
        return;
      }

      // Call the changePassword API
      const response = await axios.post(
        'http://localhost:4000/users/changePassword',
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage(`Error changing password: ${error.response.data.error}`);
    }
  };

  return (
    <div className={styles.container}>
      <Header/>
      <NavBar/>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}> 
          Current Password
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            className={styles.input}
            placeholder="Current Password"
          />
        </label>
        <br />
        <label className={styles.label}>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className={styles.input}
            placeholder="New Password"
          />
        </label>
        <br />
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={styles.input}
            placeholder="Confirm your new Password"
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>Change Password</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default PatientChangePasswordForm;
