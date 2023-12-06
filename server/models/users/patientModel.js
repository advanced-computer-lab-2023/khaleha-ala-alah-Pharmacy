const mongoose = require("mongoose");
const validator = require("validator");
// const familyMembers = require('./familyMemberModel');
// const emergencyContactSchema = require('./emergencyContactModel');

const emergencyContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide the full name of your emergency contact"],
  },
  mobileNumber: {
    type: String,
    required: [
      true,
      "Please provide the mobile number of your emergency contact",
    ],
  },
  relation: {
    type: String,
    required: [true, "Please provide the relation of your emergency contact"],
    validate: {
      // relation to the patient has to be restricted to wife/husband and/or children
      validator: function (el) {
        return el === "wife" || el === "husband" || el === "children";
      },
      message:
        "Relation to the patient has to be restricted to wife/husband and/or children",
    },
  },
});
const familyMemberSchema = new mongoose.Schema({
  userID: {
    type: String,
    //required: true, sheel elcomment law kol el family members lazm yb2o patients
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  nationalID: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  relationToPatient: {
    type: String,
    required: [true, "Please provide the relation of your emergency contact"],
    validate: {
      // relation to the patient has to be restricted to wife/husband and/or children
      validator: function (el) {
        return el === "wife" || el === "husband" || el === "children";
      },
      message:
        "Relation to the patient has to be restricted to wife/husband and/or children",
    },
  },
});
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Please tell us your gender"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please tell us your age"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please tell us your mobile number"],
    unique: true,
  },
  packageName: {
    type: String,
    default: "none",
  },
  doctorsDiscount: {
    type: Number,
    default: 0,
  },
  medicalDiscount: {
    type: Number,
    default: 0,
  },
  familyDiscount: {
    type: Number,
    default: 0,
  },
  selfSubscription: {
    type: Boolean,
    default: false,
  },
  packageEndDate: {
    type: Date,
    default: null,
  },

  EmergencyContact: emergencyContactSchema,
  familyMembers: {
    type: [familyMemberSchema],
    default: [],
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
    },
  ],
});

const Patient = mongoose.model("Patient", userSchema);

module.exports = Patient;
