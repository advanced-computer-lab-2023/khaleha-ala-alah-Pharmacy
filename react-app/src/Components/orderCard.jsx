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
            style={{ marginTop: '1.3rem' }}
          />
          <div className="medicine-details">
            <h5>{item.medicine.name}</h5>
            <p style={{ fontFamily: 'Arial', fontSize: '10pt', marginBottom: '0.2rem' }}>Quantity: {item.quantity}</p>
            <p style={{ fontFamily: 'Arial', fontSize: '10pt', marginBottom: '0.2rem' }}>Price: ${item.totalPrice}</p>
          </div>
        </div>
      ))}

      <div className="order-summary">
      <p style={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '10pt', marginTop: '3rem', marginLeft: '1rem' }}>Total Amount: ${order.totalAmount}</p>
        <p style={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '10pt', marginBottom: '0.2rem', marginLeft: '1rem' }}>Status: {order.status}</p>
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
