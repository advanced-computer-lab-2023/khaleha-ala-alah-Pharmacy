const conversationModel = require('../models/conversationModel');

// Create a conversation
exports.createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const conversation = await conversationModel.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (conversation) {
            return res.status(200).json({ conversation });
        }
        const newConversation = new conversationModel({
            members: [senderId, receiverId],
        });
        const savedConversation = await newConversation.save();
        res.status(200).json({ conversation: savedConversation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get conversations
exports.getConversations = async (req, res) => {
    try {
        const conversations = await conversationModel.find({
            members: { $in: [req.user._id] },
        });
        res.status(200).json({ conversations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



