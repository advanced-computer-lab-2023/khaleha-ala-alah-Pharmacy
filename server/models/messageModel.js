const moongose = require('mongoose');

const messageSchema = new moongose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
    media: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'uploads.files'
    },
}, { timestamps: true });

const messageModel = moongose.model('message', messageSchema);
module.exports = messageModel;