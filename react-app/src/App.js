import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AddUser from "./Components/addAdmin";
import PatientList from "./Components/patientList";
import PharmacistList from "./Components/pharmcistDelete";

import AvailableMedicines from "./Components/Availablemedicine";
import Messenger from "./Components/messenger.jsx";
import MedicineSearch from "./Components/searchmedicine";
import MedicineFilter from "./Components/medicalusefilter";
import AddMedicine from "./Components/addMedicine";
import UpdateMedicine from "./Components/medicineEdit";
import PharmacistList_info from "./Components/Viewpharmasistinfo";
import PatientList_info from "./Components/patientbasicInfo";
import MainApp from "./Components/MainApp";

import ViewPending from "./Components/viewPendingPharmacist";
// Change this line
import Login from "./Components/login";
import OrdersPage from "./Components/ordersPage";
import Form from "./Components/uploadMedicinesImage.jsx";

import UserManagementAdmin from "./Components/UserManagementAdmin.jsx";
import AdminDeleteDoctor from "./Components/adminDeleteDoctor.jsx";
import AdminDeltePatient from "./Components/adminDeletePatient.jsx";

import { useAuth } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import NotApproved from "./Components/notApproved";
import NotFound from "./Components/notFound";
import PatientRegister from "./Components/patientRegister";
import PharmacistRegister from "./Components/pharmacistRegister";
import ResetPassword from "./Components/resetpassword";
import ForgotPassword from "./Components/forgotPassword";
import { VerifyUser } from "./Components/verifyUser";
import PatientHomePage from "./Components/patientHome";
import PatientHomePagebuy from "./Components/medicineViewtobuy";
import { CartProvider } from "./Components/cart-context";
import CartPage from "./Components/cart";
import StripePaymentButton from "./Components/Checkout";
import AddressList from "./Components/address";
import WalletAmount from "./Components/Wallet";
import SearchResults from "./Components/searchResults.jsx";
import { Notification } from "./Components/notification";
import PharmEditProfileForm from "./Components/pharmEditAcc.js";
import PatientEditProfileForm from "./Components/patientEditAcc.js";
import PatientUserProfileForm from "./Components/patientUserprofile.js";
import PharmUserProfileForm from "./Components/pharmUserProfile";

import { DoctorHome } from "./Components/pharmacistHome.jsx";
import { AdminHome } from "./Components/adminHome";
import PendingDoctors from "./Components/viewPendingDoctors";
import DeleteUser from "./Components/deleteAdminDoctorPatiient";

import ChangePasswordForm from "./Components/changePassword";
import PatientChangePasswordForm from "./Components/changePasswordPatient";

import MedSearch from "./Components/searchForMedicine.js";
function App() {
  const { role } = useAuth();
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          {/* public routes */}
          <Route path="/wallet" element={<WalletAmount />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/addresses" element={<AddressList />} />
          <Route path="/checkout" element={<StripePaymentButton />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patientHome" element={<PatientHomePage />} />
          <Route path="/medicine-to-buy" element={<PatientHomePagebuy />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search-medicine" element={<MedicineSearch />} />
          <Route path="/medical-use-filter" element={<MedicineFilter />} />
          <Route path="/available-medicines" element={<AvailableMedicines />} />
          <Route path="changePasswordPatient" element={<PatientChangePasswordForm/>}/>
          <Route path="/changePassword" element={<ChangePasswordForm />} />
          <Route path="/searchMedicine" element={<MedSearch />} />

          <Route path="/pharmEditAcc" element={<PharmEditProfileForm/>}/>
          <Route path="/patientEditAcc" element={<PatientEditProfileForm/>}/>
          <Route path="/patientUserprofile" element={<PatientUserProfileForm/>}/>
          <Route path="/pharmUserProfile" element={<PharmUserProfileForm/>}/>
          
          <Route path="/addAdmin" element={<AddUser />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route
            path="/deleteAdminPharmacistPatient"
            element={<DeleteUser />}
          />
          <Route path="/viewPendingPharmacists" element={<PendingDoctors />} />
          <Route path="/viewMedicines" element={<AvailableMedicines />} />
          <Route path="/changePassword" element={<ChangePasswordForm />} />

          <Route path="/viewPendingDoctors" element={<ViewPending />} />
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
                <Route path="/searchResults" element={<SearchResults />} />
                <Route path="/messenger" element={<Messenger />} />
              </>
            )}

            {/* doctor routes */}
            {role === "pharmacist" && (
              <>
                <Route path="/PharmacistHome" element={<DoctorHome />} />

                <Route path="/wallet" element={<WalletAmount />} />
                <Route path="/AddMedicine" element={<AddMedicine />} />
                <Route path="/viewMedicines" element={<AvailableMedicines />} />

                <Route path="/notification" element={<Notification />} />
                <Route path="/searchResults" element={<SearchResults />} />
                <Route path="/messenger" element={<Messenger />} />
                <Route path="/notification" element={<Notification />} />

              </>
            )}

            {/* admin routes */}
            {role === "admin" && (
              <>
                <Route path="/addAdmin" element={<AddUser />} />
                <Route path="/adminHome" element={<AdminHome />} />
                <Route
                  path="/deleteAdminPharmacistPatient"
                  element={<DeleteUser />}
                />
                <Route
                  path="/viewPendingPharmacists"
                  element={<PendingDoctors />}
                />
                <Route path="/viewMedicines" element={<AvailableMedicines />} />
                <Route
                  path="/changePassword"
                  element={<ChangePasswordForm />}
                />
                <Route path="/searchMedicine" element={<PatientHomePage />} />
                <Route path="/ManageUsers" element={<UserManagementAdmin />} />
                <Route
                  path="/ManagePharmacists"
                  element={<AdminDeleteDoctor />}
                />
                <Route path="/searchResults" element={<SearchResults />} />
                <Route path="/ManagePatients" element={<AdminDeltePatient />} />
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
      </CartProvider>
    </div>
  );
}

export default App;
