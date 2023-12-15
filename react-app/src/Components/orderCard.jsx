import React from "react";
import "./OrderCard.css"; // Update your CSS file accordingly

const OrderCard = ({ order, handleCancelOrder }) => {
  return (
    <div className="order-card">
      {order.items.map((item, index) => (
        <div key={index} className="order-item">
          <img
            className="item-image"
            src={item.medicine.pictureUrl}
            alt={item.medicine.name}
          />
          <div className="item-detail">{item.medicine.name}</div>
          <div className="item-detail">
            Price: ${item.totalPrice / item.quantity}
          </div>
          <div className="item-detail">Quantity: {item.quantity}</div>
          <div className="item-detail">Subtotal: ${item.totalPrice}</div>
        </div>
      ))}

      <div className="order-summary">
        <div className="summary-detail">Total Amount: ${order.totalAmount}</div>
        <div className="summary-detail">Status: {order.status}</div>
        {order.status === "Pending" && (
          <button
            onClick={() => handleCancelOrder(order)}
            className="cancel-button"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
