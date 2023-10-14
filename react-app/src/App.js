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

import AddAdminphramacy from './Components/addAdminpharmacy';
import DeleteUser from './Components/deleteAdminDoctorPatiient';
import PendingDoctors from './Components/viewPendingDoctors';
import HealthPackages from './Components/packages';
import DoctorProfileUpdate from './Components/editDoctorProfile';
import DoctorAppointments from './Components/Appointmentsdoctor';
import Prescriptions from './Components/patientdoctorhealth';
import DoctorPatients from './Components/viewallmypatients';


function App() {
  return (

<DoctorPatients/>


  );
}

export default App;
