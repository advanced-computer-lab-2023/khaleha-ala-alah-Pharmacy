import React from "react";
import PatientHomePagebuy from "./medicineViewtobuy";
import { MedicinesProvider } from "./medicineContext";
import { CartProvider } from "./cart-context";
import { useEffect, useState } from "react";

import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header";

const PatientHomePage = () => {
  const redirectToSearchMedicine = () => {
    window.location.replace("/search-medicine");
  };

  const redirectToMedicalUseFilter = () => {
    window.location.replace("/medical-use-filter");
  };

  const redirectToAvailableMedicines = () => {
    window.location.replace("/available-medicines");
  };

  return (
    <div>
      <Header />
      <NavBar />
      <MedicinesProvider>
        <PatientHomePagebuy />
      </MedicinesProvider>
    </div>
  );
};

export default PatientHomePage;
