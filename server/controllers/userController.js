const userModel = require('../models/users/user');
const patientModel = require('../models/users/patientModel');
const userVerificationModel = require('../models/userVerification');
const pharmacistModel = require('../models/users/pharmacist');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateName,validateEmail,validatePassword,validateMobileNumber,validateGender,validateDateOfBirth,validateRole}= require('../utilities/validations');
const nodeMailer = require('nodemailer');


//generate token
const generateToken = (_id,role) => {
    return jwt.sign({ _id,role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}

//send verification mail
exports.sendVerificationMail = async ({ email }) => {
    try {
      const OTP = Math.floor(1000 + Math.random() * 9000);
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'el7a2nii@gmail.com',
          pass: 'paun nhxi kkqw qvjv',
        },
      });
      const mailOptions = {
        from: 'el7a2nii@gmail.com',
        to: email,
        subject: 'OTP for verification',
        html: `<h1>Your OTP for verification is ${OTP}</h1>`,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
        return OTP;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  //send OTP
  exports.sendOTP = async (email,_id) => {
    try {
     const OTP = await this.sendVerificationMail({ email });
     const salt = await bcrypt.genSalt(10);
     const hashedOtp = await bcrypt.hash(OTP.toString(), salt);
     const userVerification = new userVerificationModel({
         userId: _id,
         OTP: hashedOtp,
     });
     await userVerification.save();
    } catch (error) {
     throw new Error(error.message);
    }
 };
 
 // Verify user
 exports.verifyUser = async (req, res) => {
     try {
         const { OTP} = req.body;
         const token = req.headers.authorization.split(' ')[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const userID = decoded._id;
         const userVerification = await userVerificationModel.findOne({ userId: userID });
         const validOTP = await bcrypt.compare(OTP.toString(), userVerification.OTP);
         if (!validOTP) {
             return res.status(400).json({ error: 'Invalid OTP' });
         }
         await userVerificationModel.deleteOne({ userId: userID });
         await userModel.updateOne({ _id:userID}, { verified: true });
         res.status(200).json({ message: 'User verified successfully' });
     } catch (err) {
         res.status(500).json({ error: err.message });
     }
 }

   // Register
exports.registerUser = async (req, res) => {
    try {
        const role=req.headers.role;
        if(!role){
            return res.status(400).json({error : "Role not specified"});
        }
        const {username,name, email, password } = req.body;       
        // Validate inputs
        validateName(name);validateEmail(email);validatePassword(password);
        
        // Check if user already exists
        let user=await userModel.findOne({username});
        if(user){
            return res.status(400).json({error : "User already exists"});
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        user = new userModel({
          username,
          name,
          password: hashedPassword,
          role
        });
        await user.save();

        // Create patient or pharmacist
        if (role === 'patient') {
          const {dateOfBirth,gender,mobileNumber,emergencyName,emergencyNumber}=req.body;
          validateGender(gender);validateMobileNumber(mobileNumber);
          validateName(emergencyName);validateMobileNumber(emergencyName);
          const patient = new patientModel({
            userID: user._id,
            username,
            name,
            email,
            gender,
            dateOfBirth,
            mobileNumber,
            emergencyContact: {
              name: emergencyName,
              number: emergencyNumber,
            }
          });
          try {
            await patient.save();
          } catch (error) {
            await userModel.deleteOne({_id:user._id});
            return res.status(400).json({error : "Invalid data"});
          }
        }else if(role === 'pharmacist'){
          const{dateOfBirth,hourlyRate,affiliation,speciality,educationalBackground}=req.body;
          const pharmacist = new pharmacistModel({
            userID: user._id,
            username,
            name,
            email,
            DOB:dateOfBirth,
            hourlyRate,
            affiliation,
            speciality,
            educationalBackground,
            status: 'pending',
          });
          try {
            await pharmacist.save();
          } catch (error) {
            console.log(error);
            await userModel.deleteOne({_id:user._id});
            return res.status(400).json({error : "Invalid data"});
          }
        }
        //send OTP
        await this.sendOTP(email,user._id);
        //generate token
        const token = generateToken(user._id, user.role);
        res.status(200).json({ message: 'User registered successfully',token:token,role:user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
  try {
      const { username, password } = req.body;
      // Check if user exists
      let user=await userModel.findOne({username});
      if(!user){
          return res.status(400).json({error : "User does not exists"});
      }
      //validate password
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword){
          return res.status(400).json({error : "Invalid password"});
      }
      //check if user is pharmacist and not approved yet
      if(user.role === 'pharmacist' && !user.pharmacistApproved){
        
        let pharmacist=await pharmacistModel.findOne({userID:user._id});
        
        if(pharmacist.status === 'pending'){
            return res.status(400).json({error : "pharmacist not approved yet"});
        }else if(pharmacist.status === 'rejected'){
            return res.status(400).json({error : "pharmacist rejected"});
        }

      }
      //generate token
      const token = generateToken(user._id, user.role);
      //check if user is not verified send OTP
      if(!user.verified){
        if(user.role === 'pharmacist'){
          let pharmacist=await pharmacistModel.findOne({userID:user._id});
          email=pharmacist.email;
        }else if (user.role === 'patient'){
          let patient=await patientModel.findOne({userID:user._id});
          email=patient.email;
        }else{
          return res.status(500).json({error : "internal server error"});
        }
        await this.sendOTP(email,user._id);
        return res.status(400).json({error : "User not verified yet",token:token,role:user.role});
      }
      res.status(200).json({ message: 'User logged in successfully',token:token,role:user.role });

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}
//change password
exports.changePassword = async (req, res) => {
  try {
    const { username,oldPassword, newPassword } = req.body;
    //validate password
    validatePassword(newPassword);
    //check if user exists
    let user = await userModel.findOne({username});
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //validate old password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Wrong password" });
    }
    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update password
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};
//forget password
exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    //check if user exists
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //check if user is verified
    if (!user.verified) {
      return res.status(400).json({ error: "User not verified yet" });
    }
    //get user email
    const role = user.role;
    let userEmail;
    if (role === "pharmacist") {
      let pharmacist = await pharmacistModel.findOne({ userID: user._id });
      userEmail = pharmacist.email;
    } else if (role === "patient") {
      let patient = await patientModel.findOne({ userID: user._id });
      userEmail = patient.email;
    }
    //save userID and token in resetPassword collection
    const uniqueToken = generateResetPasswordToken();
    const resetPassword = new resetPasswordModel({
      userId: user._id,
      token: uniqueToken,
    });
    await resetPassword.save();
    //send mail
    await this.sendResetPasswordMail({ email: userEmail, token: uniqueToken });
    return res.status(200).json({ message: "Mail sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    //validate password
    validatePassword(newPassword);
    //check if token exists
    let ticket = await resetPasswordModel.findOne({ token });
    if (!ticket) {
      return res.status(400).json({ error: "Invalid token" });
    }
    //get user
    const user = await userModel.findOne({ _id: ticket.userId });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update password
    user.password = hashedPassword;
    await user.save();
    //delete ticket
    await resetPasswordModel.deleteOne({ userId: ticket.userId });
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

//validate token
exports.validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Token not provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decoded._id;
      let user = await userModel.findOne({ _id: userID });
      if (!user) {
        return res.status(400).json({ error: "User does not exists" });
      }
      if (!user.verified) {
        return res.status(400).json({ error: "User not verified yet" });
      }
      if (user.role === "pharmacist" && !user.doctorApproved) {
        return res.status(400).json({ error: "pharmacist not approved yet" });
      }
      console.log("role: " + decoded.role);
      return res.status(200).json({ role: decoded.role });
    } catch (error) {
      return res.status(400).json({ error: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};







