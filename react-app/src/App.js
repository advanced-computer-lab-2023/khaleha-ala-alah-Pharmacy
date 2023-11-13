import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import AddUser from './Components/addAdmin';
import PatientList from './Components/patientList';
import PharmacistList from './Components/pharmcistDelete';

import AvailableMedicines from './Components/Avilablemedicine';

import MedicineSearch from './Components/searchmedicine';
import MedicineFilter from './Components/medicalusefilter';
import AddMedicine from './Components/addMedicine';
import UpdateMedicine from './Components/medicineEdit';
import PharmacistList_info from './Components/Viewpharmasistinfo';
import PatientList_info from './Components/patientbasicInfo';
import MainApp from './Components/MainApp';
// Change this line
import Login from './Components/login';

import { useAuth } from "./AuthContext";
import PrivateRoute from './PrivateRoute';
import NotApproved from './Components/notApproved';
import NotFound from './Components/notFound';
import PatientRegister from './Components/patientRegister';
import PharmacistRegister from './Components/pharmacistRegister';
import ResetPassword from './Components/resetpassword';
import ForgotPassword from './Components/forgotPassword';
import { VerifyUser } from './Components/verifyUser';
import PatientHomePage from './Components/patientHome'
import PatientHomePagebuy from './Components/medicineViewtobuy'




function App() {
  const { role } = useAuth();
  return (
    <div className="App">
      <Routes>
        {/* public routes */}

        <Route path="/login" element={<Login />} />
             <Route path="/patientHome" element={<PatientHomePage />} />
               <Route path="/medicine-to-buy" element={<PatientHomePagebuy />} />
               <Route path="/search-medicine" element={<MedicineSearch />} />
        <Route path="/medical-use-filter" element={<MedicineFilter />} />
        <Route path="/available-medicines" element={<AvailableMedicines />} />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/PatientRegister" element={<PatientRegister />} />
        <Route path="/PharmacistRegister" element={<PharmacistRegister />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Redirect to login if no role is defined (user is not authenticated) */}
        {role === "" && <Route path="*" element={<Navigate to="/login" />} />}

        {/* private routes */}
        <Route element={<PrivateRoute />}>
          {/* patient routes */}
          {role === "patient" && (
            <>
   
        
            </>
          )}

          {/* doctor routes */}
          {role === "pharmacist" && (
            <>
              <Route path="/pharmacistHome" element={<PharmacistList_info  />} />
      
         
             
              </>
          )}

          {/* admin routes */}
          {role === "admin" && (
            <>
            
              <Route path="/addAdmin" element={<AddUser />} />
             
          
            </>
          )}

          {/* common routes */}
          {role === "notVerified" && (
            <Route path="/verifyUser" element={<VerifyUser />} />
          )}
          {role === "notApproved" && (
            <Route path="/notApproved" element={<NotApproved />} />
          )}
        </Route>

      
     </Routes>
    </div>
  );
}

export default App;
