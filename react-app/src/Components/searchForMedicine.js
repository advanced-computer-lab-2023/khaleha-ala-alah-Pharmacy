import React from 'react';
import PatientHomePagebuy from './medicineViewtobuy'
import { MedicinesProvider } from './medicineContext';
import {CartProvider} from './cart-context'
import Helper from './medicineSearchHelper';

const MedSearch = () => {
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
      <h1>search for a medicine</h1>

      {/* Add buttons to navigate to different pages */}


 
<MedicinesProvider>
  
 <Helper/>

     
      </MedicinesProvider>
    
    </div>
  );
};

export default MedSearch;
