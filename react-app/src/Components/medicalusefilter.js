import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineFilter = () => {
  const [medicalUses, setMedicalUses] = useState([]);
  const [selectedMedicalUse, setSelectedMedicalUse] = useState(null);
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Fetch unique medical uses from the server
  useEffect(() => {
    axios.get('http://localhost:4000/patients/filterMedicine') // Replace with your server endpoint
      .then((response) => {
        setMedicalUses(response.data.uniqueMedicalUses);
      })
      .catch((error) => {
        console.error('Error fetching medical uses:', error);
      });
  }, []);

  // Handle the click on a medical use
  const handleMedicalUseClick = (medicalUse) => {
    setSelectedMedicalUse(medicalUse);

    // Fetch related medicines by medical use
    axios.get(`http://localhost:4000/admins/allmedicinesdyuse?medicalUse=${medicalUse}`) // Replace with your server endpoint
      .then((response) => {
        setRelatedMedicines(response.data);
        setSelectedMedicine(null); // Clear the selected medicine when a medical use is clicked
      })
      .catch((error) => {
        console.error('Error fetching related medicines:', error);
      });
  };

  // Handle the click on a medicine
  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  return (
    <div>
      <h1>Medicine Filter</h1>
      <div className="medical-use-list">
        {medicalUses.map((medicalUse) => (
          <div
            key={medicalUse}
            onClick={() => handleMedicalUseClick(medicalUse)}
            className={`medical-use-item ${medicalUse === selectedMedicalUse ? 'active' : ''}`}
          >
            {medicalUse}
          </div>
        ))}
      </div>
      <div className="related-medicines">
        {selectedMedicalUse && (
          <div>
            <h2>Related Medicines for {selectedMedicalUse}</h2>
            <ul>
              {relatedMedicines.map((medicine) => (
                <li key={medicine._id} onClick={() => handleMedicineClick(medicine)}>
                  {medicine.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="medicine-details">
        {selectedMedicine && (
          <div>
            <h2>Medicine Details</h2>
            <p>Name: {selectedMedicine.name}</p>
            <p>Price: {selectedMedicine.price}</p>
            <p>Description: {selectedMedicine.description}</p>
            <p>Sales: {selectedMedicine.sales}</p>
            <p>Medical Use: {selectedMedicine.medicalUse}</p>
            <p>Available Quantity: {selectedMedicine.availableQuantity}</p>
            <p>Picture URL: {selectedMedicine.pictureUrl}</p>
            {/* Add more medicine details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineFilter;
