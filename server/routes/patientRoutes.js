const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");
const paymentController = require("../controllers/paymentController");

router.route("/").get(patientController.getAllPatients);
router.get("/currentPatient", CheckAuth, patientController.getCurrentPatient);
//  .post(patientController.createPatient);
router.get("/filterMedicine", patientController.filterMedicine);
router.get("/searchmedicine", patientController.searchMedicineByName);
router.get("/myOrders/:status", CheckAuth, patientController.getMyOrders);
router.get("/myorderDetails/", CheckAuth, patientController.getOrderDetails);
router.patch(
  "/cancel-order/:orderID",
  CheckAuth,
  patientController.cancelOrder
);
router.get("/getOrderMedicine", patientController.getOrderMedicine);
router.get("/allMediciness", patientController.getAllMedicines);
router.get("/mydoctors", CheckAuth, patientController.getMypharmacists);
router.get("/:id", patientController.getPatients);
router.patch(
  "/add-family-members",
  CheckAuth,
  patientController.addFamilyMembers
);

router.post("/add-amount-Wallet", patientController.addAmountToWallet);
router.post("/remove-from-wallet", patientController.removeAmountFromWallet);
router.get(
  "/amount-wallet/:userID",
  CheckAuth,
  patientController.getAmountInWallet
);

router.post("/:userId/add-address", patientController.addAddress);
router.delete(
  "/:userId/delete-address/:addressIndex",
  patientController.deleteAddress
);
// Route to get all addresses for a specific user
router.get("/:userId/get-all-addresses", patientController.getAllAddresses);
router.get("/viewcartitems/:id",CheckAuth,patientController.viewCartItems);
router.post("/save-stripe-token", paymentController.payForPackage);
router.post("/add-to-cart", CheckAuth, patientController.addToCart);

//router for the removeItemFromCart
router.delete(
  "/remove-from-cart/:medicineId",
  CheckAuth,
  patientController.removeItemFromCart
);
// router for changeItemQuantity
router.put(
  "/change-item-quantity/:medicineId",
  CheckAuth,
  patientController.changeItemQuantity
);
router.post("/checkout", CheckAuth, patientController.checkout);
//router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);

module.exports = router;
