import React, { useState, useEffect } from "react";
import ProfileForm from "./profileHome.jsx"; // Adjust the path based on your project structure

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    // Fetch the list of medicines from the API
    fetch("http://localhost:4002/patients/allMediciness")
      .then((response) => response.json())
      .then((data) => setMedicines(data.data.medicines))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const handleMedicineSelection = (medicineId) => {
    setSelectedMedicine(medicineId);
  };

  const renderMedicineList = () => {
    return (
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine._id}>
            <button onClick={() => handleMedicineSelection(medicine._id)}>
              {medicine.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Choose a Medicine:</h2>
      {renderMedicineList()}

      {selectedMedicine && (
        <div>
          <h2>Upload Profile Picture for {selectedMedicine}</h2>
          <ProfileForm medicineId={selectedMedicine} />
        </div>
      )}
    </div>
  );
};

export default MedicineList;
