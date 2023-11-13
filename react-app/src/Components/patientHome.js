import React from 'react';


const PatientHomePage = () => {
  const redirectToSearchMedicine = () => {
    window.location.replace('/search-medicine');
  };

  const redirectToMedicalUseFilter = () => {
    window.location.replace('/medical-use-filter');
  };

  const redirectToAvailableMedicines = () => {
    window.location.replace('/available-medicines');
  };

  return (
    <div>
      <h1>Welcome to the Patient Home Page</h1>

      {/* Add buttons to navigate to different pages */}
      <button onClick={redirectToSearchMedicine}>Search Medicine</button>

      <button onClick={redirectToMedicalUseFilter}>Medical Use Filter</button>

      <button onClick={redirectToAvailableMedicines}>Available Medicines</button>
    </div>
  );
};

export default PatientHomePage;
