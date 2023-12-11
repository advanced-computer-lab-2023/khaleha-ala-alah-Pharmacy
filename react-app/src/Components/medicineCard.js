import React from "react";
import { Alert, Avatar, Button, Card } from "antd";
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";
import { useState } from "react";

const Department = ({
  medicine,
  className = "",
  updateCart,
  cart,
  medsQuantities,
  patient,
  handleViewDescription,
}) => {
  const [hovered, setHovered] = useState(false);
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
              <button
                onClick={() =>{
                    updateCart(medicine._id, "add", medsQuantities)
                  updateCart(medicine._id, "addToCart", medsQuantities, patient)
           
                }
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      </Card>
    </div>
  );
};

export default Department;
