import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAll, setShowAll] = useState(true);

  // Function to fetch available medicines
  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admins/available-medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching available medicines:', error);
    }
  };

  // Function to handle the selection of a medicine
  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  useEffect(() => {
    fetchAvailableMedicines();
  }, []);

  // Function to filter medicines based on availability
  const filteredMedicines = showAll
    ? medicines
    : medicines.filter((medicine) => medicine.availableQuantity > 0);

  return (
    <div>
      <h1>Available Medicines</h1>
      <div>
        <button onClick={() => setShowAll(true)}>Show All</button>
        <button onClick={() => setShowAll(false)}>Show Available</button>
      </div>
      <div className="medicine-list">
        <ul>
          {filteredMedicines.map((medicine) => (
            <li key={medicine._id} onClick={() => handleMedicineClick(medicine)}>
              {medicine.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedMedicine && (
        <div className="medicine-details">
          <h2>Medicine Details</h2>
          <p>Name: {selectedMedicine.name}</p>
          <p>Price: {selectedMedicine.price}</p>
          <p>Quantity: {selectedMedicine.availableQuantity}</p>
          <p>Sales: {selectedMedicine.sales}</p>
          <p>Description: {selectedMedicine.description}</p>
          <p>Picture URL: {selectedMedicine.pictureUrl}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default AvailableMedicines;
