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
            src={item.medicine.pictureUrl}
            alt={item.medicine.name}
            className="medicine-image"
          />
          <div className="medicine-details">
            <h5>{item.medicine.name}</h5>
            <p>Quantity: {order.order.items[index].quantity} x</p>
            <p>Price: ${order.order.items[index].totalPrice}</p>
          </div>
        </div>
      ))}
      <div className="order-summary">
        <p>Total Amount: ${order.order.totalAmount}</p>
        <p>Status: {order.order.status}</p>
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
