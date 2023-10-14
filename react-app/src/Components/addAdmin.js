import React, { useState } from 'react';
import Axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:4000/admins/addAdmin', {
        username: formData.username,  // Use the user-entered username
        password: formData.password,  // Use the user-entered password
      });
      const data = response.data;

      console.log(data);
      // Handle the response, e.g., 

    } catch (error) {
      // Handle errors, e.g., display an error message

      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add User (Admin)</h2>
      <form onSubmit={handleAddUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            id="password"
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
