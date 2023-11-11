import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard"; // Import the OrderCard component
import "./OrdersPage.css"; // Import CSS for styling
import FeedbackMessage from "./feedbackMessage";
import ConfirmationDialog from "./ConfirmationDialog";

const OrdersPage = () => {
  const [myOrders, setMyOrders] = useState([]);
  let [message, setMessage] = useState("");
  let [messageType, setMessageType] = useState("");
  let [showMessage, setShowMessage] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/patients/myOrders");
        const data = await response.json();
        setMyOrders(data.data.result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrderConfirm = async (order) => {
    console.log(order);
    if (order.order.status !== "Pending") {
      setMessage("You can only cancel pending orders");
      setMessageType("warning");
      setShowMessage(true);
      return;
    }
    setOrderToCancel(order);
    setShowConfirmationDialog(true);
  };

  const handleCancelOrder = async (order) => {
    if (order.order.status !== "Pending") {
      setMessage("You can only cancel pending orders");
      setMessageType("warning");
      setShowMessage(true);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4000/patients/cancel-order?id=${order.order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,

            // Add any other headers like authorization if needed
          },
          // No body is needed for this PATCH request as per your API design
        }
      );

      //const data = await response.json();
      if (response.ok) {
        console.log("Order cancelled successfully:");
        // Handle successful cancellation (e.g., update state, show message)
      } else {
        console.error("Failed to cancel order:");
        // Handle errors (e.g., show error message to user)
      }
      setMessage("Order Successfully Cancelled");
      setMessageType("success");
      setShowMessage(true);
      setMyOrders((prevOrders) =>
        prevOrders.map((o) => {
          if (o.order._id === order.order._id) {
            return { ...o, order: { ...o.order, status: "Cancelled" } };
          }
          return o;
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
      setMessage("Unexpected error occurred");
      setMessageType("error");
      setShowMessage(true);
      // Handle errors (e.g., show error message to user)
    } finally {
      setIsLoading(false);
      setShowConfirmationDialog(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          Loading...
          {showMessage && (
            <FeedbackMessage
              type={messageType}
              message={message}
              onClose={() => {
                setMessageType("");
                setMessage("");
                setShowMessage(false);
                setIsLoading(false);
              }}
            />
          )}
        </div>
      ) : (
        <div className="orders-page">
          <h1 style={{ color: "#022B3A" }}>My Orders</h1>
          {myOrders.map((order, index) => (
            <>
              <OrderCard
                key={index}
                order={order}
                handleCancelOrder={handleCancelOrderConfirm}
                setShowMessage={setShowMessage}
                setMessageType={setMessageType}
                setMessage={setMessage}
              />
            </>
          ))}
          {showMessage && (
            <FeedbackMessage
              type={messageType}
              message={message}
              onClose={() => {
                setMessageType("");
                setMessage("");
                setShowMessage(false);
                setIsLoading(false);
              }}
            />
          )}
          {showConfirmationDialog && (
            <ConfirmationDialog
              message="Are you sure you want to cancel this order?"
              confirmLabel="Yes"
              cancelLabel="No"
              onConfirm={() => handleCancelOrder(orderToCancel)}
              onCancel={() => {
                setShowConfirmationDialog(false);
                setOrderToCancel(null);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default OrdersPage;
