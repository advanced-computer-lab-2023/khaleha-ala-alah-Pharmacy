import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AddUser from "./Components/addAdmin";
import PatientList from "./Components/patientList";
import PharmacistList from "./Components/pharmcistDelete";

import AvailableMedicines from "./Components/Avilablemedicine";

import MedicineSearch from "./Components/searchmedicine";
import MedicineFilter from "./Components/medicalusefilter";
import AddMedicine from "./Components/addMedicine";
import UpdateMedicine from "./Components/medicineEdit";
import PharmacistList_info from "./Components/Viewpharmasistinfo";
import PatientList_info from "./Components/patientbasicInfo";
import MainApp from "./Components/MainApp";
import AdminHome from "./Components/adminHome";
import ViewPending from "./Components/viewPendingPharmacist";
// Change this line
import Login from "./Components/login";
import OrdersPage from "./Components/ordersPage";

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
import Form from "./Components/uploadMedicinesImage";

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
            {role === "patient" && <></>}

            {/* doctor routes */}
            {role === "pharmacist" && (
              <>
                <Route
                  path="/pharmacistHome"
                  element={<PharmacistList_info />}
                />
              </>
            )}

            {/* admin routes */}
            {role === "admin" && (
              <>
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/addAdmin" element={<AddUser />} />
                <Route path="/formmm" element={<Form />} />
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
