const mongoose = require('mongoose');

const messageNotificationSchema = new mongoose.Schema({
    senderName: String,
    senderRole: String,
    receiverId: String,
});

const messageNotification = mongoose.model('messageNotification', messageNotificationSchema);
module.exports = messageNotification