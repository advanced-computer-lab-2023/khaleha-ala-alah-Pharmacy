const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const pharmacistSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isLength(value, { min: 8 }),
      message: 'Password must contain at least 8 characters.',
    },
  },
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address.',
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
}, { timestamps: true });

// Create a virtual for confirmPassword that won't be stored in the database
pharmacistSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;
