import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList_info = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/patients');
        setPatients(response.data.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div>
      <h1>Patients</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id} onClick={() => handlePatientClick(patient)}>
            {patient.name}
          </li>
        ))}
      </ul>
      {selectedPatient && (
        <div>
          <h2>Patient Details</h2>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of Birth: {selectedPatient.dateOfBirth}</p>
          <p>Mobile Number: {selectedPatient.mobileNumber}</p>
          {/* Add more patient details as needed */}
        </div>
      )}
    </div>
  );
};

export default PatientList_info;
