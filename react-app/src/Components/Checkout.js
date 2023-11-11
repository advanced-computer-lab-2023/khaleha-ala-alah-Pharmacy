import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useLocation } from 'react-router-dom';
const StripePaymentButton = ({ amount }) => {
  const location = useLocation();
  const amount22 = location.state?.amount; 
  const onToken = (token) => {
    console.log(token);
    console.log('amounttt ++ ' + amount22);
    fetch('http://localhost:4000/patients/save-stripe-token', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({
        token: token,
        amount: amount22,
      }),
    })
    .then(response =>  response.json())
    .then(async data => {
      console.log(data);
      alert(`Payment successful! Email: ${data.email}`);
      // You may want to perform additional actions on successful payment
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      // Handle the error as needed
    });
  }

  const onCancel = () => {
    console.log("Payment Cancelled or Failed");
    // You can handle the cancellation or failure here.
  };

  return (
    <StripeCheckout
      token={onToken}
      onClose={onCancel}
      name="Package Subscription"
      currency="USD"
      amount={amount * 100} // Convert amount to cents
      stripeKey="pk_test_51LYdhJF0BL68bZ9bNouUaO2Cutn6GjQUDsc7Q1JQRXRAZd4mSRqV3d5G3On4SlM44iWnXlorkDELEGGVF7nBgGpX00buYL644E"
    />
  );
};

export default StripePaymentButton;
