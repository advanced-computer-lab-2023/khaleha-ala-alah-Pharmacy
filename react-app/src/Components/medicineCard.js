import React from "react";
import { Avatar, Button, Card } from "antd";
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";

const Department = ({
  medicine,
  className = "",
  updateCart,
  cart,
  medsQuantities,
  patient,
}) => (
  <>
    <Card
      className={`department ${className}`}
      cover={
        <img
          alt={`${medicine.name} avatar`}
          src={medicine.pictureUrl}
          style={{ width: "326px", height: "260px" }}
        />
      }
    >
      <h3 className="h4 mt-0">{medicine.name}</h3>

      <div className="team d-flex align-items-center mb-4">
        <p>Price: ${medicine.price}</p>
        <p>Available Quantity: {medicine.availableQuantity}</p>
        <p>Sales: {medicine.sales}</p>
      </div>

      <p>{medicine.description}</p>

      <div className="button-box pb-2">
        <Button type="primary">
          More <FileDoneOutlined className="ml-2" />
        </Button>
      </div>
      <div>
        <button
          onClick={() => updateCart(medicine._id, "subtract", medsQuantities)}
        >
          -
        </button>
        <span>{medsQuantities[medicine._id]}</span>
        <button onClick={() => updateCart(medicine._id, "add", medsQuantities)}>
          +
        </button>
        <button
          onClick={() =>
            updateCart(medicine._id, "addToCart", medsQuantities, patient)
          }
        >
          Add to Cart
        </button>
      </div>
    </Card>
  </>
);

export default Department;
