import React, { useState, useEffect } from 'react';
import { useMedicines } from './medicineContext';

const MedicineFilter = () => {
  const [medicalUses, setMedicalUses] = useState([]);
  const [selectedMedicalUse, setSelectedMedicalUse] = useState(null);
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const { medicines, updateMedicines } = useMedicines();
 


  // Extract unique medical uses from the context data
  useEffect(() => {
    const uniqueMedicalUses = [...new Set(medicines.map((medicine) => medicine.medicalUse))];
    setMedicalUses(uniqueMedicalUses);
  }, [medicines]);

  // Handle the click on a medical use
  const handleMedicalUseClick = (medicalUse) => {
    setSelectedMedicalUse(medicalUse);

    // Filter medicines by selected medical use
    const filteredMedicines = medicines.filter((medicine) => medicine.medicalUse === medicalUse);
    setRelatedMedicines(filteredMedicines);
    setSelectedMedicine(null); // Clear the selected medicine when a medical use is clicked

    // Update the medicine context with filtered medicines
    updateMedicines(filteredMedicines);
  };

  // Handle the click on the "Show All Medicines" button
  const handleShowAllMedicines = () => {
    setSelectedMedicalUse(null); // Reset selected medical use
    setRelatedMedicines([]); // Clear the filtered medicines
    updateMedicines(medicines); // Update the medicine context with all available medicines
  };

  // Handle the click on a medicine
  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  return (
    <div>
      <h1>Medicine Filter</h1>
      <div className="medical-use-list">
        {/* Render a dropdown with medical uses */}
        <select onChange={(e) => handleMedicalUseClick(e.target.value)}>
          <option value="">Select Medical Use</option>
          {medicalUses.map((medicalUse) => (
            <option key={medicalUse} value={medicalUse}>
              {medicalUse}
            </option>
          ))}
        </select>
     
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
