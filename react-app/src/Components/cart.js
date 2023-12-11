import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./cart-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrementApi = async (itemId, currentQuantity) => {
    // Call the API to increment the quantity
    try {
      await axios.put(
        `http://localhost:4002/patients/change-item-quantity/${itemId}`,
        {
          quantity: currentQuantity + 1, // Increment by the current quantity
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // After successfully updating the quantity, update the local cart state
      updateCart(itemId, "addInCart");
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrementApi = async (itemId, currentQuantity) => {
    // Call the API to decrement the quantity
    try {
      await axios.put(
        `http://localhost:4002/patients/change-item-quantity/${itemId}`,
        {
          quantity: currentQuantity - 1, // Decrement by the current quantity
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // After successfully updating the quantity, update the local cart state
      updateCart(itemId, "subtractInCart");
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const handleRemoveFromCartApi = async (itemId) => {
    // Call the API to remove the item from the cart
    try {
      await axios.delete(
        `http://localhost:4002/patients/remove-from-cart/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // After successfully removing the item, update the local cart state
      updateCart(itemId, "removeFromCart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleIncrement = (itemId, currentQuantity) => {
    handleIncrementApi(itemId, currentQuantity);
  };

  const handleDecrement = (itemId, currentQuantity) => {
    handleDecrementApi(itemId, currentQuantity);
  };

  const handleRemoveFromCart = (itemId) => {
    handleRemoveFromCartApi(itemId);
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
            <button onClick={() => handleDecrement(item.medicine._id, item.quantity)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item.medicine._id, item.quantity)}>+</button>
            <button onClick={() => handleRemoveFromCart(item.medicine._id)}>Remove from Cart</button>
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
