import React from 'react';
import PatientHomePagebuy from './medicineViewtobuy'
import { MedicinesProvider } from './medicineContext';

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


 
<MedicinesProvider>
      <PatientHomePagebuy/>
      </MedicinesProvider>
    
    </div>
  );
};

export default PatientHomePage;
