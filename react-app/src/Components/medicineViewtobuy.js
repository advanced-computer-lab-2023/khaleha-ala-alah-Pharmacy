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

const PatientHomePagebuy = () => {
  const { medicines, updateMedicines } = useMedicines();
  const { cart, updateCart } = useContext(CartContext);
  const [allmedsQuantities, setAllMedsQuantities] = useState({});
  const [patient, setPatient] = useState(null);
  const [showMedicineDescription, setShowMedicineDescription] = useState(false);
  const [medicineToDescribe, setMedicineToDescribe] = useState(null); // The medicine whose description is to be shown

  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/admins/available-medicines"
      );
      updateMedicines(response.data);
      const medsQuantities = {};

      for (let i = 0; i < response.data.length; i++) {
        medsQuantities[response.data[i]._id] = 0; // Initialize each medicine's quantity as 0
      }
      setAllMedsQuantities(medsQuantities);
      console.log(medsQuantities);
    } catch (error) {
      console.error("Error fetching available medicines:", error);
    }
  };
  const [totalQuantity, setTotalQuantity] = useState(0);

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

  const filteredMedicines = medicines.filter(
    (medicine) => medicine.availableQuantity > 0
  );
  const fetchCurrentPatient = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/patients/currentPatient",
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

  return (
    <div>
      <Link to="/wallet">
        <button>wallet</button>
      </Link>
      <Link to="/orders">
        <button>My Orders</button>
      </Link>

      <Link to="/changePassword">
        <button>Change Password</button>
      </Link>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <MedicineFilter />
        <MedicineSearch />

        <div style={{ textAlign: "center", padding: "20px" }}>
          <Link to="/cart">
            <button>Cart</button>
          </Link>
          <p>Total Quantity: {totalQuantity}</p>
        </div>
      </div>

      <div className="medicine-list">
        {filteredMedicines.map((medicine) => (
          <div key={medicine._id} className="medicine-card-container">
            <MedicineCard
              medicine={medicine}
              updateCart={updateCart}
              cart={cart}
              medsQuantities={allmedsQuantities}
              patient={patient}
              handleViewDescription={handleViewDescription}
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
    </div>
  );
};

export default PatientHomePagebuy;
