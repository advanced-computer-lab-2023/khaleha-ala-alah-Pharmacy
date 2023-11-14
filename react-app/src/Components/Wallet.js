import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Wallet = ({ userID }) => {
    userID =  '652b512450d1b797fa0a42ef';
  const [walletAmount, setWalletAmount] = useState(0);
   const [topUpAmount, setTopUpAmount] = useState('');

  useEffect(() => {
    // Fetch the current wallet amount when the component mounts
    fetchWalletAmount();
  }, [userID]);

  const fetchWalletAmount = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/patients/amount-wallet/${userID}`);
      setWalletAmount(response.data.amountInWallet);
    } catch (error) {
      console.error('Error fetching wallet amount:', error);
    }
  };
  const handleTopUp = () => {
    // Perform any validation on topUpAmount if needed
    // For now, assuming the amount is a positive number
    const parsedAmount = parseFloat(topUpAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      addAmountToWallet(parsedAmount);
      setTopUpAmount(''); // Reset the input field after topping up
    }
  };
  const addAmountToWallet = async (amountToAdd) => {
    try {
      await axios.post('http://localhost:4000/patients/add-amount-Wallet', {
        userID: userID,
        amount: amountToAdd,
      });

      // After topping up, fetch the updated wallet amount
      fetchWalletAmount();
    } catch (error) {
      console.error('Error adding amount to wallet:', error);
    }
  };

  const removeAmountFromWallet = async (amountToRemove) => {
    try {
      await axios.post('http://localhost:4000/patients/remove-from-wallet', {
        userID: userID,
        amount: amountToRemove,
      });

      // After removing, fetch the updated wallet amount
      fetchWalletAmount();
    } catch (error) {
      console.error('Error removing amount from wallet:', error);
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
        <button onClick={() => removeAmountFromWallet(5)}>Remove $5 from Wallet</button>
        {/* Add more buttons or UI elements for other actions */}
      </div>
    </div>
  );
};

export default Wallet;
