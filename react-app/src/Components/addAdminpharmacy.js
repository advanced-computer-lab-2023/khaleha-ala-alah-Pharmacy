import React, { useState } from 'react';
import axios from 'axios';

const AddAdminphramacy = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4001/admins/addadmin', {
        username,
        password,
      });

      console.log('Admin added successfully', response.data);
      // You can add code to handle success, e.g., redirect to a new page.
    } catch (error) {
      console.error('Error adding admin', error);
      // You can add code to handle errors, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdminphramacy;
