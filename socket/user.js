const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'please enter a username' ],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  role : {
    // enum doctor , patient , admin 
    type: String,
    enum: ['doctor','pharmacist', 'patient', 'admin'],
    required: true
  },
  verified :{
    type: Boolean,
    default: false
  },
  doctorApproved :{
    type: Boolean,
    default: false
  }
});

const user = mongoose.model('user', userSchema);

module.exports = user;