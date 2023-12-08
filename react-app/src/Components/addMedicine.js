import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBarPharmacist";
import Header from "../Elements/HeaderDoctor";
import styles from './addMedicine.module.css';

const AddMedicine = () => {
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
      const response = await axios.post('http://localhost:4002/pharmacists/addMedicine', formData); // Replace with your API endpoint
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
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} placeholder='Medicine Name' />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Picture URL</label>
          <input type="text" name="pictureUrl" value={formData.pictureUrl} onChange={handleChange} className={styles.inputToLeft} placeholder='Medicine Img URL'/>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.input} placeholder='EGP'/>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className={styles.inputToLeft} placeholder='Medicine Description'/>
        </div>
        
        <div className={styles.inputContainer}>
          <label className={styles.label}>Available Quantity</label>
          <input type="number" name="availableQuantity" value={formData.availableQuantity} onChange={handleChange} className={styles.input} placeholder='Avaliable Quantity'/>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Medical Use</label>
          <input type="text" name="medicalUse" value={formData.medicalUse} onChange={handleChange} className={styles.inputToLeft} placeholder='Medical Usage' />
        </div>
        <div className={styles.addInContainer}>
          <label className={styles.label}>Active Ingredients</label>
          {formData.activeIngredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="activeIngredients"
              value={ingredient}
              onChange={handleChange}
              data-index={index}
              className={styles.inputActiveIn}
              placeholder='Medicine Active Ingredient'
            />
          ))}
          <button type="button" onClick={handleAddIngredient} className={styles.addInButton}>
            + add another Ingredient
          </button>
        </div>
        <button type="submit" className={styles.button}>Save Medicine</button> 
      </form>
    </div>
  );
};

export default AddMedicine;



