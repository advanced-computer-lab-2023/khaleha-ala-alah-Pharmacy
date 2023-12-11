const mongoose = require('mongoose');
const userModel = require('./user');

const DB='mongodb+srv://magdy_hussien:Mm123456@cluster0.vftrsrv.mongodb.net/el7a2ni';

mongoose.set('strictQuery', true);
mongoose.connect(DB)
 .then(() => {
    console.log('DB connection successful!');
 }).catch(err => {
    console.log('DB connection failed!');
    console.log(err);
 });


const messageNotificationSchema = new mongoose.Schema({
    senderId: String,
    senderName: String,
    senderRole: String,
    receiverId: String,
});

const messageNotification = mongoose.model('messageNotification', messageNotificationSchema);
module.exports = messageNotification


const saveMessage = async (message) => {
    try {
      const { senderId, receiverId } = message;
      console.log('senderId', senderId);
      const sender = await userModel.findOne({_id: senderId}).select('name role');

        const newMessage = new messageNotification({
            senderId: senderId,
            senderName: sender.name,
            senderRole: sender.role,
            receiverId: receiverId,
        });
        await newMessage.save();
      console.log('Message saved to the database:', newMessage);
    } catch (error) {
      console.error('Error saving message to the database:', error);
    }
  };
  
  module.exports = { saveMessage };
