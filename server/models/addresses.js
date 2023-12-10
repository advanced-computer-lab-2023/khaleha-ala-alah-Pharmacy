const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

// Define the Address schema
const addressSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  addresses: {
    type: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => validator.isLength(value, { min: 1, max: 255 }),
          message: 'Address must be between 1 and 255 characters',
        },
      },
    ],
    default: [],
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
