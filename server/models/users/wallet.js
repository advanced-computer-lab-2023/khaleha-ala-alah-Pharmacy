const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: {
    type: String,// You can associate the wallet with a user if needed
  required : true, // Reference to the User model
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
