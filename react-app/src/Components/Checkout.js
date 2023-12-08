import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useLocation } from "react-router-dom";
import AddressList from "./address";
import { CartContext } from "./cart-context";
import { useContext } from "react";
import { useEffect } from "react";

const StripePaymentButton = ({ amount, patientId }) => {
  const location = useLocation();
  const { cart, updateCart } = useContext(CartContext);
  const { address, updateAddress } = useContext(CartContext);
  const amount22 = location.state?.amount;
  const [patientt, setPatient] = useState(null);
  useEffect(() => {
    fetchCurrentPatient();
  }, []); // Fetch available medicines when the component mounts

  const fetchCurrentPatient = async () => {
    try {
      const response = await fetch(
        "http://localhost:4002/patients/currentPatient",
        {
          method: "GET", // Method is optional because GET is the default value
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
            // ...any other headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const currentPatient = await response.json();
      console.log(currentPatient.data.patient);
      setPatient(currentPatient.data.patient);
      console.log("ALoooooooooooooooooooooO");
    } catch (error) {
      console.log("AA");
      console.error("Error fetching current patient:", error);
    }
  };

  console.log(amount22);
  console.log(patientt);
  patientId = patientt?.userID;
  const [paymentMethod, setPaymentMethod] = useState(null);

  const onToken = (token) => {
    console.log(token);
    console.log("amounttt ++ " + amount22);
    fetch("http://localhost:4002/patients/save-stripe-token", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: token,
        amount: amount22,
        paymentMethod: paymentMethod,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        if (data.success) {
          // Payment successful, proceed to place the order
          const orderResponse = await fetch(
            `http://localhost:4002/patients/checkout/${patientId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cartItems: Object.values(cart),
                address: address, // Replace with the actual chosen address
              }),
            }
          );

          if (orderResponse.ok) {
            // Order placed successfully
            alert("Order placed successfully!");
          } else {
            // Handle the error or show an appropriate message
            console.error("Error placing order:", orderResponse.statusText);
            alert("Error placing order. Please try again.");
          }
        } else {
          // Payment was not successful
          console.error("Payment failed:", data.error);
          alert("Payment failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        // Handle the error as needed
        alert("Error processing payment. Please try again.");
      });
  };

  const onCancel = () => {
    console.log("Payment Cancelled or Failed");
    // You can handle the cancellation or failure here.
  };

  const handlePayWithWallet = async () => {
    try {
      // Call the API to decrement the amount from the wallet
      const walletResponse = await fetch(
        "http://localhost:4002/patients/remove-from-wallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: patientId,
            amount: amount22,
          }),
        }
      );

      if (walletResponse.ok) {
        // Wallet amount decremented successfully
        // Now, proceed to create an order using a similar approach to Cash on Delivery
        const orderResponse = await fetch(
          `http://localhost:4002/patients/checkout/${patientId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cartItems: Object.values(cart),
              address: address, // Replace with the actual chosen address
            }),
          }
        );

        if (orderResponse.ok) {
          // Order placed successfully
          alert("Order placed successfully!");
        } else {
          // Handle the error or show an appropriate message
          console.error("Error placing order:", orderResponse.statusText);
          alert("Error placing order. Please try again.");
        }
      } else {
        // Handle the error or show an appropriate message for wallet transaction
        console.error(
          "Error decrementing wallet amount:",
          walletResponse.statusText
        );
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const handleCashOnDelivery = async () => {
    try {
      // Call the checkout API to place the order with cash on delivery
      const response = await fetch(
        `http://localhost:4002/patients/checkout/${patientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: Object.values(cart),
            address: address, // Replace with the actual chosen address
          }),
        }
      );

      if (response.ok) {
        // Order placed successfully
        alert("Order placed successfully!");
      } else {
        // Handle the error or show an appropriate message
        console.error("Error placing order:", response.statusText);
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div>
      <AddressList />
      <div>
        <button onClick={handleCashOnDelivery}>Cash on Delivery</button>
        <button onClick={handlePayWithWallet}>Pay with Wallet</button>
        <StripeCheckout
          token={onToken}
          onClose={onCancel}
          name="Package Subscription"
          currency="USD"
          amount={amount * 100} // Convert amount to cents
          stripeKey="pk_test_51LYdhJF0BL68bZ9bNouUaO2Cutn6GjQUDsc7Q1JQRXRAZd4mSRqV3d5G3On4SlM44iWnXlorkDELEGGVF7nBgGpX00buYL644E"
        />
      </div>
    </div>
  );
};

export default StripePaymentButton;
