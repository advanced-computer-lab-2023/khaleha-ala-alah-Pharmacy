import React, { useState } from 'react';

const DoctorProfileUpdate = () => {
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
      const response = await fetch('http://localhost:4001/doctors/651f16c855b8273fedf03c93/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
    <div>
      <h2>Update Doctor Profile</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Hourly Rate:</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
        </div>
        <div>
          <label>Affiliation:</label>
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default DoctorProfileUpdate;
