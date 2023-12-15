import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import OverlayWindow from "./overlayWindow";
import { Pagination } from "antd";
import axios from "axios";
import MedicineCard from "./medicineCard";
import { CartContext } from "./cart-context";
import Header from "../Elements/Header";
import NavBar from "../Elements/NavBar";
import Header2 from "../Elements/HeaderDoctor";
import NavBar2 from "../Elements/NavBarPharmacist";
import Header3 from "../Elements/HeaderAdmin";
import NavBar3 from "../Elements/NavBarAdmin";
import { useAuth } from "../AuthContext";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { cart, updateCart } = useContext(CartContext);

  const [medicines, setMedicines] = useState([]);
  const location = useLocation();
  const [allmedsQuantities, setAllMedsQuantities] = useState({});
  const [patient, setPatient] = useState(null);
  const [showMedicineDescription, setShowMedicineDescription] = useState(false);
  const [medicineToDescribe, setMedicineToDescribe] = useState(null); // The medicine whose description is to be shown
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesPerPage, setMedicinesPerPage] = useState(6); // You can adjust this number
  const [currentMedicines, setCurrentMedicines] = useState([]); // The medicines to be displayed on the current page
  const [indexOfLastMedicine, setIndexOfLastMedicine] = useState(
    currentPage * medicinesPerPage - 1
  ); // You can adjust this number
  const [indexOfFirstMedicine, setIndexOfFirstMedicine] = useState(
    indexOfLastMedicine - medicinesPerPage + 1
  );

  const [medicalUses, setMedicalUses] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicalUse, setSelectedMedicalUse] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const {role}=useAuth();
  const query = useQuery().get("query");

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query]);

  useEffect(() => {
    const indexOfLastMedicine = currentPage * medicinesPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
    const currentMedicines = filteredMedicines.slice(
      indexOfFirstMedicine,
      indexOfLastMedicine
    );

    setCurrentMedicines(currentMedicines);
  }, [currentPage, filteredMedicines, medicinesPerPage]);

  useEffect(() => {
    const uniqueMedicalUses = [
      ...new Set(medicines.map((medicine) => medicine.medicalUse)),
    ];
    setMedicalUses(uniqueMedicalUses);
  }, [medicines, filteredMedicines]);

  const handleSearch = async () => {
    // Function to parse query parameters
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4002/admins/available-medicines"
      );
      let allMeds = response.data;
      setSearchResults(allMeds.filter((med) => med.name.includes(query)));
      setMedicines(allMeds);
      setCurrentMedicines(
        allMeds.filter(
          (med) =>
            med.name.toLowerCase().includes(query.toLocaleLowerCase()) &&
            med.availableQuantity > 0
        )
      );
      setFilteredMedicines(
        allMeds.filter(
          (med) =>
            med.name.toLowerCase().includes(query.toLocaleLowerCase()) &&
            med.availableQuantity > 0
        )
      );

      const indexOfLastMedicinee = currentPage * medicinesPerPage;
      const indexOfFirstMedicinee = indexOfLastMedicinee - medicinesPerPage;
      console.log(indexOfLastMedicinee);
      console.log(indexOfFirstMedicinee);
      setIndexOfLastMedicine(indexOfLastMedicinee);
      setIndexOfFirstMedicine(indexOfFirstMedicinee);
      const currentMediciness = allMeds
        .filter(
          (med) =>
            med.name.toLowerCase().includes(query.toLocaleLowerCase()) &&
            med.availableQuantity > 0
        )
        .slice(indexOfFirstMedicinee, indexOfLastMedicinee);
      console.log(currentMediciness);
      setCurrentMedicines(currentMediciness);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching available medicines:", error);
    }
  };

  const handleViewDescription = (medicine) => {
    setShowMedicineDescription(true);
    setMedicineToDescribe(medicine);
  };

  const handleMedicalUseClick = (medicalUse) => {
    setSelectedMedicalUse(medicalUse);

    console.log("ALO");
    if (medicalUse !== "all") {
      const filtered = medicines.filter(
        (medicine) =>
          medicine.medicalUse === medicalUse && medicine.availableQuantity > 0
      );
      setFilteredMedicines(filtered);
    }
    if (medicalUse === "all") {
      setFilteredMedicines(
        medicines.filter((medicine) => medicine.availableQuantity > 0)
      );
    }

    handlePageChange(1); // Reset to first page
  };

  const handlePageChange = (page) => {
    console.log(page);
    console.log(filteredMedicines);
    setCurrentPage(page);

    const indexOfLastMedicinee = page * medicinesPerPage;
    const indexOfFirstMedicinee = indexOfLastMedicinee - medicinesPerPage;
    console.log(indexOfLastMedicinee);
    console.log(indexOfFirstMedicinee);
    setIndexOfLastMedicine(indexOfLastMedicinee);
    setIndexOfFirstMedicine(indexOfFirstMedicinee);
    const currentMediciness = filteredMedicines.slice(
      indexOfFirstMedicinee,
      indexOfLastMedicinee
    );
    console.log(currentMediciness);
    setCurrentMedicines(currentMediciness);
  };
  // Now you can use `query` in your component
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div>
    {role === "patient" ? (
      <>
        <Header />
        <NavBar />
      </>
    ) : role === "pharmacist" ? (
      <>
        <Header2 />
        <NavBar2 />
      </>
    ) : role === "admin" ? (
      <>
        <Header3 />
        <NavBar3 />
      </>
    ) : (
      <div>Unauthorized Access</div>
    )}
  </div>
          <div className="page-container">
            <aside className="sidebar">
              <h3>Medical Uses</h3>
              <ul className="medical-use-list">
                <li
                  className={"all" === selectedMedicalUse ? "selected" : ""}
                  onClick={() => handleMedicalUseClick("all")}
                >
                  All
                </li>
                {medicalUses.map((use, index) => (
                  <li
                    key={index}
                    className={use === selectedMedicalUse ? "selected" : ""}
                    onClick={() => handleMedicalUseClick(use)}
                  >
                    {use}
                  </li>
                ))}
              </ul>
            </aside>
            <div style={{ marginTop: "14vh" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              ></div>

              <div className="medicine-list">
                {currentMedicines.map((medicine) => (
                  <div key={medicine._id} className="medicine-card-container">
                    <MedicineCard
                      medicine={medicine}
                      updateCart={updateCart}
                      cart={cart}
                      medsQuantities={allmedsQuantities}
                      patient={patient}
                      handleViewDescription={handleViewDescription}
                      role= {role}
                    />
                  </div>
                ))}
              </div>
              {showMedicineDescription && (
                <OverlayWindow
                  message={medicineToDescribe.description}
                  onCancel={() => setShowMedicineDescription(false)}
                  cancelLabel={"Close"}
                />
              )}

              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={filteredMedicines.length}
                pageSize={medicinesPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchResults;
