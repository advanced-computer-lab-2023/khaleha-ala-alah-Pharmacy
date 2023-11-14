const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");
const paymentController = require("../controllers/paymentController");

router.route("/").get(patientController.getAllPatients);
//  .post(patientController.createPatient);
router.get("/filterMedicine", patientController.filterMedicine);
router.get("/searchmedicine", patientController.searchMedicineByName);
router.get("/myOrders", CheckAuth, patientController.getMyOrders);
router.get("/myorderDetails/", CheckAuth, patientController.getOrderDetails);
router.patch("/cancel-order", patientController.cancelOrder);
router.get("/getOrderMedicine", patientController.getOrderMedicine);
router.get("allMediciness", patientController.getAllMedicines);
router.get("/mydoctors", CheckAuth, patientController.getMypharmacists);
router.get("/:id", patientController.getPatients);
router.patch(
  "/add-family-members",
  CheckAuth,
  patientController.addFamilyMembers
);
router.post("/add-amount-Wallet", patientController.addAmountToWallet);
router.post("/remove-from-wallet", patientController.removeAmountFromWallet);
router.get("/amount-wallet/:userID", patientController.getAmountInWallet);

router.post("/:userId/add-address", patientController.addAddress);
router.delete(
  "/:userId/delete-address/:addressIndex",
  patientController.deleteAddress
);
// Route to get all addresses for a specific user
router.get("/:userId/get-all-addresses", patientController.getAllAddresses);

router.post("/save-stripe-token", paymentController.payForPackage);
router.post("/add-to-cart", patientController.addToCart);
router.get("/view-cart-items/:patientId", patientController.viewCartItems);
//router for the removeItemFromCart
router.patch(
  "/remove-from-cart/:patientId/:medicineId",
  patientController.removeItemFromCart
);
// router for changeItemQuantity
router.patch(
  "/change-item-quantity/:patientId/:medicineId",
  patientController.changeItemQuantity
);
router.post("/checkout/:patientId", patientController.checkout);
//router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);

module.exports = router;
