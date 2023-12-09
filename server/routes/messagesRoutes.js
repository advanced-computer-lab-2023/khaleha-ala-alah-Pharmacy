const express = require('express');
const router = express.Router();
const messages = require('../controllers/messages');
const {upload}=require("../server");
const { CheckAuth } = require("../middlewares/auth");


router.get("/notifications",CheckAuth ,messages.getMessagesNotifications);
router.post('/',upload.single("file"), messages.createMessage);
router.get('/:conversationId', messages.getMessages);



module.exports = router;