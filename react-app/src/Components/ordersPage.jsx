import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard"; // Import the OrderCard component
import "./OrdersPage.css"; // Import CSS for styling
import FeedbackMessage from "./feedbackMessage";
import ConfirmationDialog from "./ConfirmationDialog";
import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header";

const OrdersPage = ({ userID }) => {
  // userID = "652b512450d1b797fa0a42ef";
  const [myOrders, setMyOrders] = useState([]);
  let [message, setMessage] = useState("");
  let [messageType, setMessageType] = useState("");
  let [showMessage, setShowMessage] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  //useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:4002/patients/myOrders/${selectedStatus}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            //body: JSON.stringify({ status: selectedStatus }), // Include status in the request body
            
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data.result);
        setMyOrders(data.data.result);
        

    
        // ... rest of the function ...
    
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    

    // fetchOrders();
  //}, []);
  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleCancelOrderConfirm = async (order) => {
    console.log(order);
    if (order.status !== "Pending") {
      setMessage("You can only cancel pending orders");
      setMessageType("warning");
      setShowMessage(true);
      return;
    }
    setOrderToCancel(order);
    setShowConfirmationDialog(true);
  };

  const handleCancelOrder = async (order) => {
    if (order.status !== "Pending") {
      setMessage("You can only cancel pending orders");
      setMessageType("warning");
      setShowMessage(true);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4002/patients/cancel-order/${order.orderID}`,
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
          if (o.orderID === order.orderID) {
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
          <Header />
          <NavBar />
          <div className="orders-container">
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
          </div>
          <div className="filter-container">
        <label>Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
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
