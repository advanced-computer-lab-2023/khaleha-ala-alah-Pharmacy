import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './Components/addAdmin';
import PatientList from './Components/patientList';
import PharmacistList from './Components/pharmcistDelete';
import PharmacistListAPP from './Components/allAppliedpharmacists';
import AvailableMedicines from './Components/Avilablemedicine';
import MedicineSearch from './Components/searchmedicine';
import MedicineFilter from './Components/medicalusefilter';
import AddMedicine from './Components/addMedicine';
import UpdateMedicine from './Components/medicineEdit';
import PharmacistList_info from './Components/Viewpharmasistinfo';
import PatientList_info from './Components/patientbasicInfo';
import MainApp from './Components/MainApp';
import  Login  from './Components/login';




function App() {
  return (

<Login/>


  );
}

export default App;
