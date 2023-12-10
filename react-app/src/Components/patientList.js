import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch the list of patients when the component mounts
    Axios.get('http://localhost:4002/patients')
      .then((response) => {
        setPatients(response.data.data.patients);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 const handleDeletePatient = async (role, name) => {
    try {
        
      const response = await Axios.delete('http://localhost:4002/admins/delAdminpharmacistPatient', {data: { role, name }} );
      const data = response.data;
      console.log(data);

      // If the deletion is successful, update the list of pharmacists
      if (data.message === 'pharmacist deleted successfully') {
     
      }
    } catch (error) {
      console.error('Error deleting pharmacist:', error);
    }
  };
  

  return (
    <div>
      <h2>List of Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.name} - {patient.email}
            <button onClick={() => handleDeletePatient("patient", patient.username)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
