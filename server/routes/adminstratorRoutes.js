const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();

router
  .route("/")
  .get(adminController.getAllAdmins)
  .post(adminController.addAdmin)
  .delete(adminController.delAdminpharmacistPatient);

router.route("/pendingPharmacists").get(adminController.viewPendingPharmacists);

router.get("/available-medicines", adminController.getAvailableMedicines);
router.get("/medicines", adminController.searchMedicine);
// Get pharmacist details by ID
router.get(
  "/:pharmacistId/PharmacistDetails",
  adminController.getPharmacistDetails
);

module.exports = router;

module.exports = router;
