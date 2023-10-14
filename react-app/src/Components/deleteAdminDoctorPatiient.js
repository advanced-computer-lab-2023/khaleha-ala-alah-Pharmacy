import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [result, setResult] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:4001/admins/delAdminDoctorPatient', {
        data: { role, name: username },
      });

      setResult(response.data.message);
    } catch (error) {
      setResult(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Role (admin/doctor/patient):</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleDelete}>
          Delete User
        </button>
      </form>
      <div>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default DeleteUser;
