const Admin = require("../models/users/adminModel");
const Patient = require("../models/users/patientModel"); // Replace with the appropriate model
const pharmacist = require("../models/users/pharmacist");
const User = require("../models/users/user");
const Medicine = require("../models/medicine"); // Import the Medicine model
const Order = require("../models/order");

// const faker = require("faker");

exports.getAvailableMedicines = async (req, res) => {
  try {
    // Find medicines where availableQuantity is greater than 0
    const availableMedicines = await Medicine.find();

    res.status(200).json(availableMedicines);
  } catch (error) {
    res.status(500).json({ error: "Error getting available medicines" });
  }
};
exports.getMedicinesByMedicalUse = async (req, res) => {
  try {
    const { medicalUse } = req.query; // Get the selected medical use from the query parameters

    // Find medicines where availableQuantity is greater than 0 and match the selected medical use
    const availableMedicines = await Medicine.find({
      medicalUse: medicalUse, // Filter by the selected medical use
    });

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

    // Create a new user record with the role "admin" and email set to username@gmail.com
    const newUser = await User.create({
      username,
      password,
      role: "admin",
      email: `${username}@gmail.com`, // Set the email as username@gmail.com
      name: username, // Set the name to the username
    });

    newUser.save();

    // Create a new admin user with the provided data
    const newAdmin = await Admin.create({
      username,
      userID: newUser._id,
    });

    newAdmin.save();

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
  const { role, name } = req.body;

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
      const admins = await Admin.find();
      for (let i = 0; i < admins.length; i++) {
        console.log(admins[i]);
      }
      const result = await Admin.deleteOne({ username: name });

      console.log(result.deletedCount);
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
exports.viewPendingpharmacists = async (req, res) => {
  try {
    const pendingpharmacists = await pharmacist
      .find({ status: "pending" })
      .select({
        Password: 0,
        confirmPassword: 0,
        _id: 0,
        __v: 0,
        userID: 0,
      });
    console.log(pendingpharmacists);
    res.status(200).json({
      status: "success",
      results: pendingpharmacists.length,
      data: {
        pendingpharmacists,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "NO PENDING pharmacistS",
    });
  }
};

//approve and reject pharmacist
exports.approvepharmacist = async (req, res) => {
  try {
    console.log("aafsdfd");
    const { type } = req.headers;
    console.log(type + "<<<<<<<<<<<<<<<");
    if (type !== "approve" && type !== "reject") {
      return res.status(400).json({ error: "Invalid type specified." });
    }
    const { username } = req.body;
    console.log("aloooooooooooooooooooooooooooooooooooooo");
    let Pharmacist = await pharmacist.findOne({ username: username });
    if (!Pharmacist) {
      return res.status(404).json({ error: "pharmacist not found." });
    }
    console.log("iofwaoipfwoihf<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    type === "approve"
      ? (Pharmacist.status = "accepted")
      : (Pharmacist.status = "rejected");
    await Pharmacist.save();
    // pharmacistID=Pharmacist.userID;
    pharma = await User.findOne({ _id: Pharmacist.userID });
    type === "approve"
      ? (pharma.pharmacistApproved = true)
      : (pharma.pharmacistApproved = false);
    await pharma.save();
    return res
      .status(200)
      .json({ message: `pharmacist ${type} successfully.` });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.getCurrentUserAdmin = async (req, res) => {
  try {
    console.log("ALO");
    console.log(req.user._id);
    const adminUser = await User.findOne({ _id: req.user._id });
    const admin = await Admin.findOne({ username: adminUser.username });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }
    return res.status(200).json({
      admin: admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
exports.getMedicineSalesReport = async (req, res) => {
  const { year, month } = req.params;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const salesReport = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: "Pending",
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.medicine",
          totalQuantity: { $sum: "$items.quantity" },
          totalSales: { $sum: "$items.totalPrice" },
        },
      },
      {
        $lookup: {
          from: "medicines",
          localField: "_id",
          foreignField: "_id",
          as: "medicineDetails",
        },
      },
      {
        $project: {
          _id: 0,
          medicine: { $arrayElemAt: ["$medicineDetails", 0] },
          totalQuantity: 1,
          totalSales: 1,
        },
      },
      {
        $group: {
          _id: null,
          totalSalesForAllMedicines: { $sum: "$totalSales" },
          medicines: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSalesForAllMedicines: 1,
          medicines: 1,
        },
      },
    ]);

    res.json(salesReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
