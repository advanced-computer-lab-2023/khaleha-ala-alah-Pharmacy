import React, { useEffect } from "react";
import styles from "./cartAlert.module.css";
import Icon from "../Images/doneIcon.png";

const CartAlert = ({ hideAlert, viewCart }) => {
  useEffect(() => {
    // Set the timer
    const timer = setTimeout(() => {
      hideAlert(); // This will close the alert after 5 seconds
    }, 4000); // 5000 milliseconds = 5 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [hideAlert]);

  return (
    <div className={styles.styleforcartAlert}>
      <div className={styles.ContainerforImgandP}>
        <img
          src={Icon}
          alt="Success Icon"
          className={styles.ImgforCartAlert}
        />
        <p>Item is successfully added to cart</p>
      </div>
      <div className={styles.ContainerforButtons}>
        <button className={styles.viewCartButton} onClick={viewCart}>View Cart</button>
        <button className={styles.hideButton} onClick={hideAlert}>Close</button>
      </div>
    </div>
  );
};

export default CartAlert;
