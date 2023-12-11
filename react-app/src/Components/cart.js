import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./cart-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = (itemId) => {
    updateCart(itemId, "addInCart");
  };

  const handleDecrement = (itemId) => {
    updateCart(itemId, "subtractInCart");
  };

  const handleCheckoutClick = () => {
    // Navigate to the "/checkout" route with cart items and total price
    navigate("/checkout", { state: { cartItems, totalPrice } });
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    const fetchCartItems = async () => {
      const response = await fetch("http://localhost:4002/patients/currentPatient", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      const patientId = data.data.patient.userID;

      try {
        const id = patientId;
        const response = await axios.get(`http://localhost:4002/patients/viewcartitems/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response);

        if (response.status !== 200) {
          // Handle error
          console.error("Error fetching cart items:", response.statusText);
          return;
        }

        const data = response.data;
        // Use response.data instead of calling .json()

        // Group and sum quantities by medicine ID
        const groupedCart = data.cart.items.reduce((acc, item) => {
          const itemId = item.medicine._id;

          if (acc[itemId]) {
            acc[itemId].quantity += item.quantity;
          } else {
            acc[itemId] = { ...item };
          }

          return acc;
        }, {});

        setCartItems(Object.values(groupedCart));
        setTotalPrice(data.cart.totalAmount);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [updateCart]); // Add dependencies as needed

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.medicine._id}>
            <span>{item.medicine.name}</span>
            <button onClick={() => handleDecrement(item.medicine._id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item.medicine._id)}>+</button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>

      <button onClick={handleCheckoutClick}>Checkout</button>
    </div>
  );
};

export default CartPage;
