import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMedicines } from './medicineContext';

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { medicines, updateMedicines } = useMedicines();

  const fetchMedicines = async () => {
    try {
      // Fetch all available medicines from the API
      const response = await axios.get('http://localhost:4000/admins/available-medicines');
      // Filter the medicines to only include those with quantity > 0
      const filteredMedicines = response.data.filter((medicine) => medicine.availableQuantity > 0);

      // Check if the searchTerm is empty, if yes, update context with all medicines
      if (searchTerm === '') {
        updateMedicines(filteredMedicines);
      } else {
        // Filter medicines based on the search term from the context
        const filtered = filteredMedicines.filter((medicine) =>
          medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Update the context with the filtered medicines
        updateMedicines(filtered);
      }
    } catch (error) {
      console.error('Error fetching available medicines:', error);
    }
  };

  const handleSearch = async () => {
    // Fetch medicines only if the search term has changed
    if (searchTerm !== '') {
      fetchMedicines();
    }
  };

  const handleResetSearch = async () => {
    // Reset the search term and fetch all medicines
    setSearchTerm('');
    fetchMedicines();
  };

  return (
    <div>
      <h1>Medicine Search</h1>
      <input
        type="text"
        placeholder="Search for medicines"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleResetSearch}>Reset Search</button>

     
    </div>
  );
};

export default MedicineSearch;
