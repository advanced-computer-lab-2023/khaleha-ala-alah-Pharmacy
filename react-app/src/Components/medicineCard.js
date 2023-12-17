import React, { useRef,useState,useEffect } from "react";
import { Alert, Avatar, Button, Card,Select,Modal } from "antd";
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";
import axios from "axios";
import "./medicineCard.css";
import { useAuth } from "../AuthContext";
const { Option } = Select;

const Department = ({
  medicine,
  handleAddToCart,
  className = "",
  updateCart,
  cart,
  medsQuantities,
  patient,
  handleViewDescription,
  prescriptions,
}) => {
  const [hovered, setHovered] = useState(false);
  const [cartAlert, setCartAlert] = useState(false);
  const {role} = useAuth();
  const hideAlert = () => {
    setCartAlert(false);
  };
  const selectedPrescription=useRef(null);

   const addToCart = (medicine) => {
     if (medicine.isPrescription === true ) {
       if (!selectedPrescription.current) {
         Modal.error({
           title: "Prescription required",
           content: "Please select a valid prescription to add this medicine to your cart",
         });
         return;
       }else{
        const medications = prescriptions.find((prescription) => prescription._id === selectedPrescription.current).medications;
        const medicines = medications.map((medication) => medication.medicine);
        if(!medicines.find((med) => med.toLowerCase() === medicine.name.toLowerCase())){
         Modal.error({
           title: "medicine not found in prescription",
           content: "Please select a valid prescription to add this medicine to your cart",
         });
         return;
        }else{
         handleAddToCart(medicine);
        }
       }
     } else {
      handleAddToCart(medicine);
     }
   };

  const fetchPatientId = async () => {
    try {
      const response = await fetch(
        "http://localhost:4002/patients/currentPatient",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      return data.data.patient.userID;
    } catch (error) {
      console.error("Error fetching patient ID:", error.message);
      throw error;
    }
  };

  const fetchCartItems = async () => {
    try {
      const patientId = await fetchPatientId();

      const response = await axios.get(
        `http://localhost:4002/patients/viewcartitems/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);

      if (response.status !== 200) {
        // Handle error
        console.error("Error fetching cart items:", response.statusText);
        return;
      }

      const data = response.data;
      // Update cart or handle the fetched data as needed
      updateCart(data.cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []); // Run only once when the component mounts

  async function call_add_to_cart(medicineId, quantity) {
    try {
      const patientId = await fetchPatientId();

      const url = "http://localhost:4002/patients/add-to-cart";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ medicineId, quantity, patientId }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage}`);
      }

      const result = await response.json();
      console.log(result.message); // Log the response message
      // You can handle the response further as needed

      // Fetch cart items again after successfully adding to cart
      fetchCartItems();

      setCartAlert(true);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error, e.g., show an error message to the user
    }
  }

  return (
    <div style={{ minWidth: "27vw" }}>
      <Card
        style={{ border: "none" }}
        cover={
          <>
            <h3 className="h4 mt-0" style={{ textAlign: "center" }}>
              {medicine.name}
            </h3>
            <img
              alt={`${medicine.name} avatar`}
              src={medicine.pictureUrl}
              style={{ width: "326px", height: "260px", marginLeft: "1.75rem" }}
            />
          </>
        }
      >
        <>
          <div className="textStyling">
            <label style={{ fontSize: "16pt", textAlign: "left" }}>
              {medicine.price} EGP
            </label>
            <label style={{ color: "rgb(128, 128, 128)" }}>
              Available Quantity: {medicine.availableQuantity}
            </label>
            <label style={{ color: "rgb(128, 128, 128)" }}>
              Sale: {medicine.sales}%{" "}
            </label>
            {medicine.isPrescription === true && (
               <>
               <label style={{ color: 'rgb(128, 128, 128)'}}>Prescription required </label>
               <Select
               placeholder="Select Prescription"
               style={{ width: "100%" }}
               onChange={(value) => {
                 selectedPrescription.current = value;
                 console.log("Selected Prescription:", value);
               }}
             >
               {prescriptions.map((prescription) => (
                 <Option key={prescription._id} value={prescription._id}>
                   {"Dr. " + prescription.doctorName + " " + new Date(prescription.date).toLocaleDateString("en-GB")}
                 </Option>
               ))}
             </Select>
             </>
             )}
          </div>
          <div className="button-container">
            <div className="button-box">
              <button
                type="primary"
                onClick={() => {
                  handleViewDescription(medicine);
                }}
              >
                Details <FileDoneOutlined className="ml-2" />
              </button>
            </div>
            <div className="button-box">
              <br />
              {(role === "patient") && (
                <button
                  onClick={() => {
                    call_add_to_cart(medicine._id, 1);
                    addToCart(medicine);
                  }}
                >
                  Add to Cart
                </button>
              )}

              {/* Alert component */}
              {/* {cartAlert && (
                <div>
                  <p>Added to Cart successfully</p>
                  <button onClick={hideAlert}>Close</button>
                </div>
              )} */}
            </div>
          </div>
        </>
      </Card>
    </div>
  );
};

export default Department;
