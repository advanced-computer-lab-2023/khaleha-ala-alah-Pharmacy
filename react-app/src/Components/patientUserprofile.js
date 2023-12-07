import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBar";
import Header from "../Elements/Header";
import styles from './patientUserProfile.module.css';

const PatientUserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    pictureUrl: '',
    price: '',
    description: '',
    availableQuantity: '',
    activeIngredients: [''], // Start with one empty ingredient field
    medicalUse: '', // Medical Use field
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (name === 'activeIngredients') {
      // If the change is in the activeIngredients array, update it accordingly
      const updatedIngredients = [...formData.activeIngredients];
      const index = dataset.index; // Get the index from the data-index attribute
      updatedIngredients[index] = value;
      setFormData({ ...formData, activeIngredients: updatedIngredients });
    } else {
      // Otherwise, update the field directly
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    // Add a new empty ingredient field when the "Add Ingredient" button is clicked
    setFormData({ ...formData, activeIngredients: [...formData.activeIngredients, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/pharmacists/addMedicine', formData); // Replace with your API endpoint
      console.log('Medicine added:', response.data);
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div >
      <Header/>
      <NavBar/>
      <form onSubmit={handleSubmit} className={styles.addMedicinecontainer}>
      <div className={styles.inputContainer}>
          <label className={styles.label}>Username: maryam_fawzyy</label>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Name: Mariam Mohamed Fawzy Badie Mohamed</label>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email: mariamfawzy@gmail.com</label>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Birth Date: 30/04/2002</label>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Gender: Female</label>
        </div>
        
        <div className={styles.inputContainer}>
          <label className={styles.label}>Mobile Number: 012132446749</label>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Package: Silver</label>
        </div>
      </form>
    </div>
  );
};

export default PatientUserProfileForm;



