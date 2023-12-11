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

const Address = require("../models/addresses"); // Import your Address model

// Add address for a specific user
exports.addAddress = async (req, res) => {
  const { userId } = req.params; // Assuming you have the user ID in the request parameters
  const { address } = req.body; // Assuming the new address is sent in the request body

  try {
    // Find the address document by user ID
    let userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      // If the address is not found, create a new one with the user ID
      userAddress = await Address.create({ userId, addresses: [address] });
    } else {
      // If the address is found, log the current state and push the new address to the addresses array
      console.log("Existing userAddress:", userAddress);
      userAddress.addresses = userAddress.addresses || [];
      userAddress.addresses.push(address);
      await userAddress.save();
    }

    // Find the patient by user ID
    let patient = await Patient.findOne({ userID: userId });

    if (!patient) {
      // If the patient is not found, create a new one with the address
    } else {
      // If the patient is found, log the current state and push the new address to the addresses array
      console.log("Existing patient:", patient);
      patient.addresses = patient.addresses || [];
      patient.addresses.push(userAddress);
      await patient.save();
    }

    return res
      .status(200)
      .json({ message: "Address added successfully", patient });
  } catch (error) {
    console.error("Error adding address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Wallet = require("../models/wallet");
exports.getAmountInWallet = async (req, res) => {
  try {
    const userID = req.user._id;
    const userWallet = await Wallet.findOne({ userID });
    if (userWallet) {
      // Retrieve the current amount in the wallet
      const amountInWallet = userWallet.amount;

      // Send the amount in the wallet as a response
      res.json({ success: true, amountInWallet });
    } else {
      // Send an error response if user wallet not found
      res
        .status(404)
        .json({ success: false, message: "User wallet not found" });
    }
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error retrieving amount from wallet",
      error: error.message,
    });
  }
};
// Function to add amount to the wallet or create a new wallet if not available
exports.addAmountToWallet = async (req, res) => {
  try {
    const { userID, amount } = req.body;
    let userWallet = await Wallet.findOne({ userID });

    if (!userWallet) {
      // User wallet not found, create a new wallet
      userWallet = new Wallet({ userID });
    }

    // Add amount to the wallet
    await userWallet.addAmount(amount);

    // Send a success response
    res.json({ success: true, message: "Amount added to wallet successfully" });
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error adding amount to wallet",
      error: error.message,
    });
  }
};

// Function to remove amount from the wallet
exports.removeAmountFromWallet = async (req, res) => {
  try {
    const { userID, amount } = req.body;
    const userWallet = await Wallet.findOne({ userID });

    if (userWallet) {
      // Attempt to remove amount (throws error if insufficient funds)
      await userWallet.removeAmount(amount);

      // Send a success response
      res.json({
        success: true,
        message: "Amount removed from wallet successfully",
      });
    } else {
      // Send an error response if user wallet not found
      res
        .status(404)
        .json({ success: false, message: "User wallet not found" });
    }
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error removing amount from wallet",
      error: error.message,
    });
  }
};

