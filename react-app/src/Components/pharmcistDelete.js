import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacistList = () => {
  const [pharmacists, setPharmacists] = useState([]);
  
  // Function to fetch the list of pharmacists
  const fetchPharmacists = async () => {
    try {
      const response = await axios.get('http://localhost:4002/pharmacists/allpharmacists'); // Replace with your API endpoint

      setPharmacists(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }
  };
  
  const deletePharmacist = async (role, name) => {
    try {
       
      const response = await axios.delete('http://localhost:4002/admins/delAdminpharmacistPatient', {data: {role , name}});
      const data = response.data;
      console.log(data);

      // If the deletion is successful, update the list of pharmacists
      if (data.message === 'pharmacist deleted successfully') {
     
      }
    } catch (error) {
      console.error('Error deleting pharmacist:', error);
    }
  };
  
  useEffect(() => {
    fetchPharmacists();
  }, []);

  return (
<div>
  <h1>Pharmacists</h1>
  <ul>
    {pharmacists.map((pharmacist) => (
      <li key={pharmacist._id}>
        {pharmacist.name}
        <button onClick={() => deletePharmacist("pharmacist",pharmacist.username,)}>Delete</button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default PharmacistList;
