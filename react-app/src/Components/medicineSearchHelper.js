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

const Helper = () => {
  const { medicines, updateMedicines } = useMedicines();
  const { cart, updateCart } = useContext(CartContext);

  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/admins/available-medicines"
      );
      updateMedicines(response.data);
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
  }, []); // Fetch available medicines when the component mounts

  const filteredMedicines = medicines.filter(
    (medicine) => medicine.availableQuantity > 0
  );

  return (
    <div>
    
      
     
   
  
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
            <MedicineCard medicine={medicine} />
            <div>
          
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Helper;
