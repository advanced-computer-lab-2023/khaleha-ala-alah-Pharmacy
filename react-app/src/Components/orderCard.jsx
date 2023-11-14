import React from "react";
import "./OrderCard.css"; // Assuming you have a CSS file for styling
import { useState, useEffect } from "react";

const OrderCard = ({ order, handleCancelOrder }) => {
  useEffect(() => {
    console.log(order);
    console.log(order.items);
  }, []);

  return (
    <div className="order-card">
      {order.items.map((item, index) => (
        <div key={index} className="order-item">
          <img
            width="100px"
            height="100px"
            src={item.medicine.pictureUrl}
            alt={item.medicine.name}
          />
          <div className="medicine-details">
            <h5>{item.medicine.name}</h5>
            <p>Quantity: {item.quantity} x</p>
            <p>Price: ${item.totalPrice}</p>
          </div>
        </div>
      ))}

      <div className="order-summary">
        <p>Total Amount: ${order.totalAmount}</p>
        <p>Status: {order.status}</p>
        {
          <button
            onClick={() => handleCancelOrder(order)}
            className="cancel-button"
          >
            Cancel Order
          </button>
        }
      </div>
    </div>
  );
};

export default OrderCard;
