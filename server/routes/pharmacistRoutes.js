const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistControllers');

// router 
router.post('/addMedicine', pharmacistController.addMedicine);
router.get('/:medicineId/medicine-details', pharmacistController.getMedicineDetails);
router.put('/:medicineId/edit-medicine', pharmacistController.updateMedicine);
router.get('/allpharmacists', pharmacistController.allpharmacists);
module.exports = router;
