const express = require('express');
const router = express.Router();
const conversations  = require('../controllers/conversations');


router.post('/', conversations.createConversation);
router.get('/', conversations.getConversations);


module.exports = router;