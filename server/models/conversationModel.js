const moongose = require('mongoose');

const conversationSchema = new moongose.Schema({
    members: {
        type: Array 
    },
}, { timestamps: true });

const conversationModel = moongose.model('conversation', conversationSchema);
module.exports = conversationModel;