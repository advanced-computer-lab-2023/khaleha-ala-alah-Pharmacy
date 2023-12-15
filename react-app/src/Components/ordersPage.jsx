import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard"; // Import the OrderCard component
import "./OrdersPage.css"; // Import CSS for styling
import FeedbackMessage from "./feedbackMessage";
import ConfirmationDialog from "./ConfirmationDialog";
import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header";
import { DatePicker, Select } from "antd";
import { Input, Button, Space, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import SearchOutlined
import { CalendarOutlined, FilterOutlined } from "@ant-design/icons"; // Import Ant Design icons
import LoadingPage from "./LoadingPage";
import { Pagination } from "antd";

const { Option } = Select;

const OrdersPage = ({ userID }) => {
  // userID = "652b512450d1b797fa0a42ef";
  const [myOrders, setMyOrders] = useState([]);
  let [message, setMessage] = useState("");
  let [messageType, setMessageType] = useState("");
  let [showMessage, setShowMessage] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  //useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:4002/patients/myOrders/all`,
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
  }, [currentPage]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const indexOfLastOrder = page * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  };

  // Calculate the currently visible orders
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = myOrders.slice(indexOfFirstOrder, indexOfLastOrder);
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
      console.log("ALOOOO");
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
      console.log("AFFTERRRR");
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
            console.log(o);
            console.log("HOLAAA");
            return {
              ...o,
              order: { ...o.order, status: "Cancelled" },
              status: "Cancelled",
            };
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
          <LoadingPage />
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
            <div className="filter-container">
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{ width: "150px", marginBottom: "1rem" }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="processing">Processing</Option>
                <Option value="delivered">Delivered</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
              {/* <Button
                type="primary"
                onClick={() => {}}
                icon={<SearchOutlined />}
                style={{ marginLeft: "1rem" }}
              >
                Filter
              </Button> */}
            </div>
            {myOrders
              .filter(
                (order) =>
                  order.status.toLowerCase() === selectedStatus ||
                  selectedStatus === "all"
              )
              .slice(indexOfFirstOrder, indexOfLastOrder)
              .map((order, index) => (
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
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={
                myOrders.filter(
                  (order) =>
                    order.status.toLowerCase() === selectedStatus ||
                    selectedStatus === "all"
                ).length
              }
              pageSize={itemsPerPage}
              //showSizeChanger
              pageSizeOptions={["5", "10", "20", "50"]}
            />
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
