const express = require('express');
const router = express.Router();
const conversations  = require('../controllers/conversations');


router.post('/', conversations.createConversation);
router.get('/', conversations.getConversations);
router.post('/deleteMessagesNotification', conversations.deleteMessagesNotification);


module.exports = router;