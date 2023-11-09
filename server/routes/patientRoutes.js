const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");

router.route("/").get(patientController.getAllPatients);
//  .post(patientController.createPatient);
router.get("/filterMedicine", patientController.filterMedicine);
router.get("/searchmedicine", patientController.searchMedicineByName);
router.get("/mydoctors", CheckAuth, patientController.getMypharmacists);
router.get("/:id", patientController.getPatients);
router.patch(
  "/add-family-members",
  CheckAuth,
  patientController.addFamilyMembers
);
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
