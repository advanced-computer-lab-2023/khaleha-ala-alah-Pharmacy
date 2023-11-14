import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from './cart-context';

const AddressList = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
    const {address , updateAddress} = useContext(CartContext);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const id = '652b512450d1b797fa0a42ef';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/patients/${id}/get-all-addresses`);
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddAddress = async () => {
    try {
      // Make a POST request to add a new address
      await axios.post(`http://localhost:4000/patients/${id}/add-address`, {
        address: newAddress,
      });

      // Fetch updated addresses after adding a new address
      const response = await axios.get(`http://localhost:4000/patients/${id}/get-all-addresses`);
      setAddresses(response.data.addresses);
      setNewAddress(''); // Clear the input field
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleDeleteAddress = async (index) => {
    try {
      // Make a DELETE request to delete the address at the specified index
      await axios.delete(`http://localhost:4000/patients/${id}/delete-address/${index}`);

      // Fetch updated addresses after deleting an address
      const response = await axios.get(`http://localhost:4000/patients/${id}/get-all-addresses`);
      setAddresses(response.data.addresses);
      // Clear the selected address if the deleted address was selected
      if (index === selectedAddressIndex) {
        setSelectedAddressIndex(-1);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    updateAddress(addresses[index]);
  };

  return (
    <div>
      <h2>Addresses for User ID: {userId}</h2>
      <div>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter new address"
        />
        <button onClick={handleAddAddress}>Add</button>
      </div>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            <span>{address}</span>
            <button onClick={() => handleDeleteAddress(index)}>Delete</button>
            <input
              type="radio"
              name="selectedAddress"
              checked={index === selectedAddressIndex}
              onChange={() => handleSelectAddress(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
