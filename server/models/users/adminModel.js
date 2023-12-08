const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
  }
});
const Admin = mongoose.model("Admin", userSchema);

module.exports = Admin;
