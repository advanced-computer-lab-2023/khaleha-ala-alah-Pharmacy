import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedicineCard from './medicineCard';
import './medicineCard.css'


const PatientHomePagebuy = () => {
  const [medicines, setMedicines] = useState([]);

  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admins/available-medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching available medicines:', error);
    }
  };

  useEffect(() => {
    fetchAvailableMedicines();
  }, []); // Fetch available medicines when the component mounts

  const filteredMedicines = medicines.filter((medicine) => medicine.availableQuantity > 0);

  return (
    <div >
      <h1>Welcome to the Patient Home Page</h1>
   <div className='medicine-list'>

 
      {filteredMedicines.map((medicine) => (
         <div  key={medicine._id} className="medicine-card-container">
          <MedicineCard medicine={medicine} />
          <button>Add to Cart</button>
        </div>
      ))}
        </div>
         
    </div>
  );
};

export default PatientHomePagebuy;
