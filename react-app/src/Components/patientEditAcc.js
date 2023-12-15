import React, { useState ,useEffect  } from 'react';
import axios from 'axios';
import NavBar from "../Elements/NavBar";
import Header from "../Elements/Header";
import styles from './patientEditAcc.module.css';

const PatientEditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    mobileNumber: '',
  });

  useEffect(() => {
    // Fetch the user data when the component mounts
    // const fetchUserData = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:4000/patient/1234'); // Replace with the actual user ID
    //     setFormData(response.data.data.user);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };

    //fetchUserData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        'http://localhost:4000/patients/1234',  // Replace with the actual user ID
        formData,
        {
          headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`, // Replace with your actual access token
            'Content-Type': 'application/json', // Specify the content type if needed
            // Add other headers as needed
          },
        }
      );
      alert('your profile is updated successfully');
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <Header />
      <NavBar />
      <form onSubmit={handleSubmit} className={styles.addMedicinecontainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Name"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputToLeft}
            placeholder="Email"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Birth Date</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={styles.input}
            placeholder="Date Of Birth"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelToLeft}>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={styles.inputToLeft}
            placeholder="Mobile Nr"
          />
        </div>
        <button type="submit" className={styles.button}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default PatientEditProfileForm;



