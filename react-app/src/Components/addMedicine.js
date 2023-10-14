import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:4000/pharmacists/addMedicine', formData); // Replace with your API endpoint
      console.log('Medicine added:', response.data);
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };


  return (
    <div>
      <h1>Add Medicine</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Picture URL</label>
          <input type="text" name="pictureUrl" value={formData.pictureUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Available Quantity</label>
          <input type="number" name="availableQuantity" value={formData.availableQuantity} onChange={handleChange} />
        </div>
     
        <div>
          <label>Active Ingredients</label>
          {formData.activeIngredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="activeIngredients"
              value={ingredient}
              onChange={handleChange}
              data-index={index} // Add data-index attribute for indexing
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
           <div>
          <label>Medical Use</label>
          <input type="text" name="medicalUse" value={formData.medicalUse} onChange={handleChange} />
        </div>
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
