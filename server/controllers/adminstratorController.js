const Admin = require("../models/users/adminModel");
const Patient = require("../models/users/patientModel"); // Replace with the appropriate model
const Doctor = require("../models/users/doctorModel");
const User = require("../models/users/user");
// const faker = require("faker");
exports.getAllAdmins = async function (req, res) {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      status: "success",
      results: admins.length,
      data: {
        admins,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
// Create a new admin

exports.addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new admin user with the provided data
    const newAdmin = await Admin.create({
      username,
      password,
    });

    // Create a new user record with the role "admin" and email set to username@gmail.com
    const newUser = await User.create({
      username,
      password,
      role: "admin",
      email: `${username}@gmail.com`, // Set the email as username@gmail.com
      name: username, // Set the name to the username
    });

    res.status(201).json({
      status: "success",
      data: { newAdmin: newAdmin },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// remove patient/admin/doctor from system

exports.delAdminDoctorPatient = async (req, res) => {
  var { role, name } = req.body;
  name = name.trim();
  console.log(name);
  try {
    let deletedCount;

    if (role === "patient") {
      // Delete a patient
      const result = await Patient.deleteOne({ username: name });
      deletedCount = result.deletedCount;
    } else if (role === "admin") {
      // Delete an admin
      console.log("admin");
      const result = await Admin.deleteOne({ username: name });

      console.log(result + "hahahhahah" + object);
      deletedCount = result.deletedCount;
    } else if (role === "doctor") {
      // Delete a doctor
      // const result = await Admin.deleteOne({ username: name });

      const result = await Doctor.deleteOne({ username: name });
      deletedCount = result.deletedCount;
    } else {
      return res.status(400).json({ error: "Invalid role specified." });
    }

    if (deletedCount === 0) {
      return res.status(404).json({ error: `${role} not found.` });
    }
    const userDeleted = await User.deleteOne({ username: name });
    if (userDeleted.deletedCount === 0) {
      return res.status(404).json({ error: `User ${name} not found.` });
    }
    return res.status(200).json({ message: `${role} deleted successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
exports.viewPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ status: "pending" }).select({
      Password: 0,
      confirmPassword: 0,
      _id: 0,
      __v: 0,
      userID: 0,
    });
    console.log(pendingDoctors);
    res.status(200).json({
      status: "success",
      results: pendingDoctors.length,
      data: {
        pendingDoctors,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "NO PENDING DOCTORS",
    });
  }
};

//approve and reject doctor
exports.approveDoctor = async (req, res) => {
  try {
    const{type}=req.headers;
    if(type!=="approve" && type!=="reject"){
      return res.status(400).json({ error: "Invalid type specified." });
    }
    const { username } = req.body;
    let doctor=await Doctor.findOne({ username: username });
    if(!doctor){
      return res.status(404).json({ error: "Doctor not found." });
    }
    type==="approve"?doctor.status="accepted":doctor.status="rejected";
    await doctor.save();
    doctorID=doctor.userID;
    doctor=await User.findOne({ _id: doctorID });
    type==="approve"?doctor.doctorApproved=true:doctor.doctorApproved=false;
    await doctor.save();
    return res.status(200).json({ message: `Doctor approved successfully.` });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

// ...
