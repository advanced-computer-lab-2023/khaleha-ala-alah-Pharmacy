import React, { useEffect, useContext } from "react";
import axios from "axios";
import MedicineCard from "./medicineCard";
import "./medicineCard.css";
import MedicineSearch from "./searchmedicine";
import MedicineFilter from "./medicalusefilter";
import { useMedicines } from "./medicineContext";
import { CartContext } from "./cart-context";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import OverlayWindow from "./overlayWindow.jsx";
import { Pagination } from "antd";
import "./patientHomePhar.css";
import LoadingPage from "./LoadingPage.jsx";

const PatientHomePagebuy = () => {
  const { medicines, updateMedicines } = useMedicines();
  const { cart, updateCart } = useContext(CartContext);
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
  const [prescriptions, setPrescriptions] = useState([]);

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

  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/admins/available-medicines"
      );
      updateMedicines(response.data);
      const medsQuantities = {};
      let medicineFromDB = response.data;
      let filteredMedicinees = medicineFromDB.filter(
        (medicine) => medicine.availableQuantity > 0
      );
      setFilteredMedicines(filteredMedicinees);
      const indexOfLastMedicinee = currentPage * medicinesPerPage;
      const indexOfFirstMedicinee = indexOfLastMedicinee - medicinesPerPage;
      setIndexOfLastMedicine(indexOfLastMedicinee);
      setIndexOfFirstMedicine(indexOfFirstMedicinee);
      const currentMediciness = filteredMedicinees.slice(
        indexOfFirstMedicinee,
        indexOfLastMedicinee
      );
      setCurrentMedicines(currentMediciness);

      for (let i = 0; i < response.data.length; i++) {
        medsQuantities[response.data[i]._id] = 0; // Initialize each medicine's quantity as 0
      }
      setAllMedsQuantities(medsQuantities);
      console.log(medsQuantities);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching available medicines:", error);
    }
  };

  useEffect(() => {
    const uniqueMedicalUses = [
      ...new Set(medicines.map((medicine) => medicine.medicalUse)),
    ];
    setMedicalUses(uniqueMedicalUses);
  }, [medicines]);

  useEffect(() => {
    // Calculate the total quantity whenever the cart changes
    const newTotalQuantity = Object.values(cart).reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [cart]);
  useEffect(() => {
    fetchAvailableMedicines();
    fetchCurrentPatient();
  }, []); // Fetch available medicines when the component mounts

  useEffect(() => {
    const indexOfLastMedicine = currentPage * medicinesPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
    const currentMedicines = filteredMedicines.slice(
      indexOfFirstMedicine,
      indexOfLastMedicine
    );

    setCurrentMedicines(currentMedicines);
  }, [currentPage, filteredMedicines, medicinesPerPage]);

  /* const filteredMedicines = medicines.filter(
    (medicine) => medicine.availableQuantity > 0
  ); */
  const fetchCurrentPatient = async () => {
    try {
      const response = await fetch(
        "http://localhost:4002/patients/currentPatient",
        {
          method: "GET", // Method is optional because GET is the default value
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
            // ...any other headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const currentPatient = await response.json();
      console.log(currentPatient.data.patient);
      setPatient(currentPatient.data.patient);
      setPrescriptions(currentPatient.data.prescriptions);
      console.log("ALoooooooooooooooooooooO");
    } catch (error) {
      console.log("AA");
      console.error("Error fetching current patient:", error);
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

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
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
                      prescriptions={prescriptions}
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

export default PatientHomePagebuy;
