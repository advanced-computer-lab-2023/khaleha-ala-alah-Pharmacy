import React, { useState, useEffect } from 'react';

const Prescriptions = ({ doctorId, patientId }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(null);

  // Function to fetch prescriptions for a specific doctor and patient
  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://localhost:4001/doctors/651f16c855b8273fedf03c93/651ee41994ed6dc1e163c4df/get-info');
      if (!response.ok) {
        throw new Error('Failed to fetch prescriptions');
      }
      const data = await response.json();
      const prescriptionsData = data.data.prescriptions;
      const patientData = data.data.patient;

      setPrescriptions(prescriptionsData);
      setPatient(patientData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchPrescriptions();
  }, [doctorId, patientId]); // Update when doctorId or patientId changes

  return (
    <div>
  
    
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <strong>summary:</strong> {prescription.summary}<br />
            {/* Add other prescription details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescriptions;
