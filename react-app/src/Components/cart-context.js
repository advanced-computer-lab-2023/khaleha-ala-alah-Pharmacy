import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context with initial values
export const CartContext = createContext();


// Function to generate a default cart


// C// ... (previous code)

// Cart provider component
export const CartProvider = ({ children }) => {
    const getDefaultCart = async () => {
  let cart = {};
  
  try {
    // Fetch available medicines from the API
    const response = await axios.get('http://localhost:4000/admins/available-medicines');
    const availableMedicines = response.data;

    // Initialize the cart with default quantity (0) for each medicine
    availableMedicines.forEach((medicine) => {
      cart[medicine._id] = { id: medicine._id, name: medicine.name, quantity: 0 , price : medicine.price };
    });
  setCart(cart);
  } catch (error) {
    console.error('Error fetching available medicines:', error);
  }

  return cart;
};
  const [cart, setCart] = useState({});
  const [address , setAddress] = useState('');

  const updateAddress  = (ad) =>{
    setAddress(ad);

  }
  // Function to update the cart by adding or subtracting quantity
  const updateCart = (itemId, action) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      if (action === 'add') {
        // Add 1 to the previous quantity
        updatedCart[itemId] = {
          ...prevCart[itemId],
          quantity: (prevCart[itemId]?.quantity || 0) + 1,
        };
      } else if (action === 'subtract') {
        // Decrement 1 from the previous quantity
        if (prevCart[itemId]?.quantity > 0) {
          updatedCart[itemId] = {
            ...prevCart[itemId],
            quantity: prevCart[itemId].quantity - 1,
          };
        }
      }
console.log(updatedCart)
      return updatedCart;
    });
  };

  // Initialize the cart when the component mounts
  useEffect(() => {
    const initializeCart = async () => {
      const defaultCart = await getDefaultCart();
      setAddress('');
      setCart(defaultCart);
   
   

    };

    initializeCart();
  }, []);

  // Other functions and state can be added as needed

  return (
    <CartContext.Provider value={{ cart, updateCart ,address,updateAddress}}>
      {children}
    </CartContext.Provider>
  );
};
