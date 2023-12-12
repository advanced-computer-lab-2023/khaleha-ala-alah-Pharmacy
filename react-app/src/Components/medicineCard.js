import React, { useRef } from "react";
import { Alert, Avatar, Button, Card,Select,Modal } from "antd";
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";
import { useState } from "react";
const { Option } = Select;

const Department = ({
  medicine,
  className = "",
  updateCart,
  cart,
  medsQuantities,
  patient,
  handleViewDescription,
  prescriptions,
}) => {
  const [hovered, setHovered] = useState(false);
   const hideAlert = () => {
    setCartAlert(false);
  };
   const [cartAlert, setCartAlert] = useState(false);
   const selectedPrescription=useRef(null);

  const handleAddToCart = () => {
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
        updateCart(medicine._id, "add", medsQuantities);
        updateCart(medicine._id, "addToCart", medsQuantities, patient, selectedPrescription);
        setCartAlert(true);
       }
      }
    } else {
      updateCart(medicine._id, "add", medsQuantities);
      updateCart(medicine._id, "addToCart", medsQuantities, patient, selectedPrescription);
      setCartAlert(true);
    }
  };


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
              style={{ width: "326px", height: "260px" , marginLeft: "1.75rem"}}
            />
            
          </>
        }
      >
        <>
          <div className="textStyling">
            <label style={{ fontSize: '16pt', textAlign: 'left'}}>{medicine.price} EGP</label>
            <label style={{ color: 'rgb(128, 128, 128)'}}>Available Quantity: {medicine.availableQuantity}</label>
            <label style={{ color: 'rgb(128, 128, 128)'}}>Sale: {medicine.sales}% </label>
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
            <button onClick={handleAddToCart}>
                Add to Cart
              </button>
               {/* Alert component */}
      {cartAlert && (
        <div>
          <p>Added to Cart successfully</p>
          <button onClick={hideAlert}>Close</button>
        </div>
      )}
            </div>
          </div>
        </>
      </Card>
    </div>
  );
};

export default Department;
