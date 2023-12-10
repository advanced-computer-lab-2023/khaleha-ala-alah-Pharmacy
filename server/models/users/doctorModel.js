const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

// Define the Doctor schema
const doctorSchema = new Schema(
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
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: false,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    fixedSlots: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        hour: {
          type: String, // You can choose an appropriate data type (e.g., Date, String) for the hour
          required: true,
        },
        //   timedAt : {
        //     type: Date,
        //     required: true,
        // }
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birthdate: {
      type: Date,
      required: true,
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
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads.files",
      },
    ],
  },
  { timestamps: true }
);

// Export the Doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
