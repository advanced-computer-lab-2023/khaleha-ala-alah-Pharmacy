const express = require("express");
const adminController = require("./../controllers/adminstratorController");
const { CheckAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(adminController.getAllAdmins);
router.route("/addAdmin").post(adminController.addAdmin);
router
  .route("/delAdminpharmacistPatient")
  .delete(adminController.delAdminpharmacistPatient);
router.post("/approveOrRejectDoctor", adminController.approvepharmacist);
router.get("/getCurrentAdmin", CheckAuth, adminController.getCurrentUserAdmin);
router.route("/pendingDoctors").get(adminController.viewPendingpharmacists);

router.get("/allmedicinesdyuse", adminController.getMedicinesByMedicalUse);
router.get("/available-medicines", adminController.getAvailableMedicines);

// Get pharmacist details by ID
router.get(
  "/:pharmacistId/PharmacistDetails",
  adminController.getPharmacistDetails
);
router.get(
  "/medicine-sales-report/:year/:month",
  adminController.getMedicineSalesReport
);
module.exports = router;
