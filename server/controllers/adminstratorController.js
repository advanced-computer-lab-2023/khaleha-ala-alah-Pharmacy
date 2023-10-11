const Admin = require("../models/users/adminModel");
const Patient = require("../models/users/patientModel"); // Replace with the appropriate model
const pharmacist = require("../models/users/pharmacist");
const User = require("../models/users/user");
const Medicine = require("../models/medicine"); // Import the Medicine model
// const faker = require("faker");

exports.getAvailableMedicines = async (req, res) => {
  try {
    // Find medicines where availableQuantity is greater than 0
    const availableMedicines = await Medicine.find({
      availableQuantity: { $gt: 0 },
    }).select("price description pictureUrl");

    res.status(200).json(availableMedicines);
  } catch (error) {
    res.status(500).json({ error: "Error getting available medicines" });
  }
};

exports.getPharmacistDetails = async (req, res) => {
  try {
    const { pharmacistId } = req.params; // Get the pharmacist ID from the route parameters

    // Find the pharmacist by ID
    const pharmacist = await pharmacist.findById(pharmacistId);

    if (!pharmacist) {
      return res.status(404).json({ error: "Pharmacist not found" });
    }

    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: "Error getting pharmacist details" });
  }
};

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

// remove patient/admin/pharmacist from system

exports.delAdminpharmacistPatient = async (req, res) => {
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

      //   console.log(result + "hahahhahah" + object);
      deletedCount = result.deletedCount;
    } else if (role === "pharmacist") {
      // Delete a pharmacist
      // const result = await Admin.deleteOne({ username: name });

      const result = await pharmacist.deleteOne({ username: name });
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
exports.viewPendingPharmacists = async (req, res) => {
  try {
    const pendingPharmacists = await pharmacist
      .find({ status: "pending" })
      .select({
        Password: 0,
        confirmPassword: 0,
        _id: 0,
        __v: 0,
        userID: 0,
      });
    // console.log(pendingPharmacists);
    res.status(200).json({
      status: "success",
      results: pendingPharmacists.length,
      data: {
        pendingPharmacists,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "NO PENDING PHARMACISTS",
    });
  }
};

//approve and reject pharmacist
exports.approvepharmacist = async (req, res) => {
  try {
    const { type } = req.headers;
    if (type !== "approve" && type !== "reject") {
      return res.status(400).json({ error: "Invalid type specified." });
    }
    const { username } = req.body;
    let pharmacist = await pharmacist.findOne({ username: username });
    if (!pharmacist) {
      return res.status(404).json({ error: "pharmacist not found." });
    }
    type === "approve"
      ? (pharmacist.status = "accepted")
      : (pharmacist.status = "rejected");
    await pharmacist.save();
    pharmacistID = pharmacist.userID;
    pharmacist = await User.findOne({ _id: pharmacistID });
    type === "approve"
      ? (pharmacist.pharmacistApproved = true)
      : (pharmacist.pharmacistApproved = false);
    await pharmacist.save();
    return res
      .status(200)
      .json({ message: `pharmacist approved successfully.` });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ...
