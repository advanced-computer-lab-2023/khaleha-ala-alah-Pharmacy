const mongoose = require('mongoose');
const user = require('./users/user');

const userVerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    OTP: { type: String, required: true },
}, { timestamps: true });
userVerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const userVerificationModel = mongoose.model('userVerification', userVerificationSchema);
module.exports = userVerificationModel;