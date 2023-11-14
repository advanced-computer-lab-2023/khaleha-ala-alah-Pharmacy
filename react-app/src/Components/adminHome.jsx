import React, { useState, useEffect } from "react";
import axios from "axios";

const PharmacistList_info = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  const handlePharmacistClick = (pharmacist) => {
    setSelectedPharmacist(pharmacist);
  };

  return (
    <div>
      <h1>Admin Home</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/changePassword";
        }}
      >
        Change Password
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default PharmacistList_info;
