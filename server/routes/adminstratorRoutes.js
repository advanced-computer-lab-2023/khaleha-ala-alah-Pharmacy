const express = require("express");
const adminController = require("./../controllers/adminstratorController");

const router = express.Router();

router.route("/").get(adminController.getAllAdmins);
router.route("/addAdmin").post(adminController.addAdmin);
router.route("/delAdminpharmacistPatient").delete(adminController.delAdminpharmacistPatient);
 

router.route("/pendingDoctors").get(adminController.viewPendingpharmacists);

router.get('/allmedicinesdyuse' , adminController.getMedicinesByMedicalUse)
router.get('/available-medicines', adminController.getAvailableMedicines);

// Get pharmacist details by ID
router.get('/:pharmacistId/PharmacistDetails', adminController.getPharmacistDetails);

module.exports = router;


