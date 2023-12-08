const express = require('express');
const { CheckAuth } = require("../middlewares/auth");
const router = express.Router();

const notificationController = require('./../controllers/notificationsController');

router
  .route('/')
  .get(CheckAuth,notificationController.getAllNotifications)
  .post(CheckAuth,notificationController.createNewNotfication)
  .delete(CheckAuth,notificationController.deleteNotfication);

module.exports = router;