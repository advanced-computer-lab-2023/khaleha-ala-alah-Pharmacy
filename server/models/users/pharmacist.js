const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

// Define the pharmacist schema
const pharmacistSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address.",
      },
    },
    
    hourlyRate: {
      type: Number,
      required: true,
    },
  
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birthdate: {
      type: Date,
      required: false,
    },
    affiliation: {
      type: String,
      required: true,
    },
    educationalBackground: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Export the pharmacist model
const pharmacist = mongoose.model("pharmacist", pharmacistSchema);

module.exports = pharmacist;