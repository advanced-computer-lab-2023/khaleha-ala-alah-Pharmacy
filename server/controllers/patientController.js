const Patient = require("../models/users/patientModel");
const Cart = require("../models/Cart"); // Import the Cart model
const Medicine = require("../models/medicine");
const Order = require("../models/order");
const pharmacist = require("../models/users/pharmacist");
//const Appointments = require("./../models/appointmentModel");
//const Prescriptions = require("./../models/presecriptionsModel.js");

//examples

//examples -- we need api bellow to test with them
// get patient and create patient written here to test add family members

// get all patients

exports.getMypharmacists = async function (req, res) {
  try {
    const patient = req.user._id;
    const pharmacistIds = await Appointments.distinct("pharmacistID", {
      PatientID: patient,
    });
    const pharmacists = await pharmacists.find({
      userID: { $in: pharmacistIds },
    });
    const pharmacistNames = pharmacists.map((pharmacist) => {
      pharmacist.name, pharmacist.speciality;
    });
    res.status(200).json({
      pharmacistNames,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
exports.getAllPatients = async function (req, res) {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      status: "success",
      results: patients.length,
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getPatients = async function (req, res) {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.createPatient = async function (req, res) {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPatient,
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

exports.filterMedicine = async (req, res) => {
  try {
    const uniqueMedicalUses = await medicine.distinct("medicalUse");
    res.status(200).json({ uniqueMedicalUses });
  } catch (error) {
    console.error("Error fetching unique medical uses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.searchMedicineByName = async function (req, res) {
  try {
    const prefix = req.query.prefix; // Access the 'prefix' from the request body

    const medicines = await medicine.find({
      name: { $regex: new RegExp(`^${prefix}`, "i") }, // 'i' for case-insensitive
    });

    res.status(200).json({ medicines });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addFamilyMembers = async function (req, res) {
  try {
    const patient = await Patient.find({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Create a new family member based on the request body
    const newFamilyMember = {
      name: req.body.name,
      nationalID: req.body.nationalID,
      age: req.body.age,
      gender: req.body.gender,
      relationToPatient: req.body.relationToPatient,
    };

    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(newFamilyMember);

    // Save the patient with the updated familyMembers array
    const updatedPatient = await patient.save();

    res.status(201).json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
};
/*exports.addToCart = async function (req, res) {
  const medicineId = req.body.medicineId;
  const quantity = parseInt(req.body.quantity);

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number." });
  }
  try {
    const patient = await Patient.find({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Find the medicine by ID
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found." });
    }

    // Calculate the total price for the cart item
    const totalItemPrice = medicine.price * quantity;

    // Check if the patient already has a cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create a new cart if the patient doesn't have one
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalAmount: 0,
      });
    }

    // Add the medicine to the cart
    const cartItem = {
      medicine: medicineId,
      quantity: quantity,
      totalPrice: totalItemPrice,
    };

    cart.items.push(cartItem);
    cart.totalAmount += totalItemPrice;

    // Save the cart
    await cart.save();

    res.status(200).json({ message: "Medicine added to cart successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding medicine to the cart." });
  }
};*/
exports.addToCart = async function (req, res) {
  const patientId = req.body.patientId; // Accept patient ID as input
  const medicineId = req.body.medicineId;
  const quantity = parseInt(req.body.quantity);

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number." });
  }

  try {
    // Find the patient by ID (replace this with your actual patient model and field)
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Find the medicine by ID
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found." });
    }

    // Calculate the total price for the cart item
    const totalItemPrice = medicine.price * quantity;

    // Check if the patient already has a cart
    let cart = await Cart.findOne({ user: patient._id });

    if (!cart) {
      // Create a new cart if the patient doesn't have one
      cart = new Cart({
        user: patient._id,
        items: [],
        totalAmount: 0,
      });
    }

    // Check if the medicine is already in the cart
    const existingCartItem = cart.items.find(
      (item) => item.medicine.toString() === medicineId
    );

    if (existingCartItem) {
      // Update the quantity and total price
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice += medicine.price * quantity;
    } else {
      // Add the medicine as a new item
      const totalItemPrice = medicine.price * quantity;
      const cartItem = {
        medicine: medicineId,
        quantity: quantity,
        totalPrice: totalItemPrice,
      };
      cart.items.push(cartItem);
    }
    // Update the totalAmount in the cart
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    // Save the cart
    await cart.save();

    res.status(200).json({ message: "Medicine added to cart successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding medicine to the cart." });
  }
};
//view cart items
exports.viewCartItems = async function (req, res) {
  const patientId = req.params.patientId;
  console.log("ALLL");
  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }
    console.log("ALLL");
    const cart = await Cart.findOne({ user: patientId }).populate(
      "items.medicine"
    );
    // console.log(cart);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//remove an item from the cart
exports.removeItemFromCart = async function (req, res) {
  const patientId = req.params.patientId;
  const medicineId = req.params.medicineId;

  try {
    // Find the patient's cart
    const cart = await Cart.findOne({ user: patientId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Find the cart item to remove
    const cartItem = cart.items.find(
      (item) => item.medicine.toString() === medicineId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Remove the cart item from the cart
    cart.items = cart.items.filter(
      (item) => item.medicine.toString() !== medicineId
    );

    // Update the totalAmount in the cart
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Save the cart
    await cart.save();

    res.status(200).json({ message: "Cart item removed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// change the amount of an item in the cart
exports.changeItemQuantity = async function (req, res) {
  const patientId = req.params.patientId;
  const medicineId = req.params.medicineId;
  const newQuantity = parseInt(req.body.quantity);

  if (isNaN(newQuantity) || newQuantity <= 0) {
    return res
      .status(400)
      .json({ error: "New quantity must be a positive number." });
  }

  try {
    // Find the patient's cart
    const cart = await Cart.findOne({ user: patientId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Find the cart item to update
    const cartItem = cart.items.find(
      (item) => item.medicine.toString() === medicineId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Update the quantity and total price
    const medicine = await Medicine.findById(medicineId);
    cartItem.quantity = newQuantity;
    cartItem.totalPrice = medicine.price * newQuantity;

    // Update the totalAmount in the cart
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Save the cart
    await cart.save();

    res
      .status(200)
      .json({ message: "Cart item quantity updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// checkout my order
exports.checkout = async function (req, res) {
  const patientId = req.params.patientId;

  try {
    // Find the patient's cart
    const cart = await Cart.findOne({ user: patientId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }
    if (cart.items.length === 0) {
      return res.status(404).json({ error: "Cart is empty." });
    }
    // Create a new order
    const order = new Order({
      user: patientId,
      items: cart.items,
      totalAmount: cart.totalAmount,
    });

    // Save the order
    await order.save();

    // Clear the cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(200).json({ message: "Order placed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.getPerscriptions = async function (req, res) {
//   try {
//     const prescriptions = await Patient.find({
//       PatientID: req.user._id,
//     });
//     const allpharmacists = await pharmacists.find();
//     const pharmacists = [];

//     for (let i = 0; i < allpharmacists.length; i++) {
//       for (let j = 0; j < pharmacistsID.length; j++) {
//         if (allpharmacists[i]._id == pharmacistsID[j].pharmacistID) {
//           pharmacists.push(allpharmacists[i]);
//           break;
//         }
//       }
//     }
//     res.status(200).json({
//       status: "success",
//       results: prescriptions.length,
//       data: {
//         prescriptions,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: "this route is not defined yet",
//     });
//   }
// };
// exports.getPatientPrescribtions = async function (req, res) {
//   try {
//     const presecriptions = await Prescriptions.find({
//       PatientID: req.user._id,
//     });
//     res.status(200).json({
//       presecriptions,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: "this route is not defined yet",
//     });
//   }
// };
