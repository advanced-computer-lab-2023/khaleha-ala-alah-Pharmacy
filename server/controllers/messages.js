const messageModel = require('../models/messageModel');
const mongoose = require('mongoose');

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});


// Create a message
exports.createMessage = async (req, res) => {
    try {
        let media;
        if (req.file) {
            media = req.file.id;
        }
        const { conversationId, senderId, text } = req.body;
        const newMessage = new messageModel({
            conversationId,
            sender: senderId,
            text,
            media,
        });
        const savedMessage = await newMessage.save();
        res.status(200).json({ message: savedMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all messages in a conversation
exports.getMessages = async (req, res) => {
    try {
        const messages = await messageModel.find({
            conversationId: req.params.conversationId
        });

        const messagesWithFiles = await Promise.all(
            messages.map(async (message) => {
                if (message.media) {
                    const file= await gfs.find({ _id: message.media }).toArray();
                    const fileType = file[0].contentType;
                    const fileStream = gfs.openDownloadStream(message.media);
                    const chunks = [];
                    return new Promise((resolve, reject) => {
                        fileStream.on('data', (chunk) => {
                            chunks.push(chunk);
                        });
                        fileStream.on('end', () => {
                            const fileData = Buffer.concat(chunks);
                            resolve({ ...message.toObject(), fileData, fileType });
                        });
                        fileStream.on('error', (error) => {
                            reject(error);
                        });
                    });
                } else {
                    return message.toObject();
                }
            })
        );

        res.status(200).json({ messages: messagesWithFiles });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
