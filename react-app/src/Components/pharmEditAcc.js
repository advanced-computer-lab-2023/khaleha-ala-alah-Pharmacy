import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBarPharmacist";
import Header from "../Elements/HeaderDoctor";
import styles from './pharmEditAcc.module.css';

const PharmEditProfileForm = () => {
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
          <label className={styles.label}>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} placeholder='Name' />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Email</label>
          <input type="text" name="pictureUrl" value={formData.pictureUrl} onChange={handleChange} className={styles.inputToLeft} placeholder='Email'/>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Birth Date</label>
          <input type="date" name="price" value={formData.price} onChange={handleChange} className={styles.input} placeholder='Date Of Birth'/>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Affiliation</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className={styles.inputToLeft} placeholder='Affiliation'/>
        </div>
        
        <div className={styles.inputContainer}>
          <label className={styles.label}>Educational Background</label>
          <input type="text" name="availableQuantity" value={formData.availableQuantity} onChange={handleChange} className={styles.input} placeholder='Educational Background'/>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Hourly Rate</label>
          <input type="text" name="medicalUse" value={formData.medicalUse} onChange={handleChange} className={styles.inputToLeft} placeholder='EGP' />
        </div>
        <button type="submit" className={styles.button}>Update Profile</button> 
      </form>
    </div>
  );
};

export default PharmEditProfileForm;



