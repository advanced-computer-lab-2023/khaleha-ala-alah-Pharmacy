const Package = require("../models/packageModel");

exports.getAllPackages = async function (req, res) {
  try {
    console.log(Package.find());
    const packages = await Package.find();
    res.status(200).json({
      status: "success",
      results: packages.length,
      data: {
        packages,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.addPackage = async function (req, res) {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPackage,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.updatePackage = async function (req, res) {
  try {
    const {
      id,
      name,
      price,
      description,
      doctorDiscount,
      medicalDiscount,
      familyDiscount,
    } = req.body;

    // Use findByIdAndUpdate to find and update the user by ID
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        doctorDiscount,
        medicalDiscount,
        familyDiscount,
      },
      { new: true } // Set new: true to return the updated user
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Respond with the updated user
    res.status(200).json(updatedPackage);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.deletePackage = async function (req, res) {
  try {
    const {
      id,
      name,
      price,
      description,
      doctorDiscount,
      medicalDiscount,
      familyDiscount,
    } = req.body;

    // Use findByIdAndUpdate to find and update the user by ID
    const updatedPackage = await Package.findByIdAndDelete(
      id,
      { new: true } // Set new: true to return the updated user
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Respond with the updated user
    res.status(200).json(updatedPackage);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
