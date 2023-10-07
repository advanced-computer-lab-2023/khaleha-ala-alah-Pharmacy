const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    OTP: { type: String, required: true },
}, { timestamps: true });

const userVerificationModel = mongoose.model('userVerification', userVerificationSchema);
module.exports = userVerificationModel;