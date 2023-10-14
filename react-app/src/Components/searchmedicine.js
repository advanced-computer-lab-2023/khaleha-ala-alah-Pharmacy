import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Define a delay before making the API request


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/patients/searchmedicine?prefix=${searchTerm}`
    // Send the search term as a query parameter
      );
      setSearchResults(response.data.medicines);
    } catch (error) {
      console.error('Error searching for medicines:', error);
    }
  };



  const handleMedicineClick = async (medicine) => {
    setSelectedMedicine(medicine);
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
      <ul>
        {(searchResults).map((medicine) => (
          <li
            key={medicine._id}
            onClick={() => handleMedicineClick(medicine)}
          >
            {medicine.name}
          </li>
        ))}
      </ul>
      {selectedMedicine && (
        <div>
          <h2>Medicine Details</h2>
          <p>Name: {selectedMedicine.name}</p>
          <p>Price: {selectedMedicine.price}</p>
          <p>Quantity: {selectedMedicine.availableQuantity}</p>
          <p>Sales: {selectedMedicine.sales}</p>
          <p>Description: {selectedMedicine.description}</p>
          <p>Picture URL: {selectedMedicine.pictureUrl}</p>
          {/* Add more medicine details here */}
        </div>
      )}
    </div>
  );
};

export default MedicineSearch;
