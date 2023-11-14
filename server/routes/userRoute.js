const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { CheckAuth } = require("../middlewares/auth");
const {upload}=require("../server");


// Register route
router.post('/register',upload.array("files",3), userController.registerUser);
router.post('/login', userController.login);
router.post('/validateToken', userController.validateToken);
router.post('/verifyUser', userController.verifyUser);
router.post('/changePassword',CheckAuth, userController.changePassword);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);



module.exports = router;
