import React, { useState } from 'react';

const WalletAmount = ({ amount, onTopUp }) => {
  const [topUpAmount, setTopUpAmount] = useState(0);

  const handleTopUp = () => {
    // Perform any validation on topUpAmount if needed
    // For now, assuming the amount is a positive number
    if (topUpAmount > 0) {
      onTopUp(topUpAmount);
      setTopUpAmount(0); // Reset the input field after topping up
    }
  };

  return (
    <div className="wallet-amount">
      <h1>Your Wallet Amount</h1>
      <p>Amount: ${amount}</p>

      <div>
        <label htmlFor="topUpAmount">Top Up Amount: $</label>
        <input
          type="number"
          id="topUpAmount"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(parseFloat(e.target.value) || 0)}
        />
        <button onClick={handleTopUp}>Top Up</button>
      </div>
    </div>
  );
};

export default WalletAmount;
