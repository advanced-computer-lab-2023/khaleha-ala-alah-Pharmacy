import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./cart-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Separator from "./separator.jsx";
import styles from "./cart.module.css";
import LoadingPage from "./LoadingPage.jsx";
import NavBar from "../Elements/NavBar.jsx";
import Header from "../Elements/Header.jsx";
import trashIcon from "../Images/trash.png";

const CartPage = () => {
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [priceFlag, setPriceFlag] = useState(false);

  const handleContinueShopping = () => {
    navigate("/patientHome");
  };

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
      currentQuantity = currentQuantity-1;
      if(currentQuantity ==0 ){
        try{
          fetch('http://localhost:4000/notifications', {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
              title: "Medicine is outofstock",
              text: "your medicine is outofstock" ,
            }),
          });
        }
        catch(error){
          console.error("notficaion is not saved yet", error);
        }

      }

      console.log(totalPrice);

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
    console.log(cartItems);
    // Navigate to the "/checkout" route with cart items and total price
    navigate("/checkout", { state: { cartItems, totalPrice } });
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    const fetchCartItems = async () => {
      const response = await fetch(
        "http://localhost:4002/patients/currentPatient",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      const patientId = data.data.patient.userID;

      try {
        const id = patientId;
        const response = await axios.get(
          `http://localhost:4002/patients/viewcartitems/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [updateCart]); // Add dependencies as needed

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === "nadaebrahim" && totalPrice > 500) {
      setTotalPrice(totalPrice - 500);
      alert("Successfully applied");
    } else {
      alert("Invalid promo code");
    }
  };

  const handleFeesAndTax = (total) => {
    const deliveryFees = 20;
    const tax = total * 0.05; // 12% of total
    const subtotal = total + deliveryFees + tax;
    if (priceFlag == false) {
      setPriceFlag(true);
      setTotalPrice(subtotal);
    }
    return subtotal.toFixed(2);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Header />
          <NavBar />
          <div className={styles.wholeCartContainer}>
            <h1>Your Cart</h1>
          </div>
          <div className={styles.buttonOfContinueShopping}>
            <button
              className={styles.continueShoppingButton}
              onClick={handleContinueShopping}
            >
              {" "}
              Continue shopping
            </button>
          </div>
          <Separator />
          <div className={styles.cartContainer}>
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.medicine._id} className={styles.cartItem}>
                  <div className={styles.itemDetails}>
                    <img
                      src={item.medicine.pictureUrl}
                      alt="medicineImg"
                      style={{
                        width: "85px",
                        height: "85px",
                      }}
                    />
                    <span className={styles.itemName}>
                      {item.medicine.name}
                    </span>
                  </div>
                  <div className={styles.itemControls}>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          handleDecrement(item.medicine._id, item.quantity)
                        }
                      >
                        -
                      </button>
                      <span className={styles.numQuantity}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrement(item.medicine._id, item.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className={styles.itemPrice}>
                    ${(item.medicine.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveFromCart(item.medicine._id)}
                    className={styles.removeButton}
                  >
                    <img
                      src={trashIcon}
                      alt="Remove"
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.cartSummary}>
              <span
                className={styles.summaryDetails}
                style={{ fontWeight: "bold" }}
              >
                Enter Promo Code
              </span>
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <button
                onClick={applyPromoCode}
                className={styles.summaryDetails}
                style={{
                  backgroundColor: "rgb(106, 163, 106)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Apply{" "}
              </button>
              <div className={styles.summaryDetails}>
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} EGP</span>
              </div>
              <div className={styles.summaryDetails}>
                <span>Delivery Fees</span>
                <span>20 EGP</span>
              </div>
              <div className={styles.summaryDetails}>
                <span>Tax</span>
                <span>5%</span>
              </div>
              <div className={styles.summaryDetails}>
                <span>Subtotal</span>
                <span> {handleFeesAndTax(totalPrice)} EGP</span>
              </div>
              <button
                onClick={handleCheckoutClick}
                className={styles.checkoutButton}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
