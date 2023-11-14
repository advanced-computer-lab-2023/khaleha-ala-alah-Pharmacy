import React from 'react';import './medicineCard.css'
const MedicineCard = ({ medicine }) => {
  return (
    <div className="medicine-card">
      <img src={medicine.pictureUrl} alt={medicine.name} className="medicine-image" />
      <div className="medicine-details">
        <h2>{medicine.name}</h2>
        <p>Price: ${medicine.price}</p>
        <p>Description: {medicine.description}</p>
        <p>Available Quantity: {medicine.availableQuantity}</p>
        <p>Sales: {medicine.sales}</p>
       
        {/* Add more details as needed */}
      </div>
    </div>
  );
};


export default MedicineCard;
