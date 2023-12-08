import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4002/patients/searchmedicine', {
        params: { prefix: searchTerm },
      });
      setSearchResults(response.data.medicines);
    } catch (error) {
      console.error('Error searching for medicines:', error);
    }
  };

  const handleMedicineClick = async (medicine) => {
    setSelectedMedicine(medicine);
    setUpdatedDescription(medicine.description);
    setUpdatedPrice(medicine.price);
    setEditMode(true);
  };

  const handleUpdateMedicine = async () => {
    try {
      const { _id } = selectedMedicine;

      const response = await axios.put(`http://localhost:4002/pharmacists/${_id}/edit-medicine`, {
        description: updatedDescription,
        price: updatedPrice,
      });

      const updatedMedicine = response.data;
      setSelectedMedicine(updatedMedicine);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch();
    }
  }, [searchTerm]);

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
        {searchResults.map((medicine) => (
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
          {editMode ? (
            <div>
              <p>Name: {selectedMedicine.name}</p>
              <input
                type="text"
                placeholder="Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
              
              <button onClick={handleUpdateMedicine}>Save Changes</button>
            </div>
          ) : (
            <div>
              <p>Name: {selectedMedicine.name}</p>
              <p>Price: {selectedMedicine.price}</p>
              <p>Quantity: {selectedMedicine.availableQuantity}</p>
              <p>Sales: {selectedMedicine.sales}</p>
              <p>Description: {selectedMedicine.description}</p>
              <p>Picture URL: {selectedMedicine.pictureUrl}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineSearch;
