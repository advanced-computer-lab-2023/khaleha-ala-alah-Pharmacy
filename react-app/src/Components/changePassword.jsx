// ChangePasswordForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
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
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Old Password:
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </label>
        <br />
        <button type="submit">Change Password</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
};

export default ChangePasswordForm;
