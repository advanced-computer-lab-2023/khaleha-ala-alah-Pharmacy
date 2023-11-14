const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    // You can also add unique: true if you want each user to have a unique wallet
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Method to add amount to the wallet or create a new wallet if not available
walletSchema.methods.addAmount = async function (amount) {
  if (this.amount + amount < 0) {
    throw new Error("Cannot have negative balance");
  }
  this.amount += amount;
  await this.save();
};

// Method to remove amount from the wallet
walletSchema.methods.removeAmount = async function (amount) {
  if (this.amount >= amount) {
    this.amount -= amount;
    await this.save();
  } else {
    throw new Error("Insufficient funds");
  }
};

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
