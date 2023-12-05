import React from "react";
import { Avatar, Button, Card } from "antd";
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
        className={`department ${className}`}
        cover={
          <>
            <h3 className="h4 mt-0" style={{ textAlign: "center" }}>
              {medicine.name}
            </h3>
            <img
              alt={`${medicine.name} avatar`}
              src={medicine.pictureUrl}
              style={{ width: "326px", height: "260px" }}
            />
          </>
        }
      >
        <>
          <div className="team d-flex align-items-center mb-4">
            <p>Price: ${medicine.price}</p>
            <p>Available Quantity: {medicine.availableQuantity}</p>
            <p>Sales: {medicine.sales}</p>
          </div>
          <div className="button-box pb-2">
            <Button
              type="primary"
              onClick={() => {
                handleViewDescription(medicine);
              }}
            >
              View Medicine Description <FileDoneOutlined className="ml-2" />
            </Button>
          </div>
          <div>
            <button
              onClick={() =>
                updateCart(medicine._id, "subtract", medsQuantities)
              }
            >
              -
            </button>
            <span>{medsQuantities[medicine._id]}</span>
            <button
              onClick={() => updateCart(medicine._id, "add", medsQuantities)}
            >
              +
            </button>
            <br />
            <button
              onClick={() =>
                updateCart(medicine._id, "addToCart", medsQuantities, patient)
              }
            >
              Add to Cart
            </button>
          </div>
        </>
      </Card>
    </div>
  );
};

export default Department;
