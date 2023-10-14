import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacistListAPP = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  // Function to fetch the list of pharmacists
  const fetchPharmacists = async () => {
    try {
      const response = await axios.get('http://localhost:4000/pharmacists/allpharmacists');
      setPharmacists(response.data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }
  };

  // Function to handle the selection of a pharmacist
  const handlePharmacistClick = (pharmacist) => {
    setSelectedPharmacist(pharmacist);
  };

  useEffect(() => {
    fetchPharmacists();
  }, []);

  return (
    <div>
      <h1>Pharmacists</h1>
      <div className="pharmacist-list">
        <ul>
          {pharmacists.map((pharmacist) => (
            <li key={pharmacist._id} onClick={() => handlePharmacistClick(pharmacist)}>
              {pharmacist.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedPharmacist && (
        <div className="pharmacist-details">
          <h2>Pharmacist Details</h2>
          <p>Name: {selectedPharmacist.name}</p>
          <p>Username: {selectedPharmacist.username}</p>
          <p>Hourly Rate: {selectedPharmacist.hourlyRate}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default PharmacistListAPP;