// Delete an address based on its index for a specific user
exports.deleteAddress = async (req, res) => {
  const { userId, addressIndex } = req.params; // Assuming you have user ID and address index in the request parameters

  try {
    // Find and update the address document by user ID
    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User address not found" });
    }

    // Ensure that the addresses array is initialized
    userAddress.addresses = userAddress.addresses || [];

    // Check if the address index is valid
    if (addressIndex < 0 || addressIndex >= userAddress.addresses.length) {
      return res.status(400).json({ message: "Invalid address index" });
    }

    // Remove the address at the specified index
    userAddress.addresses.splice(addressIndex, 1);
    await userAddress.save();

    // Find and update the patient by user ID
    const patient = await Patient.findOne({ userID: userId });

    if (!patient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure that the addresses array is initialized
    patient.addresses = patient.addresses || [];

    // Remove the address at the specified index from the patient's addresses array
    patient.addresses.splice(addressIndex, 1);
    await patient.save();

    return res
      .status(200)
      .json({ message: "Address deleted successfully", patient });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all addresses for a specific user
exports.getAllAddresses = async (req, res) => {
  const { userId } = req.params; // Assuming you have the user ID in the request parameters

  try {
    // Find addresses by user ID
    const addressesResult = await Address.findOne({ userId });

    if (!addressesResult) {
      return res.status(404).json({ message: "User addresses not found" });
    }

    const addresses = addressesResult.addresses || [];

    return res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error getting addresses:", error);
    return res.status(500).json({ message: "Internal server error" });
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
    const uniqueMedicalUses = await Medicine.distinct("medicalUse");
    res.status(200).json({ uniqueMedicalUses });
  } catch (error) {
    console.error("Error fetching unique medical uses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.searchMedicineByName = async function (req, res) {
  try {
    const prefix = req.query.prefix; // Access the 'prefix' from the request body

    const medicines = await Medicine.find({
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

exports.addToCart = async function (req, res) {
  const medicineId = req.body.medicineId;
  const quantity = parseInt(req.body.quantity);

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number." });
  }
  console.log("ALLL");
  try {
    const patientId = req.user._id; // Accept patient ID as input
    console.log(patientId);
    if (!patientId) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    console.log("patient found");
    // Find the patient by ID (replace this with your actual patient model and field)
    console.log(patientId);
    const patient = await Patient.findOne({ userID: patientId });
    //console.log(patient);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Find the medicine by ID
    const medicine = await Medicine.findById(medicineId);
    console.log(medicine);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found." });
    }

    // Calculate the total price for the cart item
    const totalItemPrice = medicine.price * quantity;

    // Check if the patient already has a cart
    let cart = await Cart.findOne({ user: patientId });

    if (!cart) {
      // Create a new cart if the patient doesn't have one
      cart = new Cart({
        user: patientId,
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
exports.viewCartItems = async function (req, res) {
  try {
     const patientId = req.params.id;
 

    const patient = await Patient.findOne({ userID: patientId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    const cart = await Cart.findOne({ user: patientId }).populate("items.medicine");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    res.status(200).json({ success: true, cart: cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};
//remove an item from the cart
exports.removeItemFromCart = async function (req, res) {
  const patientId = req.user._id;
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
  const patientId = req.user._id;
  const medicineId = req.params.medicineId;
  const newQuantity = parseInt(req.body.quantity);

  if (isNaN(newQuantity) || newQuantity <= 0) {
    return res
      .status(400)
      .json({ error: "New quantity must be a positive number." });
  }

  try {
    //check if the patient exists
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

exports.checkout = async function (req, res) {
  const patientId = req.user._id;

  try {
    // Retrieve cart items from the request body
    const cartItems = req.body.cartItems;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items are required." });
    }

    // Calculate total amount based on cart items
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price /** item.quantity*/;
    }, 0);
    console.log(totalAmount);
    // Create an array to store order items
    const orderItems = cartItems.map((cartItem) => ({
      medicine: cartItem.id,
      quantity: cartItem.quantity,
      totalPrice: cartItem.price /** cartItem.quantity*/,
    }));

    // Create a new order
    const order = new Order({
      userID: patientId,
      items: orderItems,
      totalAmount,
      address: req.body.address, // Assuming the address is provided in the request body
      status: "Pending", // Default status
    });

    // Save the order
    await order.save();

    // Empty the cart                                               the logic is that now i can access the cart from pending orders
    const cart = await Cart.findOne({ user: patientId });
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

exports.getOrderDetails = async function (req, res) {
  try {
    const order = await Order.findById(req.query.id);

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.cancelOrder = async function (req, res) {
  try {
    console.log(req.params.orderID);
    const order = await Order.findOne({ orderID: req.params.id });
    const orderAmount = order.totalAmount;
    order.status = "Cancelled";
    await order.save();
    const wallet = await Wallet.findOne({ userID: req.user._id });
    console.log(req.user._id);
    console.log(wallet);
    wallet.amount += orderAmount;
    await wallet.save();
    res.status(204).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getMyOrders = async function (req, res) {
  try {
    const userID = req.user._id;
    let orders; // Use a different name for the array
    console.log(req.params);

    if (req.params.status === "all") {
      orders = await Order.find({ userID: userID });
    } else {
      orders = await Order.find({ userID: userID, status: req.params.status });
    }
    console.log(orders);

    let result = [];
    for (let i = 0; i < orders.length; i++) {
      let currentOrder = orders[i]; // Use a different name for the loop variable
      let items = [];

      for (let j = 0; j < currentOrder.items.length; j++) {
        let item = currentOrder.items[j];
        if (item.quantity === 0) continue;

        let medicine = await Medicine.findById(item.medicine);
        items.push({
          medicine: medicine,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        });
      }

      result.push({
        orderID: currentOrder._id,
        items: items,
        totalAmount: currentOrder.totalAmount,
        address: currentOrder.address,
        status: currentOrder.status,
      });
    }

    console.log(result);

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getOrderMedicine = async function (req, res) {
  try {
    const order = await Order.findById(req.query.id);
    const medicine = [];
    for (let i = 0; i < order.items.length; i++) {
      const med = await Medicine.findById(order.items[i].medicine);
      medicine.push(med);
    }
    res.status(200).json({
      status: "success",
      data: {
        medicine,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getAllMedicines = async function (req, res) {
  try {
    const medicines = await Medicine.find();
    res.status(200).json({
      status: "success",
      results: medicines.length,
      data: {
        medicines,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching medicines.",
    });
  }
};

exports.setMedicinePhoto = async function (req, res) {
  try {
    console.log(req.body);
    const medicine = await Medicine.findById(req.body.medicineId);
    medicine.pictureUrl = "http://localhost:4000/uploads/" + req.profileFile;
    await medicine.save();

    res.status(200).json({
      status: "success",
      data: {
        medicine,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while setting medicine photo.",
    });
  }
};

exports.getCurrentPatient = async function (req, res) {
  try {
    const patient = await Patient.findOne({ userID: req.user._id });
    res.status(200).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching patient.",
    });
  }
};
