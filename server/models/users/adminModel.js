const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
  },
  name: {
    type: String,
    required: [false, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [false, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});
const Admin = mongoose.model("Admin", userSchema);

module.exports = Admin;
