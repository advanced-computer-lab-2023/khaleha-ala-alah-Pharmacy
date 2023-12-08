import React, { useState, useEffect } from "react";
import styles from "./Wallet.module.css";

import axios from "axios";

const Wallet = ({ userID }) => {
  console.log("userID", userID);
  userID = "652b512450d1b797fa0a42ef";
  const [walletAmount, setWalletAmount] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    // Fetch the current wallet amount when the component mounts
    fetchWalletAmount();
  }, [userID]);

  const fetchWalletAmount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/patients/amount-wallet/${userID}`
      );
      setWalletAmount(response.data.amountInWallet);
    } catch (error) {
      console.error("Error fetching wallet amount:", error);
    }
  };
  const handleTopUp = () => {
    // Perform any validation on topUpAmount if needed
    // For now, assuming the amount is a positive number
    const parsedAmount = parseFloat(topUpAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      addAmountToWallet(parsedAmount);
      setTopUpAmount(""); // Reset the input field after topping up
    }
  };
  const addAmountToWallet = async (amountToAdd) => {
    try {
      await axios.post("http://localhost:4002/patients/add-amount-Wallet", {
        userID: userID,
        amount: amountToAdd,
      });

      // After topping up, fetch the updated wallet amount
      fetchWalletAmount();
    } catch (error) {
      console.error("Error adding amount to wallet:", error);
    }
  };

  const removeAmountFromWallet = async (amountToRemove) => {
    try {
      await axios.post("http://localhost:4002/patients/remove-from-wallet", {
        userID: userID,
        amount: amountToRemove,
      });

      // After removing, fetch the updated wallet amount
      fetchWalletAmount();
    } catch (error) {
      console.error("Error removing amount from wallet:", error);
    }
  };

  return (
    <div className="wallet-container">
      <h1>Your Wallet Amount</h1>
      <p>Amount: ${walletAmount}</p>

      <div>
        <label htmlFor="topUpAmount">Top Up Amount: $</label>
        <input
          type="number"
          id="topUpAmount"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(e.target.value)}
        />
        <button onClick={handleTopUp}>Top Up</button>
      </div>

      <div className="wallet-actions">
        <button onClick={() => addAmountToWallet(10)}>Add $10 to Wallet</button>
        <button onClick={() => addAmountToWallet(20)}>Add $20 to Wallet</button>
        <button onClick={() => removeAmountFromWallet(5)}>
          Remove $5 from Wallet
        </button>
        {/* Add more buttons or UI elements for other actions */}
      </div>
    </div>
  );
};

export default Wallet;

/* 

<div className={styles.walletContainer}>
      <div className={styles.walletBalanceSection}>
        <div className={styles.walletBalance}>
          <h2>Wallet Balance</h2>
          <p className={styles.amount}>${walletAmount.toFixed(2)}</p>
          <button className={styles.viewTransactionsBtn}>View Transactions</button>
        </div>
        <div className={styles.qrCodeSection}>
          <div className={styles.qrCode}></div>
          <button className={styles.copyQrBtn}>Copy QR Code</button>
        </div>
      </div>

      <div className={styles.walletActions}>
        <button className={styles.actionBtn}>Add Balance</button>
        <button className={styles.actionBtn}>Wallet Transfer</button>
        <button className={styles.actionBtn}>Wallet Withdrawal Request</button>
        <button className={styles.actionBtn}>Wallet Coupon Redeem</button>
      </div>

      <div className={styles.couponSection}>
        <label htmlFor="couponCode" className={styles.couponLabel}>Enter Coupon Code :</label>
        <input
          type="text"
          id="couponCode"
          className={styles.couponInput}
          placeholder="Coupon code"
          // value and onChange handler here
        />
        <button className={styles.redeemCouponBtn}>Redeem Coupon</button>
      </div>
    </div>
  );
};

*/
