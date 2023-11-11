const Wallet = require('../models/Wallet');

// Function to add amount to the wallet
const addToWallet = async (userId, amountToAdd) => {
  try {
    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      // If the wallet doesn't exist, you can choose to create one or handle it based on your application logic.
      // For simplicity, let's create a new wallet for the user.
      const newWallet = new Wallet({
        user: userId,
        amount: amountToAdd,
      });
      await newWallet.save();
    } else {
      wallet.amount += amountToAdd;
      await wallet.save();
    }

    return { success: true, message: 'Amount added to the wallet successfully.' };
  } catch (error) {
    console.error('Error adding amount to wallet:', error);
    return { success: false, message: 'Error adding amount to the wallet.' };
  }
};

// Function to decrement amount from the wallet
const decrementFromWallet = async (userId, amountToDecrement) => {
  try {
    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      return { success: false, message: 'Wallet not found.' };
    }

    if (wallet.amount < amountToDecrement) {
      return { success: false, message: 'Insufficient funds in the wallet.' };
    }

    wallet.amount -= amountToDecrement;
    await wallet.save();

    return { success: true, message: 'Amount decremented from the wallet successfully.' };
  } catch (error) {
    console.error('Error decrementing amount from wallet:', error);
    return { success: false, message: 'Error decrementing amount from the wallet.' };
  }
};

module.exports = {
  addToWallet,
  decrementFromWallet,
};
