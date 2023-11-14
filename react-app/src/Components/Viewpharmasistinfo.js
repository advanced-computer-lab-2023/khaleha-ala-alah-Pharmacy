import React, { useState, useEffect } from "react";
import axios from "axios";

const PharmacistList_info = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/pharmacists/allpharmacists"
        );
        setPharmacists(response.data);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    fetchPharmacists();
  }, []);

  const handlePharmacistClick = (pharmacist) => {
    setSelectedPharmacist(pharmacist);
  };

  return (
    <div>
      <h1>Pharmacists</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
      <button
        onClick={() => {
          window.location.href = "/formmm";
        }}
      >
        Add Medicine
      </button>
      <button
        onClick={() => {
          //localStorage.clear();
          window.location.href = "/changePassword";
        }}
      >
        Change Password
      </button>
      <ul>
        {pharmacists.map((pharmacist) => (
          <li
            key={pharmacist._id}
            onClick={() => handlePharmacistClick(pharmacist)}
          >
            {pharmacist.name}
          </li>
        ))}
      </ul>
      {selectedPharmacist && (
        <div>
          <h2>Pharmacist Details</h2>
          <p>Name: {selectedPharmacist.name}</p>
          <p>Email: {selectedPharmacist.email}</p>
          <p>Hourly Rate: {selectedPharmacist.hourlyRate}</p>
          {/* Add more pharmacist details as needed */}
        </div>
      )}
    </div>
  );
};

export default PharmacistList_info;
