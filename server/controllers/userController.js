const userModel = require('../models/users/user');
const patientModel = require('../models/users/patientModel');
const userVerificationModel = require('../models/userVerification');
const doctorModel = require('../models/users/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateName,validateEmail,validatePassword,validateMobileNumber,validateGender,validateDateOfBirth,validateRole}= require('../utilities/validations');
const nodeMailer = require('nodemailer');


//generate token
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
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

        // Create patient or doctor
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
        }else if(role === 'doctor'){
          const{dateOfBirth,hourlyRate,hospital,speciality,educationalBackground}=req.body;
          const doctor = new doctorModel({
            userID: user._id,
            username,
            name,
            email,
            dateOfBirth,
            hourlyRate,
            hospital,
            speciality,
            educationalBackground,
            status: 'pending',
          });
          try {
            await doctor.save();
          } catch (error) {
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
      //check if user is doctor and not approved yet
      if(user.role === 'doctor' && !user.doctorApproved){
        
        let doctor=await doctorModel.findOne({userID:user._id});
        
        if(doctor.status === 'pending'){
            return res.status(400).json({error : "Doctor not approved yet"});
        }else if(doctor.status === 'rejected'){
            return res.status(400).json({error : "Doctor rejected"});
        }

      }
      //generate token
      const token = generateToken(user._id, user.role);

      //check if user is not verified send OTP
      if(!user.verified){
        if(user.role === 'doctor'){
          let doctor=await doctorModel.findOne({userID:user._id});
          email=doctor.email;
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


