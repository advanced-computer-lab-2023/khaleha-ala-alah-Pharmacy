const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();

router
  .route("/")
  .get(adminController.getAllAdmins)
  .post(adminController.addAdmin)
  .delete(adminController.delAdminpharmacistPatient);

router.route("/pendingDoctors").get(adminController.viewPendingpharmacists);


router.get('/available-medicines', adminController.getAvailableMedicines);

// Get pharmacist details by ID
router.get('/:pharmacistId/PharmacistDetails', adminController.getPharmacistDetails);

module.exports = router;

module.exports = router;
