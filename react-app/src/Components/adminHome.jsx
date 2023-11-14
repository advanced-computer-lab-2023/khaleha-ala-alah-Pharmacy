import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const PharmacistList_info = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  const handlePharmacistClick = (pharmacist) => {
    setSelectedPharmacist(pharmacist);
  };

  return (
    <>
    <div>
      <h1>Admin Home</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
    </div>

    <div>
    <Link 
        to="/viewPendingDoctors" 
        className="sidebar-button" 
        style={{
            display: 'inline-block',
            padding: '10px 15px',
            margin: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            textAlign: 'center',
            fontWeight: 'bold'
        }}
    >
        View Pending Doctors
    </Link>
</div>

    </>
  );
};

export default PharmacistList_info;
