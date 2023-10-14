const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");




 router.route('/').get(patientController.getAllPatients);
  //  .post(patientController.createPatient);
router.get('/filterMedicine', patientController.filterMedicine);
router.get('/searchmedicine', patientController.searchMedicineByName);

// router
//     .route('/')
//     .get(patientController.getAllPatients)
//     .post(patientController.createPatient);
router.get("/medicines", patientController.searchMedicine);

mydoctors',CheckAuth, patientController.getMypharmacists);
router.get("/:id", patientController.getPatients);
router.patch("/add-family-members", CheckAuth ,patientController.addFamilyMembers);

//router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);


module.exports = router;
